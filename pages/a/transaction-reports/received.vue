<template>
  <div id="user-transactions-page">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>System-to-User transactions</v-toolbar-title>
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
              min-width="290px">
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
              v-model="menuTo"
              v-bind:nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">
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
                  v-bind:reactive="true"
                  v-bind:min="dateFrom"
                  v-bind:show-current="false"
                  color="light-green lighten-1"
                  no-title
                  scrollable>
                  <v-spacer></v-spacer>
                </v-date-picker>
            </v-menu>
          </div>

          <div class="flex-1 container--flex">
            <v-btn
              v-on:click.prevent="retrieve()"
              v-bind:disabled="table.isLoading"
              dark>Search</v-btn>
            <v-btn
              v-on:click.prevent="resetSearch()"
              v-bind:disabled="!hasDateSelected || table.isLoading"
              dark>Reset</v-btn>
          </div>
        </div>
      </v-toolbar>

      <v-data-table
        v-bind:headers="table.receivedHeaders"
        v-bind:items="userTransactions"
        v-bind:loading="table.isLoading"
        v-bind:pagination.sync="paginationReceivedTable"
        v-bind:total-items="table.totalItems"
                    item-key="id">
        <template slot="items" slot-scope="props">
          <tr>
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
              <h3>{{ props.item.amount }}</h3>
            </td>
            <td>
              <h3>
                {{ formatDate(props.item.created_at) || '' }}<br />
                {{ formatDate(props.item.created_at, 'hh:mm A') || '' }}
              </h3>
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
  </div>
</template>


<script>
import adminPage from '~/mixins/admin-page.js';
import dateToFromPicker from '~/mixins/dateToFromPicker.js';
import downloadExcel from '~/mixins/downloadExcel.js';

const FILTER_TYPES = {
  RECEIVED: 'received',
  SPENT: 'spent',
  SENT: 'sent',
};

const fileDownload = require('js-file-download');
export default {
  mixins: [
    adminPage,
    dateToFromPicker,
    downloadExcel,
  ],
  mounted() {
    this.getDownloadableLogs().then((res) => {
      this.downloadableLogs = res.items;
      this.logsTable.totalItems = res.totalItems;
    });
    this.getDataFromApi()
        .then((res) => {
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
        receivedHeaders: [
          { text: 'User', value: 'user_name', sortable: true },
          { text: 'Department', value: 'department_name', sortable: true },
          { text: 'Designation', value: 'position_name', sortable: true },
          { text: 'Career level', value: 'career_level', sortable: false },
          { text: 'Tokens received', value: 'amount', sortable: true },
          { text: 'Date | Time', value: 'created_at', sortable: true },
        ],
        page: 1,
        totalItems: 0,
        isLoading: false,
      },
      paginationReceivedTable: {},

      userTransactions: [],

      type: FILTER_TYPES.RECEIVED,
      transactionType: FILTER_TYPES.RECEIVED,

      // Date picker
      today: this.$moment().format('YYYY-MM-DD'),
      dateFrom: '',
      dateTo: '',
      menuFrom: false,
      menuTo: false,
    };
  },
  computed: {
    dateFromFormatted() {
      return this.formatDate(this.dateFrom)
    },
    dateToFormatted() {
      return this.formatDate(this.dateTo)
    },
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
        payload.query = 'type:System to User Transaction';
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
        let pagination = this.paginationReceivedTable;

        const { sortBy, descending, page, rowsPerPage } = pagination;

        let payload = {
          page: page ? page : 1,
          type: this.type,
        };

        if (rowsPerPage === -1) {
          payload.paginate = 0;
        } else {
          payload.rpp = (rowsPerPage) ? rowsPerPage : 5;
        }
        if (sortBy) {
          payload.sort = `${sortBy}:${ (descending) ? 'desc' : 'asc' }`;
        }
        if (this.dateFrom && this.dateTo) {
          payload.from = this.dateFrom;
          payload.to = this.dateTo;
        }

        this.currentDownloadCSVURL = this.$queryBuilder('/admin/transactions', payload);
        this.currentDownloadExcelURL = this.$queryBuilder('/admin/transactions', payload);

        this.$axios
            .get(this.$queryBuilder('/admin/transactions', payload))
            .then(res => {
              let items = res.data.data;

              if (rowsPerPage === -1) {
                items = res.data;
              }

              let filteredItems = items.map(i => {
                return {
                    id: i.id,
                    user_name: i.user.name,
                    email: i.user.email,
                    department: i.user.department_name,
                    position: i.user.position_name,
                    career_level: i.user.career_level,
                    amount: i.amount,
                    created_at: i.created_at,
                };
              });

              resolve({
                items: filteredItems,
                totalItems: res.data.total,
              });
            })
            .catch((err) => {
              reject(err.response);
            })
            .finally(() => {
              this.table.isLoading = false;
            });
      });
    },
    retrieve() {
      this.type = this.transactionType;
      this.getDataFromApi()
          .then((res) => {
            this.userTransactions = res.items;
            this.table.totalItems = res.totalItems;
          });
    },
    resetSearch() {
      this.resetDateSelection();
      this.retrieve();
    },
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
    paginationReceivedTable: {
      handler() {
        this.getDataFromApi()
            .then((res) => {
              this.userTransactions = res.items;
              this.table.totalItems = res.totalItems;
            });
      },
      deep: true,
    },
  },
};
</script>


<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
