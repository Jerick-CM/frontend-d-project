<template>
  <div id="users-page" v-if="selected">
    <div class="container no-padding">
      <v-toolbar flat color="white">
        <v-toolbar-title>User access</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="pt-0"
          v-model="searchFilter"
          append-icon="search"
          label="Search"
          color="light-green lighten-1"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="500px" width="500px">
          <v-btn type="button" slot="activator" dark @click="close()">Upload deny list</v-btn>

          <v-card>
            <v-card-title>
              <h3>Upload deny list</h3>
            </v-card-title>

            <form @submit.prevent="uploadBlacklist()">
              <v-card-text>
                <span>Select .xlsx file</span>
                <input type="file" ref="file" id="file" name="file" />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="button" dark @click="close()">Close</v-btn>
                <v-btn v-bind:loading="isUploading" type="submit" dark>Upload</v-btn>&nbsp;
              </v-card-actions>
            </form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="blocklistDialog" max-width="500px" width="500px">
          <v-btn type="button" slot="activator" icon flat>
            <v-icon>help</v-icon>
          </v-btn>
          <v-card>
            <v-card-title>
              <h3>View latest deny list</h3>
            </v-card-title>
            <v-card-text>
              <v-data-table
                v-bind:headers="table.blockListHeaders"
                v-bind:items="blocklist"
                v-bind:loading="table.blockListIsLoading"
                v-bind:pagination.sync="blocklistPagination"
                v-bind:total-items="table.blockListTotalItems"
                item-key="id"
              >
                <template slot="items" slot-scope="props">
                  <tr>
                    <td>
                      <h3>{{ props.item.name }}</h3>
                      <p>{{ props.item.email }}</p>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="button" dark @click="blocklistDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        v-bind:headers="table.headers"
        v-bind:items="users"
        v-bind:search="search"
        v-bind:loading="table.isLoading"
        v-bind:pagination.sync="pagination"
        v-bind:total-items="table.totalItems"
        item-key="id"
      >
        <template slot="items" slot-scope="props">
          <tr>
            <td>
              <h3>{{ props.item.name }}</h3>
              <p>{{ props.item.email }}</p>
            </td>
            <td>
              <h3>{{ props.item.department_name }}</h3>
            </td>
            <td>
              <h3>{{ props.item.position_name }}</h3>
            </td>
            <td>
              <h3>{{ props.item.countryname }}</h3>
            </td>
            <td>
              <h3>{{ props.item.career_level }}</h3>
            </td>
            <td>
              <v-checkbox
                v-model="props.item.is_active"
                v-bind:input-value="1"
                v-bind:true-value="1"
                v-bind:false-value="0"
                primary
                hide-details
                color="light-green lighten-1"
              ></v-checkbox>
            </td>
            <td>
              <v-checkbox
                v-model="props.item.is_admin"
                v-bind:input-value="1"
                v-bind:true-value="1"
                v-bind:false-value="0"
                primary
                hide-details
                color="light-green lighten-1"
              ></v-checkbox>
            </td>
          </tr>
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>

      <div class="controls m-lg-vertical right">
        <v-btn
          v-bind:loading="isSaving"
          v-bind:disabled="updateSelection.length === 0"
          v-on:click="doUpdate()"
          dark
        >Save</v-btn>
        <v-btn
          v-bind:disabled="updateSelection.length === 0"
          v-on:click="resetSelection()"
          dark
        >Cancel</v-btn>
      </div>

        <div class="controls m-lg-vertical">
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
import adminPage from "~/mixins/admin-page.js";

