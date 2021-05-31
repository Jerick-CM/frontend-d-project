<template>
  <div id="cart-modal-wrapper">
    <nuxt-link :to="{ name:'cart' }" class="cart-link">
      <div class="item-count" v-if="itemCount > 0">{{ itemCount }}</div>
      <div class="icon cart"></div>
      Cart
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


const REQUEST_DELAY = 500;


export default {
  computed: {
    ...mapGetters({
      profile: 'session/GET_PROFILE',
      itemCount: 'cart/GET_ITEM_COUNT',
      totalCost: 'cart/GET_TOTAL_COST',
      cartItems: 'cart/GET_ITEMS',
    }),
    remainingCredits() {
      return this.profile.credits - this.totalCost;
    },
    canConfirm() {
      return this.remainingCredits >= 0;
    },
  },
  methods: {
    async doCheckout() {
      if (this.isSending) return;
      if (this.itemCount === 0) {
        this.$toast.error('Your cart is empty.');
        return;
      }

      this.isSending = true;

      const res = await this.$store.dispatch('cart/checkout');

      if (res) {
        this.$store.commit('session/UPDATE_PROFILE_CREDITS', this.remainingCredits);
        this.dialog = false;
      }

      this.isSending = false;
    },
    async updateQuantity(itemID, quantity) {
      if (quantity > 0) {
        this.$store.commit('cart/UPDATE_ITEM', { itemID, quantity });
      } else {
        const confirmPopupOpts = {
          title: 'Remove item',
          buttonTrueText: 'Yes',
          buttonFalseText: 'No',
          buttonFalseColor: 'red',
          buttonTrueColor: 'light-green lighten-1',
          color: 'danger',
        };

        let res = await this.$confirm('Are you sure you want to remove this item?', confirmPopupOpts);

        if (res) {
          this.$store.commit('cart/REMOVE', itemID);
          this.$store.dispatch('cart/deleteItem', itemID);
        }
      }

      if (this.timeoutID !== null) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(() => {
        if (quantity > 0) {
          this.$store.dispatch('cart/updateItem', { itemID, quantity });
        }

        this.timeoutID = null;
      }, REQUEST_DELAY);
    },
  },
  data() {
    return {
      isSending: false,
      dialog: false,
      timeoutID: null,
    };
  },
}
</script>

<style lang="scss">
@import "~/assets/scss/vue/components/cart-modal.scss";
</style>
