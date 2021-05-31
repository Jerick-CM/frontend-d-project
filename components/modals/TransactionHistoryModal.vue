<template>
  <div id="transaction-history-modal-wrapper">
    <v-dialog v-model="dialog" max-width="1024px">
      <!-- Link -->
      <a href="#" class="capitalize grey--text" slot="activator">
        <small>View Redemption History</small>
      </a>
      <!-- Modal -->
      <div id="transaction-history-modal" class="deloitte-modal">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            {{ isViewMode ? 'Order #' + selectedTransaction.order_number : 'Transaction History' }}

            <div class="icon">
              <img src="/img/icons/transactions-ico.svg" alt="transaction-history" v-if="!isViewMode" />
              <img src="/img/icons/cart-ico.svg" alt="cart" v-else />
            </div>
            <div class="cancel clickable" @click="dialog = false">
              <img class="responsive-img" src="/img/icons/close.png" />
            </div>
          </v-card-title>

          <v-card-text>
            <div v-if="!isViewMode">
              <table class="transaction-items">
                <colgroup>
                  <col width="25%">
                  <col width="50%">
                  <col width="25%">
                </colgroup>

                <thead>
                  <tr>
                    <th class="left-align">Date</th>
                    <th class="left-align">Past transaction</th>
                    <th class="left-align">Token used</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isFetching" class="center-align">
                    <td colspan="3">Fetching data...</td>
                  </tr>
                  <tr v-if="transactionHistory.length === 0 && !isFetching" class="center-align">
                    <td colspan="3">No transaction history yet.</td>
                  </tr>
                  <tr v-for="(t, i) in transactionHistory" :key="i" @click="viewTransaction(i)" v-else>
                    <td class="left-align">{{ $moment(t.created_at).format('DD MMM YYYY') }}</td>
                    <td class="left-align clickable">
                      Order #{{ t.order_number }}
                    </td>
                    <td class="left-align">{{ t.total_credits }}</td>
                  </tr>
                </tbody>
              </table>

              <br>
              <div class="inline-block">
                <button class="btn btn-flat right clickable" @click="dialog = false" disabled>DOWNLOAD</button>
              </div>
            </div>

            <div class="container--flex" v-else>
              <div class="cart-items flex-1">
                <table>
                  <colgroup>
                    <col width="25%">
                    <col width="50%">
                    <col width="25%">
                  </colgroup>

                  <thead>
                    <tr>
                      <th class="center-align">Quantity</th>
                      <th class="center-align">Items</th>
                      <th>Tokens</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(i, idx) in selectedTransaction.redeem_items" :key="idx">
                      <td class="center-align">
                        <div class="quantity-count inline-block center-align">
                          {{ i.quantity }}
                        </div>
                      </td>
                      <td class="center-align">
                        <img class="item-img responsive-img" :src="i.inventory.primary_photo.file" :alt="i.name">
                      </td>
                      <td class="center-align">{{ i.total_credits }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="computation flex-1">
                <p>Total tokens: <span class="right">{{ $pluralize('token', selectedTransaction.total_credits) }}</span></p>
                <div class="inline-block">
                  <button class="btn btn-flat btn-white clickable" @click="back()">BACK</button>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
  data() {
    return {
      transactionHistory: [],
      selectedTransaction: null,
      isFetching: false,
      isViewMode: false,
      dialog: false,
      page: 1,
    };
  },
  methods: {
    viewTransaction(idx) {
      this.selectedTransaction = this.transactionHistory[idx];
      this.isViewMode = true;
    },
    back() {
      this.selectedTransaction = null;
      this.isViewMode = false;
    },
  },
  watch: {
    dialog(newVal) {
      if (newVal) {
        this.page = 1;
        this.selectedTransaction = null;
        this.isViewMode = false;
        this.transactionHistory = [];
        this.isFetching = true;
        this.$axios
            .get(this.$queryBuilder('/redeem/history', { page: this.page++ }))
            .then((res) => {
              this.transactionHistory = res.data.data;
            })
            .finally(() => {
              this.isFetching = false;
            });
      }
    },
  },
}
</script>

<style lang="scss">
@import "~/assets/scss/vue/components/transaction-history-modal.scss";
</style>