const fileDownload = require("js-file-download");
export default {
  mixins: [adminPage],
  mounted() {
    let _self = this;
    this.getDownloadableLogs().then((res) => {
      this.downloadableLogs = res.items;
      this.logsTable.totalItems = res.totalItems;
    });
    this.getDataFromApi().then((res) => {
      res.items.forEach(function (item, index) {
        res.items[index]["countryname"] = _self.countryCodeToCountry(
          item.country
        );
      });

      this.users = res.items;

      this.usersCopy = JSON.parse(JSON.stringify(res.items));
      this.table.totalItems = res.totalItems;
    });
  },
  data() {
    return {
      // Vuetify Data table Docs
      // https://vuetifyjs.com/en/components/data-tables
      //
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
        headers: [
          { text: "Name", value: "name", sortable: true },
          { text: "Department", value: "department_name", sortable: true },
          { text: "Designation", value: "position_name", sortable: true },
          { text: "Country", value: "country", sortable: true },
          { text: "Career level", value: "career_level", sortable: true },
          {
            text: "Portal access",
            value: "is_active",
            width: "20px",
            sortable: true,
          },
          {
            text: "Admin access",
            value: "is_admin",
            width: "20px",
            sortable: true,
          },
        ],
        blockListHeaders: [{ text: "Name", value: "name", sortable: true }],
        page: 1,
        totalItems: 0,
        isLoading: false,
        blockListIsLoading: false,
        blockListTotalItems: 0,
      },
      pagination: {},
      blocklistPagination: {},
      rowsPerPageItems: [5, 10, 20],

      users: [],
      usersCopy: [],
      blocklist: [],

      updateSelection: [],

      searchTimeOut: null,
      searchFilter: "",
      isShowBlacklistResult: false,
      search: null,
      dialog: false,
      blocklistDialog: false,

      isUploading: false,
      isSaving: false,

      currentDownloadExcelURL: "",
      isDownloading: false,
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
          fileDownload(res.data, "user_access_" + Date.now() + ".csv");
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
        payload.query = 'type:User Access';
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
    uploadBlacklist() {
      let payload = new FormData();

      payload.append("file", this.$refs.file.files[0]);

      this.isUploading = true;
      this.$axios
        .post(`/admin/users/blacklist`, payload)
        .then((response) => {
          const dataList = response.data;

          for (const k in dataList) {
            if (dataList.hasOwnProperty(k)) {
              this.$toast.success(dataList[k], {
                duration: null,
              });
            }
          }
          let _self = this;
          this.getDataFromApi().then((res) => {
            res.items.forEach(function (item, index) {
              res.items[index]["countryname"] = _self.countryCodeToCountry(
                item.country
              );
            });

            this.users = res.items;
            this.usersCopy = JSON.parse(JSON.stringify(res.items));
            this.table.totalItems = res.totalItems;
          });
          this.getLatestBlacklistLog();
          this.close();
        })
        .catch((error) => {
          for (let k in error.response.data) {
            const errorType = error.response.data[k];

            errorType.forEach((e) => {
              this.$toast.error(e);
            });
          }
        })
        .finally(() => {
          this.isUploading = false;
        });
    },
    close() {
      this.dialog = false;
    },
    doUpdate() {
      const payload = {
        users: this.updateSelection.map((s) => {
          return {
            id: s.id,
            is_admin: s.is_admin,
            is_active: s.is_active,
          };
        }),
      };

      this.isSaving = true;
      this.$axios
        .put("/admin/users", payload)
        .then((response) => {
          const messages = response.data;

          for (const k in messages) {
            this.$toast.success(messages[k]);
          }

          this.usersCopy = JSON.parse(JSON.stringify(this.users));
          this.updateSelection = [];
        })
        .finally(() => {
          this.isSaving = false;
        });
    },
    getDataFromApi() {
      this.table.isLoading = true;

      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;

        let payload = {
          page,
        };

        if (rowsPerPage === -1) {
          payload.paginate = 0;
        } else {
          payload.rpp = rowsPerPage;
        }
        if (sortBy) {
          payload.sort = `${sortBy}:${descending ? "desc" : "asc"}`;
        }
        if (this.search) {
          payload.search = this.search;
        }
        this.currentDownloadExcelURL = this.$queryBuilder(
          "/admin/users",
          payload
        );
        this.$axios
          .get(this.$queryBuilder("/admin/users", payload))
          .then((res) => {
            let items = res.data.data;

            if (rowsPerPage === -1) {
              items = res.data;
            }

            resolve({
              items: items.map((i) => {
                const existing = this.getFromSelection(i.id);

                if (!existing) {
                  return {
                    ...i,
                    is_active: i.is_active,
                    is_admin: i.is_admin,
                  };
                } else {
                  return {
                    ...i,
                    is_active: existing.is_active,
                    is_admin: existing.is_admin,
                  };
                }
              }),
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
    getLatestBlacklistLog() {
      this.table.blockListIsLoading = true;

      return new Promise((resolve, reject) => {
        const {
          sortBy,
          descending,
          page,
          rowsPerPage,
        } = this.blocklistPagination;

        const payload = {
          page,
          rpp: rowsPerPage ? rowsPerPage : 5,
        };

        if (sortBy) {
          payload.sort = `${sortBy}:${descending ? "desc" : "asc"}`;
        }

        this.$axios
          .get(
            this.$queryBuilder("/admin/blacklist-logs/result/latest", payload)
          )
          .then((res) => {
            let items = res.data.data;

            resolve({
              items: items,
              totalItems: res.data.total,
            });
          })
          .catch((err) => {
            reject(err.response);
          })
          .finally(() => {
            this.table.blockListIsLoading = false;
          });
      });
    },
    resetSelection() {
      this.users = JSON.parse(JSON.stringify(this.usersCopy));
      this.updateSelection = [];
    },
    isExistingOnSelection(id) {
      return this.updateSelection.findIndex((u) => u.id === id) !== -1;
    },
    addOrUpdateToSelection(item) {
      if (this.isExistingOnSelection(item.id)) {
        const idx = this.updateSelection.findIndex((u) => u.id === item.id);

        this.updateSelection[idx] = Object.assign({}, item);
      } else {
        this.updateSelection.push(item);
      }
    },
    removeFromSelection(id) {
      const idx = this.updateSelection.findIndex((u) => u.id === id);

      if (idx >= 0) {
        this.updateSelection.splice(idx, 1);
      }
    },
    getFromSelection(id) {
      return this.updateSelection.find((u) => u.id === id);
    },
    countryCodeToCountry(code) {
      var code = code;
      if (code == "AF") return "Afghanistan";
      if (code == "AX") return "Aland Islands";
      if (code == "AL") return "Albania";
      if (code == "DZ") return "Algeria";
      if (code == "AS") return "American Samoa";
      if (code == "AD") return "Andorra";
      if (code == "AO") return "Angola";
      if (code == "AI") return "Anguilla";
      if (code == "AQ") return "Antarctica";
      if (code == "AG") return "Antigua and Barbuda";
      if (code == "AR") return "Argentina";
      if (code == "AM") return "Armenia";
      if (code == "AW") return "Aruba";
      if (code == "AU") return "Australia";
      if (code == "AT") return "Austria";
      if (code == "AZ") return "Azerbaijan";
      if (code == "BS") return "Bahamas the";
      if (code == "BH") return "Bahrain";
      if (code == "BD") return "Bangladesh";
      if (code == "BB") return "Barbados";
      if (code == "BY") return "Belarus";
      if (code == "BE") return "Belgium";
      if (code == "BZ") return "Belize";
      if (code == "BJ") return "Benin";
      if (code == "BM") return "Bermuda";
      if (code == "BT") return "Bhutan";
      if (code == "BO") return "Bolivia";
      if (code == "BA") return "Bosnia and Herzegovina";
      if (code == "BW") return "Botswana";
      if (code == "BV") return "Bouvet Island (Bouvetoya)";
      if (code == "BR") return "Brazil";
      if (code == "IO")
        return "British Indian Ocean Territory (Chagos Archipelago)";
      if (code == "VG") return "British Virgin Islands";
      if (code == "BN") return "Brunei Darussalam";
      if (code == "BG") return "Bulgaria";
      if (code == "BF") return "Burkina Faso";
      if (code == "BI") return "Burundi";
      if (code == "KH") return "Cambodia";
      if (code == "CM") return "Cameroon";
      if (code == "CA") return "Canada";
      if (code == "CV") return "Cape Verde";
      if (code == "KY") return "Cayman Islands";
      if (code == "CF") return "Central African Republic";
      if (code == "TD") return "Chad";
      if (code == "CL") return "Chile";
      if (code == "CN") return "China";
      if (code == "CX") return "Christmas Island";
      if (code == "CC") return "Cocos (Keeling) Islands";
      if (code == "CO") return "Colombia";
      if (code == "KM") return "Comoros the";
      if (code == "CD") return "Congo";
      if (code == "CG") return "Congo the";
      if (code == "CK") return "Cook Islands";
      if (code == "CR") return "Costa Rica";
      if (code == "CI") return "Cote d'Ivoire";
      if (code == "HR") return "Croatia";
      if (code == "CU") return "Cuba";
      if (code == "CY") return "Cyprus";
      if (code == "CZ") return "Czech Republic";
      if (code == "DK") return "Denmark";
      if (code == "DJ") return "Djibouti";
      if (code == "DM") return "Dominica";
      if (code == "DO") return "Dominican Republic";
      if (code == "EC") return "Ecuador";
      if (code == "EG") return "Egypt";
      if (code == "SV") return "El Salvador";
      if (code == "GQ") return "Equatorial Guinea";
      if (code == "ER") return "Eritrea";
      if (code == "EE") return "Estonia";
      if (code == "ET") return "Ethiopia";
      if (code == "FO") return "Faroe Islands";
      if (code == "FK") return "Falkland Islands (Malvinas)";
      if (code == "FJ") return "Fiji the Fiji Islands";
      if (code == "FI") return "Finland";
      if (code == "FR") return "France, French Republic";
      if (code == "GF") return "French Guiana";
      if (code == "PF") return "French Polynesia";
      if (code == "TF") return "French Southern Territories";
      if (code == "GA") return "Gabon";
      if (code == "GM") return "Gambia the";
      if (code == "GE") return "Georgia";
      if (code == "DE") return "Germany";
      if (code == "GH") return "Ghana";
      if (code == "GI") return "Gibraltar";
      if (code == "GR") return "Greece";
      if (code == "GL") return "Greenland";
      if (code == "GD") return "Grenada";
      if (code == "GP") return "Guadeloupe";
      if (code == "GU") return "Guam";
      if (code == "GT") return "Guatemala";
      if (code == "GG") return "Guernsey";
      if (code == "GN") return "Guinea";
      if (code == "GW") return "Guinea-Bissau";
      if (code == "GY") return "Guyana";
      if (code == "HT") return "Haiti";
      if (code == "HM") return "Heard Island and McDonald Islands";
      if (code == "VA") return "Holy See (Vatican City State)";
      if (code == "HN") return "Honduras";
      if (code == "HK") return "Hong Kong";
      if (code == "HU") return "Hungary";
      if (code == "IS") return "Iceland";
      if (code == "IN") return "India";
      if (code == "ID") return "Indonesia";
      if (code == "IR") return "Iran";
      if (code == "IQ") return "Iraq";
      if (code == "IE") return "Ireland";
      if (code == "IM") return "Isle of Man";
      if (code == "IL") return "Israel";
      if (code == "IT") return "Italy";
      if (code == "JM") return "Jamaica";
      if (code == "JP") return "Japan";
      if (code == "JE") return "Jersey";
      if (code == "JO") return "Jordan";
      if (code == "KZ") return "Kazakhstan";
      if (code == "KE") return "Kenya";
      if (code == "KI") return "Kiribati";
      if (code == "KP") return "Korea";
      if (code == "KR") return "Korea";
      if (code == "KW") return "Kuwait";
      if (code == "KG") return "Kyrgyz Republic";
      if (code == "LA") return "Lao";
      if (code == "LV") return "Latvia";
      if (code == "LB") return "Lebanon";
      if (code == "LS") return "Lesotho";
      if (code == "LR") return "Liberia";
      if (code == "LY") return "Libyan Arab Jamahiriya";
      if (code == "LI") return "Liechtenstein";
      if (code == "LT") return "Lithuania";
      if (code == "LU") return "Luxembourg";
      if (code == "MO") return "Macao";
      if (code == "MK") return "Macedonia";
      if (code == "MG") return "Madagascar";
      if (code == "MW") return "Malawi";
      if (code == "MY") return "Malaysia";
      if (code == "MV") return "Maldives";
      if (code == "ML") return "Mali";
      if (code == "MT") return "Malta";
      if (code == "MH") return "Marshall Islands";
      if (code == "MQ") return "Martinique";
      if (code == "MR") return "Mauritania";
      if (code == "MU") return "Mauritius";
      if (code == "YT") return "Mayotte";
      if (code == "MX") return "Mexico";
      if (code == "FM") return "Micronesia";
      if (code == "MD") return "Moldova";
      if (code == "MC") return "Monaco";
      if (code == "MN") return "Mongolia";
      if (code == "ME") return "Montenegro";
      if (code == "MS") return "Montserrat";
      if (code == "MA") return "Morocco";
      if (code == "MZ") return "Mozambique";
      if (code == "MM") return "Myanmar";
      if (code == "NA") return "Namibia";
      if (code == "NR") return "Nauru";
      if (code == "NP") return "Nepal";
      if (code == "AN") return "Netherlands Antilles";
      if (code == "NL") return "Netherlands the";
      if (code == "NC") return "New Caledonia";
      if (code == "NZ") return "New Zealand";
      if (code == "NI") return "Nicaragua";
      if (code == "NE") return "Niger";
      if (code == "NG") return "Nigeria";
      if (code == "NU") return "Niue";
      if (code == "NF") return "Norfolk Island";
      if (code == "MP") return "Northern Mariana Islands";
      if (code == "NO") return "Norway";
      if (code == "OM") return "Oman";
      if (code == "PK") return "Pakistan";
      if (code == "PW") return "Palau";
      if (code == "PS") return "Palestinian Territory";
      if (code == "PA") return "Panama";
      if (code == "PG") return "Papua New Guinea";
      if (code == "PY") return "Paraguay";
      if (code == "PE") return "Peru";
      if (code == "PH") return "Philippines";
      if (code == "PN") return "Pitcairn Islands";
      if (code == "PL") return "Poland";
      if (code == "PT") return "Portugal, Portuguese Republic";
      if (code == "PR") return "Puerto Rico";
      if (code == "QA") return "Qatar";
      if (code == "RE") return "Reunion";
      if (code == "RO") return "Romania";
      if (code == "RU") return "Russian Federation";
      if (code == "RW") return "Rwanda";
      if (code == "BL") return "Saint Barthelemy";
      if (code == "SH") return "Saint Helena";
      if (code == "KN") return "Saint Kitts and Nevis";
      if (code == "LC") return "Saint Lucia";
      if (code == "MF") return "Saint Martin";
      if (code == "PM") return "Saint Pierre and Miquelon";
      if (code == "VC") return "Saint Vincent and the Grenadines";
      if (code == "WS") return "Samoa";
      if (code == "SM") return "San Marino";
      if (code == "ST") return "Sao Tome and Principe";
      if (code == "SA") return "Saudi Arabia";
      if (code == "SN") return "Senegal";
      if (code == "RS") return "Serbia";
      if (code == "SC") return "Seychelles";
      if (code == "SL") return "Sierra Leone";
      if (code == "SG") return "Singapore";
      if (code == "SK") return "Slovakia (Slovak Republic)";
      if (code == "SI") return "Slovenia";
      if (code == "SB") return "Solomon Islands";
      if (code == "SO") return "Somalia, Somali Republic";
      if (code == "ZA") return "South Africa";
      if (code == "GS") return "South Georgia and the South Sandwich Islands";
      if (code == "ES") return "Spain";
      if (code == "LK") return "Sri Lanka";
      if (code == "SD") return "Sudan";
      if (code == "SR") return "Suriname";
      if (code == "SJ") return "Svalbard & Jan Mayen Islands";
      if (code == "SZ") return "Swaziland";
      if (code == "SE") return "Sweden";
      if (code == "CH") return "Switzerland, Swiss Confederation";
      if (code == "SY") return "Syrian Arab Republic";
      if (code == "TW") return "Taiwan";
      if (code == "TJ") return "Tajikistan";
      if (code == "TZ") return "Tanzania";
      if (code == "TH") return "Thailand";
      if (code == "TL") return "Timor-Leste";
      if (code == "TG") return "Togo";
      if (code == "TK") return "Tokelau";
      if (code == "TO") return "Tonga";
      if (code == "TT") return "Trinidad and Tobago";
      if (code == "TN") return "Tunisia";
      if (code == "TR") return "Turkey";
      if (code == "TM") return "Turkmenistan";
      if (code == "TC") return "Turks and Caicos Islands";
      if (code == "TV") return "Tuvalu";
      if (code == "UG") return "Uganda";
      if (code == "UA") return "Ukraine";
      if (code == "AE") return "United Arab Emirates";
      if (code == "GB") return "United Kingdom";
      if (code == "US") return "United States of America";
      if (code == "UM") return "United States Minor Outlying Islands";
      if (code == "VI") return "United States Virgin Islands";
      if (code == "UY") return "Uruguay, Eastern Republic of";
      if (code == "UZ") return "Uzbekistan";
      if (code == "VU") return "Vanuatu";
      if (code == "VE") return "Venezuela";
      if (code == "VN") return "Vietnam";
      if (code == "WF") return "Wallis and Futuna";
      if (code == "EH") return "Western Sahara";
      if (code == "YE") return "Yemen";
      if (code == "XK") return "Kosovo";
      if (code == "ZM") return "Zambia";
      if (code == "ZW") return "Zimbabwe";
      return code;
    },
  },
  computed: {
    selected() {
      for (let i = 0, length = this.users.length; i < length; ++i) {
        const userID = this.users[i].id;

        // Check if there are changes
        if (
          this.usersCopy[i].is_active !== this.users[i].is_active ||
          this.usersCopy[i].is_admin !== this.users[i].is_admin
        ) {
          this.addOrUpdateToSelection(this.users[i]);
        } else if (this.isExistingOnSelection(userID)) {
          // If item is existing is on collection,
          // then check if there are changes on the value
          const exist = this.getFromSelection(userID);

          if (this.exist) {
            if (
              this.exist.is_active === this.usersCopy[i].is_active &&
              this.exist.is_admin === this.usersCopy[i].is_admin
            ) {
              this.removeFromSelection(userID);
            }
          }
        }
      }

      return true;
    },
  },
  watch: {
    pagination: {
      handler(val) {
        let _self = this;
        this.getDataFromApi().then((res) => {
          res.items.forEach(function (item, index) {
            res.items[index]["countryname"] = _self.countryCodeToCountry(
              item.country
            );
          });
          this.users = res.items;

          this.usersCopy = JSON.parse(JSON.stringify(res.items));
          this.table.totalItems = res.totalItems;
        });
      },
      deep: true,
    },
    blocklistPagination: {
      handler(val) {
        this.getLatestBlacklistLog().then((res) => {
          this.blocklist = res.items;
          this.table.blockListTotalItems = res.totalItems;
        });
      },
      deep: true,
    },
    searchFilter(val) {
      if (this.searchTimeOut) {
        clearTimeout(this.searchTimeOut);
      }

      this.searchTimeOut = setTimeout(() => {
        if (this.searchFilter.length >= 3) {
          this.search = this.searchFilter;
        } else {
          this.search = null;
        }
      }, 300);
    },
    blocklistDialog() {
      if (this.blocklistDialog) {
        this.blocklist = []; // Clear list
        this.getLatestBlacklistLog().then((res) => {
          this.blocklist = res.items;
          this.table.blockListTotalItems = res.totalItems;
        });
      }
    },
  },
};
</script>
