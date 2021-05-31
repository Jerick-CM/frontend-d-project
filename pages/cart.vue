<template>
  <!-- <nuxt-link to="/test/1">About (internal link that belongs to the Nuxt App)</nuxt-link> -->
  <div id="cart" class="page">
    <div class="container container--flex p-0-horizontal">
      <div class="cart-items flex-2">
        <table>
          <thead>
            <tr class="black white--text">
              <th class="center-align">Item</th>
              <th class="center-align">Tokens</th>
              <th class="center-align">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, idx) in cartItems" :key="idx">
              <td class="center-align p-lg">
                <div class="container--flex container--flex-align-item-center">
                  <div class="item-img flex-1 no-padding">
                    <img
                      class="responsive-img"
                      :src="i.primary_photo.file"
                      :alt="i.name"
                    />
                  </div>
                  <div class="item-name left-align flex-2">
                    <strong>{{ i.name }}</strong>
                  </div>
                </div>
              </td>
              <td class="center-align">{{ i.unit_price * i.quantity }}</td>
              <td class="center-align">
                <button
                  class="clickable point-btn inline-block"
                  @click="updateQuantity(i.id, i.quantity - 1)"
                >
                  <i class="material-icons">remove_circle_outline</i>
                </button>
                <div class="quantity-count inline-block center-align">
                  {{ i.quantity }}
                </div>
                <button
                  class="clickable point-btn inline-block"
                  @click="updateQuantity(i.id, i.quantity + 1)"
                  :disabled="isMaximum(i.stock, i.quantity + 1)"
                >
                  <i class="material-icons">add_circle_outline</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="center-align p-lg" v-if="isCartEmpty">
          <span v-if="!hasCheckout">Your cart is empty.</span>
          <span v-else
            >You have redeemed the item. Please check your redemption history
            for more details.</span
          >
        </div>
      </div>
      <div class="flex-1 no-padding">
        <div class="computation" v-if="!isCartEmpty">
          <table>
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>

            <thead>
              <tr class="black left-align white--text">
                <th class="pl-3" colspan="2">Order summary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total tokens:</td>
                <td class="right-align">
                  {{ $pluralize("token", profile.credits) }}
                </td>
              </tr>
              <tr>
                <td class="border-bottom">This transaction:</td>
                <td class="border-bottom right-align">
                  {{ $pluralize("token", totalCost) }}
                </td>
              </tr>
              <tr>
                <td>Tokens remaining:</td>
                <td class="right-align">
                  {{ $pluralize("token", remainingCredits) }}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn btn-flat btn-full clickable btn-green"
            @click="doCheckout()"
            :disabled="!canConfirm"
          >
            <span v-if="!isSending">Proceed to checkout</span>
            <span v-if="isSending">
              <v-progress-circular
                style="margin-top: -7px"
                v-bind:width="2"
                v-bind:size="20"
                color="green"
                indeterminate
              ></v-progress-circular>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

import authenticatedPage from "~/mixins/authenticated-page.js";

const REQUEST_DELAY = 500;

export default {
  mixins: [authenticatedPage],
  computed: {
    ...mapGetters({
      profile: "session/GET_PROFILE",
      itemCount: "cart/GET_ITEM_COUNT",
      totalCost: "cart/GET_TOTAL_COST",
      cartItems: "cart/GET_ITEMS",
    }),
    remainingCredits() {
      return this.profile.credits - this.totalCost;
    },
    canConfirm() {
      return this.remainingCredits >= 0;
    },
    isCartEmpty() {
      return this.cartItems.length === 0;
    },
  },
  methods: {
    isMaximum(stock, qty) {
      return qty > stock;
    },
    async doCheckout() {
      if (this.isSending) return;
      if (this.itemCount === 0) {
        this.$toast.error("Your cart is empty.");
        return;
      }

      const confirmPopupOpts = {
        title: "Checkout confirmation",
        buttonTrueText: "Confirm checkout →",
        buttonFalseText: "Cancel",
        buttonFalseColor: "red",
        buttonTrueColor: "light-green lighten-1",
        color: "black",
        icon: "",
      };

      let isConfirm = await this.$confirm(
        `
        <div class="center">
          You are about to checkout!<br />
          All redemptions are not refundable.<br />
          Click on "Confirm checkout" to proceed.<br /><br />
          <small>
            <em>*This redemption is subject to tax. The value of this item will be submitted to IRAS as part of your income tax filing. To find out more, please contact SG ACE (<a href="mailto:sgace@deloitte.com">sgace@deloitte.com</a>).</em>
          </small>
        </div>`,
        confirmPopupOpts
      );

      if (isConfirm) {
        this.isSending = true;

        // Copy the remaining credit we need to update vuex later
        const remainingCredit = this.remainingCredits;

        const res = await this.$store.dispatch("cart/checkout");

        this.hasCheckout = true;
        this.$store.commit("session/UPDATE_PROFILE_CREDITS", remainingCredit);

        this.isSending = false;
      }
    },
    async updateQuantity(itemID, quantity) {
      if (quantity > 0) {
        this.$store.commit("cart/UPDATE_ITEM", { itemID, quantity });
      } else {
        const confirmPopupOpts = {
          title: "Remove item",
          buttonTrueText: "Yes",
          buttonFalseText: "No",
          color: "danger",
        };

        let res = await this.$confirm(
          "Are you sure you want to remove this item?",
          confirmPopupOpts
        );

        if (res) {
          this.$store.commit("cart/REMOVE", itemID);
          this.$store.dispatch("cart/deleteItem", itemID);
        }
      }

      if (this.timeoutID !== null) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(() => {
        if (quantity > 0) {
          this.$store.dispatch("cart/updateItem", { itemID, quantity });
        }

        this.timeoutID = null;
      }, REQUEST_DELAY);
    },
  },
  data() {
    return {
      isSending: false,
      hasCheckout: false,
      timeoutID: null,
    };
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/vue/pages/cart.scss";
</style>
