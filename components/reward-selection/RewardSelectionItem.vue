<template>
  <div id="reward-selection-item" class="card" v-bind:class="{ 'is-addable': isAddable }">
    <div>
      <div class="container--flex item-name">
        <div class="type flex-2">
          <strong>{{ $props.item.name }}</strong>
        </div>
        <div class="item-info flex-0">
          <v-dialog v-model="dialog" max-width="600px" width="600px">
            <i slot="activator" class="material-icons grey--text">help</i>
            <v-card id="reward-selection-item-modal">
              <v-card-text>
                <h3>{{ $props.item.name }}</h3>
                <br>
                <div class="cancel clickable" @click="dialog = false">
                  <img class="responsive-img" src="~/assets/img/icons/close.png" />
                </div>
                <hr><br>
                <v-layout row wrap>
                  <v-flex xs6>
                    <carousel style="height: 230px;" :inverted-indicator-color="true">
                      <carousel-item v-for="(photo, idx) in $props.item.inventory_photos" :key="idx">
                        <div class="item-img center" @click="primaryPhoto = photo.file">
                          <img :src="photo.file" :alt="photo.name" style="width: 70%;">
                        </div>
                      </carousel-item>
                    </carousel>
                  </v-flex>
                  <v-flex xs6>
                    <p class="mb-1" v-for="(meta, key) in $props.item.meta" :key="key">
                      <strong>{{ meta.key }}:</strong> <span>{{ meta.val }}</span>
                    </p>
                    <pre class="item-description mt-3">{{ $props.item.description || '' }}</pre>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
    <div class="item-details">
      <div class="cart-count-wrapper" v-if="$props.item.cartCount > 0">
        <div class="cart-count"></div>
        <span>{{ $props.item.cartCount }}</span>
      </div>
      <div class="item-img"
        v-bind:class="{ 'clickable': isAddable }"
        v-if="$props.item.primary_photo !== null"
        @click="addToCart()">
        <img :src="$props.item.primary_photo.file" :alt="$props.item.name">
      </div>
      <div class="summary p-md-vertical">
        <div class="type left">{{ itemStock }}</div>
        <div class="light-green--text lighten-1 cost right">{{ $pluralize('token', $props.item.unit_price) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Carousel from '~/components/carousel';

const REQUEST_DELAY = 300;


export default {
  mixins: [
    Carousel,
  ],
  props: {
    item: { type: Object, required: true },
    isAddable: { type: Boolean, default: true },
  },
  methods: {
    addToCart() {
      if (!this.isAddable) return
      if (this.timeoutID !== null) {
        clearTimeout(this.timeoutID);
      }
      if (this.isAdding) return;

      if (this.isOnCart) {
        const newQty = this.item.cartCount + 1;

        if (newQty <= this.item.stock) {
          const payload = {
            itemID: this.item.id,
            quantity: newQty,
          };

          this.$store.commit('cart/UPDATE_ITEM', payload);

          this.timeoutID = setTimeout(() => {
            this.$store.dispatch('cart/updateItem', payload);
            this.timeoutID = null;
          }, REQUEST_DELAY);
        }
      } else {
        this.isAdding = true;
        this.$store
            .dispatch('cart/addItem', this.item)
            .then(() => {})
            .catch((err) => {
              if (err.response) {
                this.$toast.error(err.response.message);
              } else {
                this.$toast.error(err);
              }
            })
            .finally(() => {
              this.isAdding = false;
            });
      }
    },
  },
  computed: {
    ...mapGetters({
      cartItems: 'cart/GET_ITEMS',
    }),
    isOnCart() {
      return this.cartItems.filter(i => i.id === this.item.id).length > 0;
    },
    itemStock() {
      if (this.$props.item.is_preorder) {
        return 'Pre-order';
      }
      return `${this.$pluralize('item', this.$props.item.stock)} left`;
    },
  },
  data() {
    return {
      dialog: false,
      isAdding: false,

      timeoutID: null,

      primaryPhoto: (this.$props.item.primary_photo) ? this.$props.item.primary_photo.file : '' ,
    };
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/components/reward-selection-item.scss";
</style>
