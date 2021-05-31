<template>
  <div id="user-transactions-page">
    <div class="container no-padding">
      <div class="non-print">
        <v-toolbar flat color="white" class="pt-4">
          <v-toolbar-title>ACE e-Store transactions</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <div class="container--flex container--flex-align-item-center">
            <div class="dateFrom flex-1">
              <v-menu
                ref="menuFrom"
                :close-on-content-click="false"
                v-model="menuFrom"
                :nudge-right="40"
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
                  v-bind:reactive="true"
                  v-bind:max="today"
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
                :close-on-content-click="false"
                v-model="menuTo"
                :nudge-right="40"
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
                  :readonly="!dateFrom"
                  :reactive="true"
                  :min="dateFrom"
                  :show-current="false"
                  color="light-green lighten-1"
                  no-title
                  scrollable
                />
              </v-menu>
            </div>&nbsp;
            <div class="flex-1 container--flex">
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
          :headers="table.spentHeaders"
          :items="userTransactions"
          :loading="table.isLoading"
          :pagination.sync="paginationSpentTable"
          :total-items="table.totalItems"
          item-key="id"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td>
                <h3>{{ props.item.order_number }}</h3>
              </td>
              <td>
                <h3>
                  {{ $moment(props.item.created_at).format('DD MMM YYYY') || '' }}
                  <br />
                  {{ $moment(props.item.created_at).format('hh:mm A') || '' }}
                </h3>
              </td>
              <td>
                <h3>{{ props.item.user_name }}</h3>
                <p>{{ props.item.email }}</p>
              </td>
              <td>
                <h3>{{ props.item.department }}</h3>
              </td>
              <td>
                <h3>{{ props.item.position }}</h3>
              </td>
              <td>
                <h3>{{ props.item.career_level }}</h3>
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

        <div class="container no-padding" style="margin-top: 25px !important">
        <v-toolbar flat color="white" class="pt-4">
          <v-toolbar-title>Downloadable logs</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-btn
            class="right"
            dark
            v-on:click="generateCsv()"
            >Generate log file</v-btn
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table
          v-bind:headers="logsTable.headers"
          v-bind:items="downloadableLogs"
          v-bind:loading="logsTable.isLoading"
          v-bind:pagination.sync="logsTablePagination"
          v-bind:total-items="logsTable.totalItems"
          item-key="id"
        >
          <template slot="items" slot-scope="props">
            <td>
              <h3>{{ props.item.created_at }}</h3>
            </td>
            <td>
              <h3>{{ props.item.status }}</h3>
            </td>
            <td>
              <v-btn
                class="right"
                v-if="props.item.status == 'ready'"
                dark
                v-on:click="downloadFile(props.item)"
                >Download</v-btn
              >
            </td>
          </template>
        </v-data-table>
        </div>
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
                      <tr v-for="(i, idx) in selectedTransaction.redeem_items" :key="idx">
                        <td class="center-align p-lg">
                          <div class="container--flex container--flex-align-item-center">
                            <div class="item-img flex-1 no-padding">
                              <img
                                class="responsive-img"
                                :src="i.inventory.primary_photo.file"
                                :alt="i.inventory.name"
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
                <tr v-for="(i, idx) in selectedTransaction.redeem_items" :key="idx">
                  <td class="center-align p-lg">
                    <div class="container--flex container--flex-align-item-center">
                      <div class="item-img flex-1 no-padding">
                        <img
                          class="responsive-img"
                          :src="i.inventory.primary_photo.file"
                          :alt="i.inventory.name"
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
import adminPage from "~/mixins/admin-page.js";
import dateToFromPicker from "~/mixins/dateToFromPicker.js";
import downloadExcel from "~/mixins/downloadExcel.js";

const FILTER_TYPES = {
  RECEIVED: "received",
  SPENT: "spent",
  SENT: "sent"
};

