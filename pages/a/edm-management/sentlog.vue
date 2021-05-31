<template>
  <div class="container no-padding">
    <v-toolbar flat color="white">
      <v-toolbar-title style="width: 250px">EDM Sent Logs</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table
      v-bind:headers="table.header"
      v-bind:items="logs"
      v-bind:loading="table.isLoading"
      v-bind:pagination.sync="pagination"
      v-bind:total-items="table.totalItems"
      item-key="id"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <!-- Sender Name-->
          <!-- MESSAGE SEND TOKEN -->
          <!-- MESSAGE RECEIVED TOKEN -->
          <td
            v-if="
              props.item.type == 'WELCOME' ||
              props.item.type == 'MONTHLY SUMMARY' ||
              props.item.type == 'REDEMPTION' ||
              props.item.type == 'TIER Promotion' ||
              props.item.type == 'MESSAGE RECEIVED' ||
              props.item.type == 'MESSAGE RECEIVED TOKEN' ||
              props.item.type == 'MASS TOKEN UPDATE' ||
              props.item.type == 'Log Report Generation'
            "
          >
            <h3>System</h3>
          </td>
          <td v-else-if="props.item.type == 'MESSAGE SEND'">
            <h3>{{ props.item.data.user.name }}</h3>
          </td>
          <td v-else-if="props.item.type == 'MESSAGE SEND TOKEN'">
            <h3>{{ props.item.data.user.name }}</h3>
          </td>
          <td v-else-if="props.item.type == 'CUSTOM EDM'">
            <h3>{{ props.item.sender }}</h3>
          </td>
          <td v-else>
            <h3>N/A</h3>
          </td>
          <!-- Sender Email-->
          <td>
            <h3>{{ props.item.sender_email }}</h3>
          </td>
          <!-- Recipient Name -->
          <td v-if="props.item.type == 'MONTHLY SUMMARY'">
            <h3>{{ props.item.data.user.name }}</h3>
          </td>
          <td v-else-if="props.item.type == 'REDEMPTION'">
            <h3>{{ props.item.data.user.name }}</h3>
          </td>
          <td v-else-if="props.item.type == 'WELCOME'">
            <h3>{{ props.item.data.user.name }}</h3>
          </td>
          <td v-else-if="props.item.type == 'MESSAGE SEND'">
            <h3>{{ props.item.data.recipient.name }}</h3>
          </td>
          <td v-else-if="props.item.type == 'MESSAGE RECEIVED'">
            <h3>{{ props.item.data.sender.name }}</h3>
          </td>
          <td v-else-if="props.item.type == 'MESSAGE SEND TOKEN'">
            <h3>{{ props.item.data.recipient.name }}</h3>
          </td>
          <td v-else-if="props.item.type == 'MESSAGE RECEIVED TOKEN'">
            <h3>{{ props.item.data.sender.name }}</h3>
          </td>
          <td v-else-if="props.item.type == 'TIER Promotion'">
            <h3>{{ props.item.data.user.name }}</h3>
          </td>
          <td v-else-if="props.item.type == 'CUSTOM EDM'">
            <h3>{{ props.item.recipient }}</h3>
          </td>
          <td v-else-if="props.item.type == 'MASS TOKEN UPDATE'">
            <h3>{{ props.item.recipient }}</h3>
          </td>
          <td v-else-if="props.item.type == 'Log Report Generation'">
            <h3>{{ props.item.recipient }}</h3>
          </td>
          <td v-else>
            <h3>N/A</h3>
          </td>

          <!-- Recipient Name -->

          <td v-if="props.item.type == 'MESSAGE SEND'">
            <p>{{ props.item.data.recipient.email }}</p>
          </td>
          <td v-else-if="props.item.type == 'MESSAGE RECEIVED'">
            {{ props.item.data.sender.email }}
          </td>
          <td v-else-if="props.item.type == 'CUSTOM EDM'">
            <h3>{{ props.item.data.recipient_email }}</h3>
          </td>
          <td v-else-if="props.item.type == 'MASS TOKEN UPDATE'">
            <h3>{{ props.item.data.recipient_email }}</h3>
          </td>
          <td v-else>
            <p>{{ props.item.data.user.email }}</p>
          </td>
          <!-- Edm Subject -->

          <td>
            <p>{{ props.item.edm_subject }}</p>
          </td>
          <!-- Type -->
          <td>
            <p>{{ props.item.type }}</p>
          </td>
          <!-- Date -->
          <td>
            <p>{{ props.item.created_at }}</p>
          </td>
        </tr>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
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
</template>
<script>
import adminPage from "~/mixins/admin-page.js";
const fileDownload = require("js-file-download");
import { mapGetters } from "vuex";
export default {
  mounted() {
    this.getDownloadableLogs().then((res) => {
      this.downloadableLogs = res.items;
      this.logsTable.totalItems = res.totalItems;
    });
    this.getData();
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
    pagination: {
      handler() {
        this.getData();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      profile: "session/GET_PROFILE",
      sessionToken: "session/GET_TOKEN",
    }),
  },
  data() {
    return {
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
      isDownloading: false,
      pagination: {},
      logs: [],
      table: {
        totalItems: 0,
        header: [
          { text: "Sender Name", sortable: false },
          { text: "Sender E-mail", sortable: false },
          { text: "Recipient Name", sortable: false },
          { text: "Recipient E-mail", sortable: false },
          { text: "EDM Subject", sortable: false },
          { text: "EDM Type", sortable: false },
          { text: "Sent Date", value: "created_at", sortable: true },
        ],
        isLoading: false,
      },
      currentDownloadCSVURL: "",
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
          fileDownload(res.data, "edm_logs_" + Date.now() + ".csv");
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
        payload.query = 'type:EDM Sent Logs';
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
    downloadCSV() {
      var profile_id = this.profile.id;
      var name = this.profile.name;
      if (this.isDownloading) return;
      this.isDownloading = true;

      this.$axios
        .get(
          `${this.currentDownloadCSVURL}&download=1&profile_id=${this.profile.id}&name=${this.profile.name}`,
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          // fileDownload(res.data, "logs.xlsx");
          fileDownload(res.data, "logs.xlsx");
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message);
        })
        .finally(() => {
          this.isDownloading = false;
        });
    },
    async getData() {
      this.table.isLoading = true;
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      let payload = {
        page,
      };
      if (rowsPerPage === -1) {
        payload.paginate = 0;
      } else {
        payload.rpp = rowsPerPage ? rowsPerPage : 5;
      }
      if (sortBy) {
        payload.sort = `${sortBy}:${descending ? "asc" : "desc"}`;
      }
      this.currentDownloadExcelURL = this.$queryBuilder(
        "/admin/edm/logs",
        payload
      );
      const { data } = await this.$axios.get(this.currentDownloadExcelURL);

      this.currentDownloadCSVURL = this.$queryBuilder(
        "/admin/edm/logs",
        payload
      );
      try {
        if (data.data) {
          this.logs = data.data;

          this.table.totalItems = data.total;
          this.table.isLoading = false;
        } else {
          this.logs = data;
          this.table.totalItems = count(data);
          this.table.isLoading = false;
        }
      } catch (error) {}
      this.table.isLoading = false;
    },
  },

  mixins: [adminPage],
};
</script>