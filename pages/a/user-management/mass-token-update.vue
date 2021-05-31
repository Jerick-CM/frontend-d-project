<template>
  <div id="user-levels-page">
    <div class="container no-padding">
      <v-toolbar flat color="white">
        <v-toolbar-title>Mass Token Update</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
      <!-- <v-progress-linear
        v-show="progressBar"
        height="1"
        slot="progress"
        color="blue"
        indeterminate
      ></v-progress-linear> -->
      <div class="container no-padding" style="background-color: white">
        <v-container fluid>
          <br />
          <v-divider v-if="id == 9" class="mx-2" inset vertical></v-divider>
          <v-spacer v-if="id == 9"></v-spacer>
          <v-layout row>
            <v-flex xs12>
              <input
                style="display: none"
                type="file"
                ref="csv_masstokenupload"
                v-on:change="handlecsv_upload"
              />
              <v-btn color="primary" @click="onPickFile_masstokenupdate"
                >Select file</v-btn
              >

              {{ filename_masstokenupdate }}
            </v-flex>
          </v-layout>

          <v-layout row class="" v-if="csvcontent != ''">
            <v-flex xs12>
              <!-- :pagination.sync="pagination" -->
              <!-- select-all -->
              <v-data-table
                :headers="headers"
                :items="csvcontent"
                class="elevation-1"
                :pagination.sync="pagination"
              >
                <template v-slot:items="props">
                  <!-- col1 -->
                  <td
                    v-bind:class="{
                      columnerror: props.item.email_error,
                      row_error_start: props.item.row_error,
                    }"
                    class="text-xs-right"
                  >
                    {{ props.item.email }}
                  </td>
                  <!-- col2 -->
                  <td
                    v-bind:class="{
                      row_error_mid: props.item.row_error,
                      columnerror: props.item.ro_deduct_error,
                    }"
                    class="text-xs-right"
                  >
                    {{ props.item.ro_deduct }}
                  </td>
                  <!-- col3 -->
                  <td
                    v-bind:class="{
                      row_error_mid: props.item.row_error,
                      columnerror: props.item.ro_add_error,
                    }"
                    class="text-xs-right"
                  >
                    {{ props.item.ro_add }}
                  </td>
                  <!-- col4 -->
                  <td
                    v-bind:class="{
                      row_error_mid: props.item.row_error,
                      columnerror: props.item.mr_deduct_error,
                    }"
                    class="text-xs-right"
                  >
                    {{ props.item.mr_deduct }}
                  </td>
                  <!-- col5 -->
                  <td
                    v-bind:class="{
                      row_error_mid: props.item.row_error,
                      columnerror: props.item.mr_add_error,
                    }"
                    class="text-xs-right"
                  >
                    {{ props.item.mr_add }}
                  </td>
                  <!-- col6 -->
                  <td
                    :class="{
                      row_error_mid: props.item.row_error,
                      columnerror: props.item.message_error,
                    }"
                    class="text-xs-right"
                  >
                    <span v-html="props.item.message"></span>
                  </td>
                  <!-- col7 -->
                  <td
                    v-bind:class="{
                      row_error_mid: props.item.row_error,
                    }"
                    class="text-xs-right"
                  >
                    {{ props.item.adminlogmessage }}
                  </td>
                  <!-- col8 -->
                  <td
                    v-bind:class="{
                      row_error_end: props.item.row_error,
                    }"
                    class="text-xs-right"
                  >
                    {{ props.item.sendedm }}
                  </td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
          <v-layout row>
            <!-- white-space: pre; -->
            <v-flex xs12>
              <div style="color: red">
                {{ report_upload }}
              </div>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-btn
              color="success"
              v-on:click="fireSendEmail_masstokenupdate()"
              v-bind:loading="isMassUploadProcess"
              :disabled="masstoken_error"
            >
              <label class="white-font">Process</label>
            </v-btn>
          </v-layout>
        </v-container>
      </div>
      <div class="controls m-lg-vertical"></div>
    </div>
  </div>
</template>


<script>
import adminPage from "~/mixins/admin-page.js";
import { mapGetters } from "vuex";

const url = process.env.API_URL;
const axios = require("axios");
const config = {
  headers: {
    Accept: "application/json",
  },
};
import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import { required } from "vuelidate/lib/validators";
import Papa from "papaparse";