const fileDownload = require('js-file-download');
export default {
  mixins: [
    adminPage,
    dateToFromPicker,
    downloadExcel
  ],
  mounted() {
    this.getDownloadableLogs().then((res) => {
      this.downloadableLogs = res.items;
      this.logsTable.totalItems = res.totalItems;
    });
    this.getDataFromApi().then(res => {
      this.userTransactions = res.items;
      this.table.totalItems = res.totalItems;
    });
  },
  data() {
    return {
      // Vuetify Data table Docs
      // https://vuetifyjs.com/en/components/data-tables
      downloadableLogs: [],
      logsTable: {
        headers: [
          { text: "Date Generated", value: "created_at", sortable: true },
          { text: "Status", value: "status", sortable: true },
          { text: "", value: "", sortable: false },
        ],
        page: 1,
        totalItems: 0,
        isLoading: false,
      },
      logsTablePagination: {
        sortBy: "created_at",
        descending: true,
      },
      table: {
        spentHeaders: [
          { text: "Order #", value: "id", sortable: true },
          { text: "Date | Time", value: "created_at", sortable: true },
          { text: "User", value: "user_name", sortable: true },
          { text: "Department", value: "department_name", sortable: true },
          { text: "Designation", value: "position_name", sortable: true },
          { text: "Career level", value: "career_level", sortable: false },
          { text: "Tokens transacted", value: "total_credits", sortable: true },
          { text: "View order details", value: "id", sortable: false }
        ],

        page: 1,
        totalItems: 0,
        isLoading: false
      },
      paginationSpentTable: {},

      userTransactions: [],
      selectedTransaction: {},
      dialog: false,

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
    downloadFile(log) {
      if (this.isDownloading) return;

      this.isDownloading = true;
      this.$axios
        .get(this.$queryBuilder("/admin/logs/download", { id: log.id }), {
          responseType: "blob",
        })
        .then((res) => {
          fileDownload(res.data, "transaction_" + Date.now() + ".csv");
        })
        .catch((err) => {
          if (err.response) {
            this.$toast.error(err.response.data.message);
          }
        })
        .finally(() => {
          this.isDownloading = false;
        });
    },
    getDownloadableLogs(noDateFilter = false) {
      this.logsTable.isLoading = true;
      return new Promise((resolve, reject) => {
        const {
          sortBy,
          descending,
          page,
          rowsPerPage,
        } = this.logsTablePagination;

        let payload = {
          page,
        };
        payload.query = 'type:Ace E-Store Transaction';
        if (rowsPerPage === -1) {
          payload.paginate = 0;
        } else {
          payload.rpp = rowsPerPage ? rowsPerPage : 5;
        }
        if (sortBy) {
          payload.sort = `${sortBy}:${descending ? "desc" : "asc"}`;
        }
        let _self = this;
        this.$axios
          .get(this.$queryBuilder("/admin/logs/downloadables", payload))
          .then((res) => {
            let items = res.data.data;

            if (rowsPerPage === -1) {
              items = res.data;
            }
            resolve({
              items: items,
              totalItems: res.data.total,
            });
          })
          .catch((err) => {
            reject(err.response);
          })
          .finally(() => {
            this.logsTable.isLoading = false;
          });
      });
    },
    generateCsv() {
      if (this.isDownloading) return;
      this.isDownloading = true;
      this.$axios
        .get(`${this.currentDownloadExcelURL}&download=1`)
        .then((res) => {
          this.getDownloadableLogs().then((res) => {
            this.downloadableLogs = res.items;
            this.logsTable.totalItems = res.totalItems;
          });
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message);
        })
        .finally(() => {
          this.isDownloading = false;
        });
    },
    getDataFromApi() {
      this.table.isLoading = true;

      return new Promise((resolve, reject) => {
        let pagination = this.paginationSpentTable;

        const { sortBy, descending, page, rowsPerPage } = pagination;

        let payload = {
          page: page ? page : 1,
          type: FILTER_TYPES.SPENT
        };

        if (rowsPerPage === -1) {
          payload.paginate = 0;
        } else {
          payload.rpp = rowsPerPage ? rowsPerPage : 5;
        }
        if (sortBy) {
          payload.sort = `${sortBy}:${descending ? "desc" : "asc"}`;
        }
        if (this.dateFrom && this.dateTo) {
          payload.from = this.dateFrom;
          payload.to = this.dateTo;
        }

        this.currentDownloadExcelURL = this.$queryBuilder('/admin/transactions', payload);
        this.currentDownloadCSVURL = this.$queryBuilder(
          "/admin/transactions",
          payload
        );

        this.$axios
          .get(this.$queryBuilder("/admin/transactions", payload))
          .then(res => {
            let items = res.data.data;

            if (rowsPerPage === -1) {
              items = res.data;
            }

            let filteredItems = items.map(i => {
              return {
                order_number: i.order_number,
                created_at: i.created_at,
                user_name: i.user.name,
                email: i.user.email,
                department: i.user.department_name,
                position: i.user.position_name,
                career_level: i.user.career_level,
                total_credits: i.total_credits,
                redeem_items: i.redeem_items
              };
            });

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
    }
  },
  watch: {
    logsTablePagination: {
      handler(val) {
        let _self = this;
        this.getDownloadableLogs().then((res) => {
          this.downloadableLogs = res.items;
          this.logsTable.totalItems = res.totalItems;
        });
      },
      deep: true,
    },
    paginationSpentTable: {
      handler() {
        this.getDataFromApi().then(res => {
          this.userTransactions = res.items;
          this.table.totalItems = res.totalItems;
        });
      },
      deep: true
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
