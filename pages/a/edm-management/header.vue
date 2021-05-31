<template>
  <div id="cms-page">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>Header</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <div class="container--flex container--flex-align-item-center"></div>
      </v-toolbar>

      <div class="container no-padding" style="background-color: white">
        <v-container class="grey lighten-5">
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-container>

        <v-container>
          <div class="row">
            <div class="faq col-md-12">
              <v-progress-linear
                v-show="progressBar"
                height="1"
                slot="progress"
                color="blue"
                indeterminate
              ></v-progress-linear>
              <v-data-table
                v-show="!progressBar"
                v-model="selected"
                :headers="headers"
                :items="edmheader"
                :items-per-page="5"
                item-key="id"
                class="elevation-1"
                :pagination.sync="pagination"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.label }}</td>

                  <td class="text-xs-right">
                    <nuxt-link
                      color="#000"
                      :to="{
                        path: '/a/edm-management/headeredit',
                        query: { edit: props.item.id },
                      }"
                    >
                      <v-btn color="blue">
                        <label class="white-font">Edit</label>
                      </v-btn>
                    </nuxt-link>
                  </td>

                  <td class>{{ props.item.created_at }}</td>
                </template>
              </v-data-table>
            </div>
          </div>
        </v-container>
      </div>

      <div class="controls m-lg-vertical"></div>
    </div>
  </div>
</template>



<script>
const axios = require("axios");

import adminPage from "~/mixins/admin-page.js";
import dateToFromPicker from "~/mixins/dateToFromPicker.js";
import downloadExcel from "~/mixins/downloadExcel.js";
import Sorttable from "sortablejs";
var timezone = process.env.TIMEZONE;
const url = process.env.API_URL;
import { mapGetters } from "vuex";
const config = {
  headers: {
    Accept: "application/json",
  },
};

export default {
  head() {
    return {
      script: [],
      link: [],
    };
  },
  components: {},
  watch: {},
  data() {
    return {
      progressBar: false,
      pagination: {
        rowsPerPage: 10,
      },
      dialog: false,
      selected: [],
      headers: [
        { text: "Title", value: "Title", sortable: false },
        { text: "Edit", value: "Edit", sortable: false },
        { text: "Date / Time", value: "Date / Time", sortable: false },
      ],
      edmheader: [],
    };
  },
  computed: {
    ...mapGetters({
      profile: "session/GET_PROFILE",
      sessionToken: "session/GET_TOKEN",
    }),
  },
  async created() {
    this.token = this.sessionToken;
    this.timezone = timezone;

    this.progressBar = true;
    try {
      const response = await this.$axios.get("/api/fetch-edmheader", {
        headers: {
          Accept: "application/json",
        },
        params: {
          id: this.$route.query.edit,
        },
      });

      console.log(response);

      var data = [];

      for (const [key, value] of Object.entries(
        response.data["data"]["header"]
      )) {
        data.push({
          id: value.id,
          label: value.label,
          content: value.content,
          created_at: value.created_at,
          updated_at: value.updated_at,
        });
      }
      this.edmheader = data;
      this.progressBar = false;
    } catch (error) {
      this.progressBar = false;
    }
  },
  mixins: [adminPage],
  mounted() {
    let table = document.querySelector(".v-datatable tbody");
    const _self = this;
    Sorttable.create(table, {
      onEnd({ newIndex, oldIndex }) {
        const rowSelected = _self.faqs.splice(oldIndex, 1)[0];
        console.log(rowSelected);
        var dataid = _self.faqs.splice(newIndex, 0, rowSelected);
        var data = [];
        for (const [key, value] of Object.entries(_self.faqs)) {
          data.push(value.id);
        }
        _self.fireSort(
          data,
          newIndex,
          oldIndex,
          rowSelected.id,
          rowSelected.categoryname,
          rowSelected.value
        );
      },
    });
  },

  methods: {},
  watch: {},
};
</script>

<style scoped>
.white-font {
  color: white;
}
</style>
<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
