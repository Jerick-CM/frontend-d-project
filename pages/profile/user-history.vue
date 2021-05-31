<template>
  <div id="user-history-page">
    <div class="container no-padding">
      <div class="non-print">
        <v-toolbar flat color="white" class="pt-4 filter-controls">
          <v-toolbar-title style="width: 185px">User history</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <div class="container--flex container--flex-align-item-center">
            <div class="dateFrom flex-1">
              <v-menu
                ref="menuFrom"
                v-model="menuFrom"
                v-bind:nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="dateFromFormatted"
                  label="From"
                  prepend-icon="event"
                  color="light-green lighten-1"
                  readonly
                />
                <v-date-picker
                  v-model="dateFrom"
                  v-bind:readonly="table.isLoading"
                  v-bind:max="today"
                  v-bind:reactive="true"
                  v-bind:show-current="false"
                  color="light-green lighten-1"
                  no-title
                  scrollable
                />
              </v-menu>
            </div>
            <div class="dateTo flex-1">
              <v-menu
                ref="menuTo"
                v-model="menuTo"
                v-bind:nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="dateToFormatted"
                  label="To"
                  prepend-icon="event"
                  color="light-green lighten-1"
                  readonly
                />
                <v-date-picker
                  v-model="dateTo"
                  v-bind:readonly="!dateFrom"
                  v-bind:min="dateFrom"
                  v-bind:reactive="true"
                  v-bind:show-current="false"
                  color="light-green lighten-1"
                  no-title
                  scrollable
                />
              </v-menu>
            </div>&nbsp;
            <div class="flex-2">
              <v-select
                v-model="transactionType"
                v-bind:items="transactionTypes"
                label="Transaction type"
                color="light-green lighten-1"
                item-text="text"
                item-value="value"
                required
                outline
              />
            </div>

            <div class="container--flex flex-1">
              <v-btn
                v-bind:disabled="table.isLoading"
                v-on:click.prevent="retrieve()"
                dark>Search</v-btn>
              <v-btn
                v-on:click.prevent="resetSearch()"
                v-bind:disabled="!hasDateSelected || table.isLoading"
                dark>Reset</v-btn>
            </div>
          </div>
        </v-toolbar>
        <v-data-table
          v-bind:headers="table.transactionSentHeaders"
          v-bind:items="userTransactions"
          v-bind:loading="table.isLoading"
          v-bind:pagination.sync="paginationTransactionSent"
          v-bind:total-items="table.totalItems"
          item-key="id"
          v-if="type === FILTER_TYPES.TRANSACTION_SENT"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td>
                <h3>{{ props.item.sender_name }}</h3>
                <p>{{ props.item.sender_email }}</p>
              </td>
              <td>
                <h3>{{ props.item.sender_department_name }}</h3>
              </td>
              <td>
                <h3>{{ $moment(props.item.created_at).format('DD MMM YYYY') || '' }}</h3>
              </td>
              <td>
                <h3>{{ props.item.receiver_name }}</h3>
                <p>{{ props.item.receiver_email }}</p>
              </td>
              <td>
                <h3>{{ props.item.receiver_department_name }}</h3>
              </td>
              <td>
                <h3>{{ props.item.credits }}</h3>
              </td>
              <td>
                <h3 v-html="props.item.badge"></h3>
              </td>
            </tr>
          </template>
        </v-data-table>

        <v-data-table
          v-bind:headers="table.redemptionHeaders"
          v-bind:items="userTransactions"
          v-bind:loading="table.isLoading"
          v-bind:pagination.sync="paginationRedemption"
          v-bind:total-items="table.totalItems"
          item-key="id"
          v-if="type === FILTER_TYPES.REDEMPTION"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td>
                <h3>
                  {{ $moment(props.item.created_at).format('DD MMM YYYY') || '' }}
                  <br />
                  {{ $moment(props.item.created_at).format('hh:mm A') || '' }}
                </h3>
              </td>
              <td>
                <h3>Order #{{ props.item.order_number }}</h3>
              </td>
              <td>
                <h3>{{ props.item.total_credits }}</h3>
              </td>
              <td>
                <v-btn icon @click="viewTransaction(props.index)">
                  <v-icon>remove_red_eye</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>

        <v-data-table
          v-bind:headers="table.transactionReceivedHeaders"
          v-bind:items="userTransactions"
          v-bind:loading="table.isLoading"
          v-bind:pagination.sync="paginationTransactionReceived"
          v-bind:total-items="table.totalItems"
          item-key="id"
          v-if="type === FILTER_TYPES.TRANSACTION_RECEIVED"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td>
                <h3>{{ props.item.sender_name }}</h3>
                <p>{{ props.item.sender_email }}</p>
              </td>
              <td>
                <h3>{{ props.item.sender_department_name }}</h3>
              </td>
              <td>
                <h3>{{ $moment(props.item.created_at).format('DD MMM YYYY') || '' }}</h3>
              </td>
              <td>
                <h3>{{ props.item.receiver_name }}</h3>
                <p>{{ props.item.receiver_email }}</p>
              </td>
              <td>
                <h3>{{ props.item.receiver_department_name }}</h3>
              </td>
              <td>
                <h3>{{ props.item.credits }}</h3>
              </td>
              <td>
                <h3 v-html="props.item.badge"></h3>
              </td>
            </tr>
          </template>
        </v-data-table>
      </div>

      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark>
            <v-btn icon dark @click="close()">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Order #{{ selectedTransaction.order_number }} &mdash; {{ $moment(selectedTransaction.created_at).format('DD MMM YYYY | hh:mm A') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="print()">Print</v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text>
            <div id="cart-modal">
              <div class="item-list container container--flex p-0-horizontal">
                <div class="cart-items flex-2 pt-0">
                  <table>
                    <colgroup>
                      <col width="60%" />
                      <col width="12%" />
                      <col width="14%" />
                      <col width="14%" />
                    </colgroup>

                    <thead>
                      <tr class="black white--text">
                        <th class="center-align">Item</th>
                        <th class="center-align">Tokens</th>
                        <th class="center-align">Quantity</th>
                        <th class="center-align">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(i, idx) in selectedTransaction.redeem_items" v-bind:key="idx">
                        <td class="center-align p-lg">
                          <div class="container--flex container--flex-align-item-center">
                            <div class="item-img flex-1 no-padding">
                              <img
                                class="responsive-img"
                                v-bind:src="i.inventory.primary_photo.file"
                                v-bind:alt="i.inventory.name"
                              />
                            </div>
                            <div class="item-name left-align flex-2">
                              <strong>{{ i.inventory.name }}</strong>
                            </div>
                          </div>
                        </td>
                        <td class="center-align">{{ i.inventory.unit_price }}</td>
                        <td class="center-align">
                          <div class="quantity-count inline-block center-align">{{ i.quantity }}</div>
                        </td>
                        <td class="center-align">{{ i.total_credits }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="center-align p-lg" v-if="isCartEmpty">Your cart is empty.</div>
                </div>
                <div class="flex-1 pt-0">
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
                          <td class="pl-3 pt-3">Total tokens:</td>
                          <td
                            class="pr-3 pt-3 right-align"
                          >{{ $pluralize('token', selectedTransaction.total_credits) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

      <div id="cart-modal" class="print-only">
        <div class="print-header pb-5 p-lg-horizontal">
          <small class="left">{{ $moment().format('M/D/YYYY') }}</small>
          <small class="right">ACE e-Store</small>
        </div>
        <div class="container order-number pb-0">
          <span>Order #{{ selectedTransaction.order_number }} &mdash; {{ $moment(selectedTransaction.created_at).format('DD MMM YYYY | hh:mm A') }}</span>
        </div>
        <div class="item-list container container--flex p-0-horizontal">
          <div class="cart-items flex-2 pt-0 pb-0">
            <table>
              <colgroup>
                <col width="60%" />
                <col width="12%" />
                <col width="14%" />
                <col width="14%" />
              </colgroup>

              <thead>
                <tr class="black white--text">
                  <th class="center-align">Item</th>
                  <th class="center-align">Tokens</th>
                  <th class="center-align">Quantity</th>
                  <th class="center-align">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(i, idx) in selectedTransaction.redeem_items" v-bind:key="idx">
                  <td class="center-align p-lg">
                    <div class="container--flex container--flex-align-item-center">
                      <div class="item-img flex-1 no-padding">
                        <img
                          class="responsive-img"
                          v-bind:src="i.inventory.primary_photo.file"
                          v-bind:alt="i.inventory.name"
                        />
                      </div>
                      <div class="item-name left-align flex-2">
                        <strong>{{ i.inventory.name }}</strong>
                      </div>
                    </div>
                  </td>
                  <td class="center-align">{{ i.inventory.unit_price }}</td>
                  <td class="center-align">
                    <div class="quantity-count inline-block center-align">{{ i.quantity }}</div>
                  </td>
                  <td class="center-align">{{ i.total_credits }}</td>
                </tr>
              </tbody>
            </table>
            <div class="center-align p-lg" v-if="isCartEmpty">Your cart is empty.</div>
          </div>
          <div
            class="flex-1 p-lg right-align white"
            style="max-width: calc(93vw - 4px);margin: auto;"
          >
            <div class="inline-block">
              <strong class="print-total-tokens">Total tokens used:</strong>
            </div>
            <div class="inline-block" style="width: 85px;text-align: center;">
              <strong class="print-total-tokens">{{ selectedTransaction.total_credits }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import authenticatedPage from "~/mixins/authenticated-page.js";
import dateToFromPicker from "~/mixins/dateToFromPicker.js";
import badgeFixture from '~/fixtures/badges';

const FILTER_TYPES = {
  REDEMPTION: "redemption",
  TRANSACTION_SENT: "transaction_sent",
  TRANSACTION_RECEIVED: "transaction_received"
};
const TRANSACTION_TYPES = {
  RECEIVED: "received",
  SPENT: "spent",
  SENT: "sent"
};

export default {
  mixins: [authenticatedPage, dateToFromPicker],
  mounted() {
    this.getDataFromApi().then(res => {
      this.userTransactions = res.items;
      this.table.totalItems = res.totalItems;
    });
  },
  data() {
    return {
      // Vuetify Data table Docs
      // https://vuetifyjs.com/en/components/data-tables
      table: {
        redemptionHeaders: [
          { text: "Date", value: "created_at", sortable: true },
          { text: "Past transaction", value: "id", sortable: true },
          { text: "Tokens used", value: "total_credits", sortable: true },
          { text: "View order details", value: "id", sortable: false }
        ],
        transactionSentHeaders: [
          { text: "Sender", value: "sender_name", sortable: true },
          {
            text: "Department",
            value: "sender_department_name",
            sortable: true
          },
          { text: "Sent date", value: "created_at", sortable: true },
          { text: "Receiver", value: "recipient_name", sortable: true },
          {
            text: "Department",
            value: "recipient_department_name",
            sortable: true
          },
          { text: "Tokens", value: "credits", sortable: true },
          { text: "Badges", value: "badge_name", sortable: true }
        ],
        transactionReceivedHeaders: [
          { text: "Sender", value: "sender_name", sortable: true },
          {
            text: "Department",
            value: "sender_department_name",
            sortable: true
          },
          { text: "Sent date", value: "created_at", sortable: true },
          { text: "Receiver", value: "recipient_name", sortable: true },
          {
            text: "Department",
            value: "recipient_department_name",
            sortable: true
          },
          { text: "Tokens", value: "credits", sortable: true },
          { text: "Badges", value: "badge_name", sortable: true }
        ],

        page: 1,
        totalItems: 0,
        isLoading: false
      },
      paginationTransactionSent: {},
      paginationTransactionReceived: {},
      paginationRedemption: {},

      userTransactions: [],
      selectedTransaction: {},
      dialog: false,

      type: FILTER_TYPES.REDEMPTION,
      transactionType: FILTER_TYPES.REDEMPTION,
      transactionTypes: [
        { text: "Redemption history", value: FILTER_TYPES.REDEMPTION },
        { text: "Tokens received", value: FILTER_TYPES.TRANSACTION_RECEIVED },
        { text: "Tokens sent", value: FILTER_TYPES.TRANSACTION_SENT }
      ],

      FILTER_TYPES,

      // Date picker
      today: this.$moment().format("YYYY-MM-DD"),
      dateFrom: "",
      dateFromFormatted: "",
      dateTo: "",
      dateToFormatted: "",
      menuFrom: false,
      menuTo: false
    };
  },
  methods: {
    getDataFromApi(noDateFilter = false) {
      this.table.isLoading = true;

      return new Promise((resolve, reject) => {
        let pagination = this.paginationRedemption;
        let url = "";

        switch (this.type) {
          case FILTER_TYPES.TRANSACTION_SENT:
            pagination = this.paginationTransactionSent;
            break;
          case FILTER_TYPES.TRANSACTION_RECEIVED:
            pagination = this.paginationTransactionReceived;
            break;
        }

        const { sortBy, descending, page, rowsPerPage } = pagination;

        let payload = {
          page
        };

        if (rowsPerPage === -1) {
          payload.paginate = 0;
        } else {
          payload.rpp = rowsPerPage ? rowsPerPage : 5;
        }

        switch (this.type) {
          case FILTER_TYPES.REDEMPTION:
            url = "/redeem/history";
            break;
          case FILTER_TYPES.TRANSACTION_SENT:
            url = "/users/transactions";
            payload.type = TRANSACTION_TYPES.SENT;
            break;
          case FILTER_TYPES.TRANSACTION_RECEIVED:
            url = "/users/transactions";
            payload.type = TRANSACTION_TYPES.RECEIVED;
            break;
        }

        if (sortBy) {
          payload.sort = `${sortBy}:${descending ? "desc" : "asc"}`;
        }
        if (!noDateFilter) {
          if (this.dateFrom && this.dateTo) {
            payload.from = this.dateFrom;
            payload.to = this.dateTo;
          }
        }

        this.$axios
          .get(this.$queryBuilder(url, payload))
          .then(res => {
            let items = res.data.data;

            if (rowsPerPage === -1) {
              items = res.data;
            }

            let filteredItems = [];

            switch (this.type) {
              case FILTER_TYPES.TRANSACTION_SENT:
                filteredItems = items.map(i => {
                  return {
                    id: i.id,
                    sender_name: i.sender.name,
                    sender_email: i.sender.email,
                    sender_department_name: i.sender.department_name,
                    created_at: i.created_at,
                    receiver_name: i.recipient.name,
                    receiver_email: i.recipient.email,
                    receiver_department_name: i.recipient.department_name,
                    credits: i.credits,
                    badge: this.getBadgeHTML(i.badge.id)
                  };
                });
                break;
              case FILTER_TYPES.TRANSACTION_RECEIVED:
                filteredItems = items.map(i => {
                  return {
                    id: i.id,
                    sender_name: i.sender.name,
                    sender_email: i.sender.email,
                    sender_department_name: i.sender.department_name,
                    created_at: i.created_at,
                    receiver_name: i.recipient.name,
                    receiver_email: i.recipient.email,
                    receiver_department_name: i.recipient.department_name,
                    credits: i.credits,
                    badge: this.getBadgeHTML(i.badge.id)
                  };
                });
                break;
              case FILTER_TYPES.REDEMPTION:
                filteredItems = items;
                break;
            }

            resolve({
              items: filteredItems,
              totalItems: res.data.total
            });
          })
          .catch(err => {
            reject(err.response);
          })
          .finally(() => {
            this.table.isLoading = false;
          });
      });
    },
    retrieve() {
      this.type = this.transactionType;
      this.getDataFromApi().then(res => {
        this.userTransactions = res.items;
        this.table.totalItems = res.totalItems;
      });
    },
    viewTransaction(idx) {
      this.selectedTransaction = Object.assign({}, this.userTransactions[idx]);
      this.dialog = true;
    },
    close() {
      this.selectedTransaction = {};
      this.dialog = false;
    },
    print() {
      window.print();
    },
    resetSearch() {
      this.resetDateSelection();
      this.retrieve();
    },
    getBadgeHTML(badgeID) {
      const badge = badgeFixture.find(b => b.id === badgeID);
      let result = '';

      if (badge) {
        result = badge.title_html;
      }

      return result;
    },
  },
  watch: {
    paginationTransactionSent: {
      handler() {
        this.getDataFromApi().then(res => {
          this.userTransactions = res.items;
          this.table.totalItems = res.totalItems;
        });
      },
      deep: true
    },
    paginationTransactionReceived: {
      handler() {
        this.getDataFromApi().then(res => {
          this.userTransactions = res.items;
          this.table.totalItems = res.totalItems;
        });
      },
      deep: true
    },
    paginationRedemption: {
      handler() {
        this.getDataFromApi().then(res => {
          this.userTransactions = res.items;
          this.table.totalItems = res.totalItems;
        });
      },
      deep: true
    },
    transactionType(val) {
      this.type = this.transactionType;
      this.dateFrom = "";
      this.dateTo = "";
      this.getDataFromApi(true).then(res => {
        this.userTransactions = res.items;
        this.table.totalItems = res.totalItems;
      });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/user-history.scss";
</style>