export default {
  async mounted() {
    const { data } = await this.$axios.get("/users", {
      params: {
        page: 1,
        paginate: 0,
        sort: "name:asc",
        blast: 1,
      },
    });
    this.items = data;
    console.log(data);
  },
  mixins: [adminPage],
  data() {
    return {
      // pagination: {},
      pagination: {
        rowsPerPage: -1,
      },
      headers: [
        {
          text: "Email",
          align: "left",
          sortable: false,
          align: "left",
          value: "name",
        },
        { text: "RO Deduct", sortable: false },
        { text: "RO Add", sortable: false },
        { text: "MR Deduct", sortable: false },
        { text: "MR Add", sortable: false },
        { text: "Message", sortable: false },
        { text: "Admin Log Message", sortable: false },
        { text: "Send EDM", sortable: false },
      ],
      // csvcontent: [],
      csvcontent: [],
      items: [""],
      progressBar: false,
      progressBarvalue: 0,
      report_upload: "",
      positions: [],
      positionsCopy: [],
      updateSelection: [],
      searchTimeOut: null,
      searchFilter: "",
      search: null,
      dialog: false,
      isSaving: false,

      isMassUploadProcess: false,

      filename_masstokenupdate: "",
      csv_masstokenupload: "",
      // previewTemplate: "",
      id: 9,
      masstoken_error: false,
    };
  },
  async created() {
    try {
      this.progressBar = true;
      const response = await this.$axios.get("/api/fetch-myrewards", {});
      var data = [];
      for (const [key, value] of Object.entries(
        response.data["data"]["badge_rewards_token"]
      )) {
        data.push({
          id: value.id,
          description: value.description,
          rewardstoken: value.rewardstoken,
          created_at: value.created_at,
          updated_at: value.updated_at,
        });
      }
      this.progressBarvalue = 100;
      this.progressBar = false;
      this.badgerewardtoken = data;
    } catch (error) {
      this.progressBar = false;
    }
  },
  methods: {
    onPickFile_masstokenupdate() {
      this.$refs.csv_masstokenupload.value = null;
      this.$refs.csv_masstokenupload.click();
    },
    fireSendEmail_masstokenupdate() {
      var file = null;
      var emails = [];
      var formData = new FormData();
      this.isMassUploadProcess = true;

      formData.append("csv_masstokenupload", this.csv_masstokenupload);

      this.$axios
        .post("/admin/edm/masstokenupdate/" + this.id, formData, {})
        .then(async (res) => {
          this.isMassUploadProcess = false;
          this.$toast.success("Mass Token Upload success.");
        })
        .catch((error) => {
          this.isMassUploadProcess = false;
          if (error.response.data["errormsg"]) {
            this.$toast.error(error.response.data["errormsg"]);
          } else {
            this.$toast.error("Mass Token Upload error.");
          }
        })
        .finally(() => {});
    },
    async applyCsvupload(results, file) {
      this.masstoken_error = false;
      this.report_upload = "";

      var stored_emails = [];
      var duplicate_emails = [];

      var missingEmails = [];
      var emails = this.emails;

      var csvcontentdata = [];
      var csvheader = [];

      for (var i = 0; i < results.data.length; i++) {
        if (i == 0) {
          csvheader.push({
            text: results.data[i][0],
            sortable: false,
            align: "left",
          });
          csvheader.push({
            text: results.data[i][1],
            sortable: false,
          });
          csvheader.push({
            text: results.data[i][2],
            sortable: false,
          });
          csvheader.push({
            text: results.data[i][3],
            sortable: false,
          });
          csvheader.push({
            text: results.data[i][4],
            sortable: false,
          });
          csvheader.push({
            text: results.data[i][5],
            sortable: false,
          });
          csvheader.push({
            text: results.data[i][6],
            sortable: false,
          });
          csvheader.push({
            text: results.data[i][7],
            sortable: false,
          });
        }

        if (results.data[i][1]) {
          var error = false;

          if (i > 0) {
            // if (results.data[i][0] == "") {
            // } else {
            var found = this.items.find(
              (element) =>
                element.email.toLowerCase() == results.data[i][0].toLowerCase()
            );

            var row_error = false;

            var email_error = false;
            // column 1 error check
            if (results.data[i][0] == "") {
              this.masstoken_error = true;
              email_error = true;
            }
            if (!found) {
              this.masstoken_error = true;
              email_error = true;
              row_error = true;
              missingEmails.push(results.data[i][0]);
            }

            // column 2 error check
            var ro_deduct_error = false;

            if (results.data[i][1] == "") {
              this.masstoken_error = true;
              ro_deduct_error = true;
              row_error = true;
            }

            if (
              Number.isInteger(parseFloat(results.data[i][1])) &&
              parseFloat(results.data[i][1]) >= 0
            ) {
            } else {
              this.masstoken_error = true;
              ro_deduct_error = true;
              row_error = true;
            }

            // column 3 error check
            var ro_add_error = false;

            if (results.data[i][2] == "") {
              this.masstoken_error = true;
              ro_add_error = true;
              row_error = true;
            }

            if (
              Number.isInteger(parseFloat(results.data[i][2])) &&
              parseFloat(results.data[i][2]) >= 0
            ) {
            } else {
              this.masstoken_error = true;
              ro_add_error = true;
              row_error = true;
            }

            // column 4 error check
            var mr_deduct_error = false;

            if (results.data[i][3] == "") {
              this.masstoken_error = true;
              mr_deduct_error = true;
              row_error = true;
            }

            if (
              Number.isInteger(parseFloat(results.data[i][3])) &&
              parseFloat(results.data[i][3]) >= 0
            ) {
            } else {
              this.masstoken_error = true;
              mr_deduct_error = true;
              row_error = true;
            }

            // column 5 error check
            var mr_add_error = false;
            if (results.data[i][4] == "") {
              this.masstoken_error = true;
              mr_add_error = true;
              row_error = true;
            }

            if (
              Number.isInteger(parseFloat(results.data[i][4])) &&
              parseFloat(results.data[i][4]) >= 0
            ) {
            } else {
              this.masstoken_error = true;
              mr_add_error = true;
              row_error = true;
            }

            // column 6 error check
            var message_error = false;
            if (
              results.data[i][7].toLowerCase() == "yes" &&
              results.data[i][5] == ""
            ) {
              this.masstoken_error = true;
              message_error = true;
              row_error = true;
            }

            // column 7 error check
            // column 8 error check

            // var ro_add_error = false;
            var str = results.data[i][5];
            // var res = str.replace(/\n/g, "<br>");
            // var res = str.replace(/[\n\r]/g, " ");
            var res = str.replace(/=(\r\n|\n|\r)/gm, "<br>");
            var res = res.replace("\\\n", "<br>");
            var res = unescape(res.split("\\n").join("<br>"));
            console.log(res);

            csvcontentdata.push({
              email: results.data[i][0],
              ro_deduct: results.data[i][1],
              ro_add: results.data[i][2],
              mr_deduct: results.data[i][3],
              mr_add: results.data[i][4],
              message: unescape(res),
              adminlogmessage: results.data[i][6],
              sendedm: results.data[i][7],

              row_error: row_error,

              email_error: email_error,
              ro_deduct_error: ro_deduct_error,
              ro_add_error: ro_add_error,
              mr_deduct_error: mr_deduct_error,
              mr_add_error: mr_add_error,
              message_error: message_error,
            });
            // }
          }
        }
      }
      this.csvcontent = csvcontentdata;
      console.log(csvheader);
      this.headers = csvheader;
      // console.log(this.csvcontent);

      // if (missingEmails.length == 0) {
      // } else {
      //   this.report_upload =
      //     `Email with no user: ` + missingEmails.join(", ") + `\n`;
      // }

      if (this.masstoken_error == true) {
        this.$toast.error(
          "Unable to process because there's error with the data, please update and reupload the csv."
        );
      }
      // this.previewTemplate = table;
    },
    handlecsv_upload(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        Papa.parse(files[0], {
          // newline: "\n",
          complete: this.applyCsvupload,
        });
      }
      try {
        const file = this.$refs.csv_masstokenupload.files[0];

        this.csv_masstokenupload = this.$refs.csv_masstokenupload.files[0];
        this.filename_masstokenupdate = this.$refs.csv_masstokenupload.files[0].name;
        console.log(this.filename_masstokenupdate);
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    ...mapGetters({
      profile: "session/GET_PROFILE",
    }),
  },
  watch: {},
};
</script>
<style lang="css" scoped>
.columnerror {
  background-color: #f08080 !important;
}
.row_error_start {
  border-left: 1px solid red !important;
  border-bottom: 1px solid red;
  border-top: 1px solid red;
}
.row_error_mid {
  border-bottom: 1px solid red;
  border-top: 1px solid red;
}
.row_error_end {
  border-bottom: 1px solid red;
  border-top: 1px solid red;
  border-right: 1px solid red;
}
</style>
<style scoped>
.white-font {
  color: white;
}
</style>