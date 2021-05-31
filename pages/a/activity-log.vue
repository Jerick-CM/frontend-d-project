<template>
  <div id="admin-logs-page">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>Administrator activity log</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <div class="container--flex container--flex-align-item-center">
          <div class="dateFrom flex-1">
            <v-menu
              ref="menuFrom"
              v-bind:close-on-content-click="false"
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
              v-bind:close-on-content-click="false"
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
                v-bind:reactive="true"
                v-bind:min="dateFrom"
                v-bind:show-current="false"
                color="light-green lighten-1"
                no-title
                scrollable
              />
            </v-menu>
          </div>
          &nbsp;
          <div class="flex-2">
            <v-select
              v-model="transactionType"
              v-bind:items="transactionTypes"
              v-bind:readonly="table.isLoading"
              label="Activity type"
              color="light-green lighten-1"
              item-text="text"
              item-value="value"
              required
              outline
            />
          </div>

          <div class="flex-1 container--flex">
            <v-btn
              v-bind:disabled="table.isLoading"
              v-on:click.prevent="retrieve()"
              dark
              >Search</v-btn
            >
            <v-btn
              v-on:click.prevent="resetSearch()"
              v-bind:disabled="!hasDateSelected || table.isLoading"
              dark
              >Reset</v-btn
            >
          </div>
        </div>
      </v-toolbar>

      <v-data-table
        v-bind:headers="table.headers"
        v-bind:items="logs"
        v-bind:loading="table.isLoading"
        v-bind:pagination.sync="pagination"
        v-bind:total-items="table.totalItems"
        item-key="id"
        :rows-per-page-items="rowPerPage"
      >
        <template slot="items" slot-scope="props">
          <td>
            <h3>{{ props.item.user_id }}</h3>
          </td>
          <td>
            <h3>{{ props.item.user_name }}</h3>
            <p>{{ props.item.email }}</p>
          </td>
          <td>
            <h3>
              {{ $moment(props.item.created_at).format("DD MMM YYYY") || "" }}
              <br />
              {{ $moment(props.item.created_at).format("hh:mm A") || "" }}
            </h3>
          </td>
          <td>
            <h3 v-html="props.item.description"></h3>
          </td>
          <td>
            <h3 v-html="props.item.remarks"></h3>
          </td>
          <td>
            <h3 v-html="props.item.activity_type"></h3>
          </td>
          <td>
            <h3 v-html="props.item.user.countryname"></h3>
          </td>
        </template>
      </v-data-table>

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
import dateToFromPicker from "~/mixins/dateToFromPicker.js";
import adminPage from "~/mixins/admin-page.js";

const fileDownload = require("js-file-download");

const FILTER_TYPES = {
  BANNER: 1,
  EDM: 2,
  INVENTORY: 3,
  USER: 4,
  REPORTS: 5,
  CMS: 6,
  // SYSTEMLOGS: 7,
  MASS_TOKEN_UPDATE: 8,
  GROWTH_ACHIEVEMENT: 9,
  ALL: 0,
};

