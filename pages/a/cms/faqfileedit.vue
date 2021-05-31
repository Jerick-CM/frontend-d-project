<template>
  <div id="cms-page">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>FAQ</v-toolbar-title>

        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <div class="container--flex container--flex-align-item-center"></div>
      </v-toolbar>

      <div class="container no-padding" style="background-color:white;">
        <v-container fluid>
          <div>
            <nuxt-link :to="{ name: 'a-cms-faquploads'}">Go Back</nuxt-link>

            <div class="large-12 medium-12 small-12 cell">
              <label>
                File
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
              </label>
              <v-btn color="success" v-on:click="submitFile()">Submit</v-btn>
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
import { mapGetters } from "vuex";
var url = process.env.API_URL;

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

  data: () => ({
    id: null,
    faqs_file: [],
    file: "",
  }),
  async created() {
    // this.id = this.$route.params.id;
    this.id = this.$route.query.edit;
    try {
      const response = await axios.get(url + "/api/fetch-faq-pdf", config);
      this.faqs_file = response.data["data"]["faqfile"];
    } catch (error) {}
  },
  mixins: [adminPage],
  mounted() {},
  computed: {
    ...mapGetters({
      profile: "session/GET_PROFILE",
    }),
  },
  watch: {},
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    submitFile() {
      var profile_id = this.profile.id;
      var name = this.profile.name;
      let formData = new FormData();
      formData.append("pdf", this.file);
      formData.append("id", this.id);
      formData.append("profile_id", profile_id);
      formData.append("name", name);

      this.$axios
        .post("/update-faq-file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          this.$toast.success("Save is done");
        })
        .catch((error) => {})
        .finally(() => {});
    },
  },
};
</script>
<style lang="css" scoped>
.ck-editor__editable {
  min-height: 500px;
}
</style>

<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
