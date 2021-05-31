<template>
  <div id="cms-page">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>Faq Upload Pdf</v-toolbar-title>

        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <div class="container--flex container--flex-align-item-center"></div>
      </v-toolbar>

      <div class="container no-padding" style="background-color: white">
        <v-container>
          <div class="row">
            <div class="faq col-md-12">
              <v-progress-linear
                height="1"
                v-show="progressBar"
                slot="progress"
                color="blue"
                indeterminate
              ></v-progress-linear>
              <v-data-table
                v-show="!progressBar"
                v-model="selected"
                :headers="headers"
                :items="faqs_file"
                :items-per-page="10"
                item-key="id"
                select-all
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-checkbox
                      v-model="props.selected"
                      primary
                      hide-details
                    ></v-checkbox>
                  </td>
                  <td class="handle" style="max-width: 28px">::</td>
                  <td>{{ props.item.pdf }}</td>

                  <td class="text-sm-center text-center">
                    <nuxt-link
                      color="#000"
                      :to="{
                        path: '/a/cms/faqfileedit',
                        query: { edit: props.item.id },
                      }"
                    >
                      <v-btn color="blue">
                        <!-- <nuxt-link
                        color="#000"
                        :to="{ name: 'a-cms-faqfileedit-id', params: { id: props.item.id}}"
                        >-->
                        <label class="white-font">Edit</label>
                      </v-btn>
                    </nuxt-link>
                  </td>

                  <td class="text-sm-center text-center">
                    {{ props.item.created_at }}
                  </td>
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
  data() {
    return {
      progressBar: false,
      dialog: false,
      selected: [],
      headers: [
        {
          text: "",
          align: "left",
          sortable: false,
        },
        { text: "File Name", value: "Title", sortable: false, align: "left" },
        { text: "Edit", value: "Edit", sortable: false, align: "center" },
        {
          text: "Date / Time",
          value: "Date / Time",
          sortable: false,
          align: "center",
        },
      ],
      faqs_file: [],
    };
  },
  async created() {
    var url = process.env.API_URL;
    try {
      this.progressBar = true;
      const response = await axios.get(url + "/api/fetch-faq-pdf", config);
      this.faqs_file = response.data["data"]["faqfile"];
      this.progressBar = false;
    } catch (error) {
      this.progressBar = false;
    }
  },
  mixins: [adminPage],
  mounted() {},

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