export default {
  mixins: [dateToFromPicker, adminPage],
  mounted() {
    this.getDataFromApi().then((res) => {
      this.logs = res.items;
      this.table.totalItems = res.totalItems;
    });
    this.getDownloadableLogs().then((res) => {
      this.downloadableLogs = res.items;
      this.logsTable.totalItems = res.totalItems;
    });
  },
  data() {
    return {
      rowPerPage: [5, 10, 25, 50, 100],
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
          { text: "User ID", value: "user_id", sortable: true },
          { text: "User", value: "user_name", sortable: true },
          { text: "Date | Time", value: "created_at", sortable: true },
          { text: "Action taken", value: "description", sortable: false },
          { text: "Remarks", value: "remarks", sortable: false },
          { text: "Activity Type", value: "activity_type", sortable: false },
          { text: "Country", value: "country", sortable: false },
        ],
        page: 1,
        totalItems: 0,
        isLoading: false,
      },
      pagination: {
        sortBy: "created_at",
        descending: true,
      },

      logs: [],

      transactionType: FILTER_TYPES.ALL,
      transactionTypes: [
        { text: "All", value: FILTER_TYPES.ALL },
        { text: "User", value: FILTER_TYPES.USER },
        { text: "EDM", value: FILTER_TYPES.EDM },
        { text: "Carousel", value: FILTER_TYPES.BANNER },
        { text: "Inventory", value: FILTER_TYPES.INVENTORY },
        { text: "Reports", value: FILTER_TYPES.REPORTS },
        { text: "CMS", value: FILTER_TYPES.CMS },
        // { text: "SYSTEMLOGS", value: FILTER_TYPES.SYSTEMLOGS },
        { text: "Mass Token Update", value: FILTER_TYPES.MASS_TOKEN_UPDATE },
        { text: "Growth Achievement", value: FILTER_TYPES.GROWTH_ACHIEVEMENT },
      ],

      // Date picker
      today: this.$moment().format("YYYY-MM-DD"),
      dateFrom: "",
      dateFromFormatted: "",
      dateTo: "",
      dateToFormatted: "",
      menuFrom: false,
      menuTo: false,
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
          // let headerLine = res.headers['content-disposition'];
          // let startFileNameIndex = headerLine.indexOf('"') + 1;
          // let endFileNameIndex = headerLine.lastIndexOf('"');
          // let filename = headerLine.substring(startFileNameIndex, endFileNameIndex);
          fileDownload(res.data, "logs.csv");
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
        payload.query = 'type:Administrator Activity Log';
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
    getDataFromApi(noDateFilter = false) {
      this.table.isLoading = true;

      return new Promise((resolve, reject) => {
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
          payload.sort = `${sortBy}:${descending ? "desc" : "asc"}`;
        }
        if (this.transactionType !== FILTER_TYPES.ALL) {
          payload.type = this.transactionType;
        }
        if (!noDateFilter) {
          if (this.dateFrom && this.dateTo) {
            payload.from = this.dateFrom;
            payload.to = this.dateTo;
          }
        }

        this.currentDownloadExcelURL = this.$queryBuilder(
          "/admin/logs/generate",
          payload
        );
        let _self = this;
        this.$axios
          .get(this.$queryBuilder("/admin/logs", payload))
          .then((res) => {
            let items;
            let totals;
            if (res.data.data) {
              res.data.data.forEach(function (item, index) {
                res.data.data[index]["user"][
                  "countryname"
                ] = _self.countryCodeToCountry(item.user.country);
              });
              items = res.data.data;
              totals = res.data.total;
            }

            // items = res.data.data;

            if (rowsPerPage === -1) {
              var count = 0;
              res.data.forEach(function (item, index) {
                count++;
                res.data[index]["user"][
                  "countryname"
                ] = _self.countryCodeToCountry(item.user.country);
              });

              items = res.data;
              totals = count;
            }

            resolve({
              items: items.map((i) => {
                return {
                  ...i,
                  user_name: i.user.name,
                  email: i.user.email,
                  _created_at: this.$moment(i.created_at),
                };
              }),
              totalItems: totals,
            });
            //  totalItems: res.data.total,
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
      this.getDataFromApi().then((res) => {
        this.logs = res.items;
        this.table.totalItems = res.totalItems;
      });
    },
    resetSearch() {
      this.resetDateSelection();
      this.retrieve();
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
      handler(val) {
        let _self = this;
        this.getDataFromApi().then((res) => {
          this.logs = res.items;
          this.table.totalItems = res.totalItems;
        });
      },
      deep: true,
    },
    transactionType(val) {
      this.dateFrom = "";
      this.dateTo = "";
      let _self = this;
      this.getDataFromApi(true).then((res) => {
        this.logs = res.items;
        this.table.totalItems = res.totalItems;
      });
    },
  },
};
</script>
