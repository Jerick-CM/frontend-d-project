
<template>
  <div id="cms-page">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>FAQ</v-toolbar-title>

        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <div class="container--flex container--flex-align-item-center"></div>
      </v-toolbar>

      <div class="container no-padding" style="background-color: white">
        <v-container fluid>
          <div>
            <nuxt-link :to="{ name: 'a-cms-faq' }">Go Back</nuxt-link>
            <!-- @submit.prevent="onSubmit" -->
            <form class="review-form" name="editfaq">
              <div class="faq col-md-12">
                <div>Edit FAQ</div>
              </div>

              <div class="form-group">
                <label for="title">Title</label>

                <v-text-field
                  v-model="form_title"
                  label="Title"
                  @blur="$v.form_title.$touch()"
                ></v-text-field>
                <!-- required -->
              </div>
              <template v-if="$v.form_title.$error">
                <p v-if="!$v.form_title.required" class="errorMessage">
                  Title is required.
                </p>
              </template>
              <!-- <v-app> -->
              <v-select
                :items="categories"
                v-model="form_category"
                label="Categories"
                single-line
                item-text="name"
                item-value="id"
                @blur="$v.form_category.$touch()"
              ></v-select>
              <template v-if="$v.form_category.$error">
                <p v-if="!$v.form_category.required" class="errorMessage">
                  Category is required.
                </p>
              </template>
              <div class="form-group">
                <client-only placeholder="loading...">
                  <ckeditor-nuxt
                    :config="editorConfig"
                    v-model="form_content"
                    @blur="$v.form_content.$touch()"
                  />
                </client-only>
              </div>
              <template v-if="$v.form_content.$error">
                <p v-if="!$v.form_content.required" class="errorMessage">
                  Content is required.
                </p>
              </template>
              <v-btn
                color="success"
                :disable="$v.$invalid"
                :disabled="submitted"
                v-bind:loading="submitloading"
                v-on:click="onSubmit()"
              >
                <!-- <input type="submit" value="Submit" /> -->
                <label class="white-font">Submit</label>
              </v-btn>
            </form>
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

import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import { required } from "vuelidate/lib/validators";
var timezone = process.env.TIMEZONE;
export default {
  head() {
    return {
      script: [],
      link: [],
    };
  },
  components: {
    "ckeditor-nuxt": () =>
      import("@engrjerickcmangalus/ckeditor-nuxt-custom-build-simpleuploader"),
  },
  validations: {
    form_title: { required },
    form_category: { required },
    form_content: { required },
  },
  data: () => ({
    submitloading: false,
    token: null,
    editorConfig: [],

    submitted: false,
    id: null,
    categories: [],
    categorieslist: [],
    dbSelect: null,
    dbOptions: [],
    form_title: null,
    form_category: null,
    form_content: null,
    errors: [],
    // editor: ClassicEditor,
    // editorConfig: {
    //   height: "500px",
    // },
  }),
  async created() {
    this.token = this.sessionToken;
    this.timezone = timezone;
    this.id = this.$route.query.edit;
    this.editorConfig = {
      simpleUpload: {
        uploadUrl: url + "/" + "api/faq/ckeditor",
        // uploadUrl: url + "/api/get-faq-category",
        headers: {
          Accept: "application/json",
          // Authorization: '`Bearer ${this.$store.getters["session/GET_TOKEN"]}`',
          // "X-CSRF-TOKEN": this.token,
          // "X-CSRF-TOKEN": this.token,
          Timezone: this.timezone,
          Authorization: "Bearer " + this.token,
          // Authorization:
          // "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM4YTVkNmMxZWJlN2FkNjI1MWNiYzA0YWVkZTZmNTgyOTY3OTEyOTNhNGI3NWIyZTk0YWNiOTk2NWU4MzM2NzQwZTUxOGJjM2ZmOTllNDJhIn0.eyJhdWQiOiIxIiwianRpIjoiMzhhNWQ2YzFlYmU3YWQ2MjUxY2JjMDRhZWRlNmY1ODI5Njc5MTI5M2E0Yjc1YjJlOTRhY2I5OTY1ZTgzMzY3NDBlNTE4YmMzZmY5OWU0MmEiLCJpYXQiOjE1Njg5NDcyNDUsIm5iZiI6MTU2ODk0NzI0NSwiZXhwIjoxNjAwNTY5NjQ1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.GAId3EMdLcEMc5I-nMwJMnq3XeOnNG9-ULKNVumSgPkefZu27HK2jBIb0RoZaV88KADA2V56Gd8mQu6WIwtgxrduFK4L-4UwrrrHZUrhe9ruP2JL7ctvegbZ2ZqMvYGcG3noPP_0t4fqbQf0q6-IM3rUF5q6HZx65HlCCCHWvyisOwftGFLwO-lDcshhrXm3FxvzFhgtSlHp933vcLib1SxQUsM_eNW-vuMnoDue5I9hBkH8tpfEdkJFYh2BTZqzO8PGNcI7i3LHC0PJOKZIkX7ja4b1ZBwkqwNEsP6Q2iMa5y9TagzmkAbWPYW1JoXRTX_ePj2PcBZyIRUQnT6OQT9B42YLO8CH25w5J85AXeHLPnO4P9qMyYjzt5f3LIJFK65U4RvC5webGM-de8ov67G2HWl7J0jeiYMGU-Xss1TTF8wm32rblm69Pp9HMarVgKxExvfiepmgFsNsQ65xFMxTNdjt3KnJujQiFJvvGdLDYMlpk4aoW2sRNcDp7-UjKjt4lPWXa3l_OHeJzHawA9V_wk0_NY4nJO4ZohRlsOdzyJjkByL7XeJxSXB3sn8tgAnl_jqN2nKbIjKo9mR1VoqL_Kc75UifjPfH51X6AGFdSFNwkL6-pPCw5NSNwVFFqlCh0k9vt-b94K9L1ihIakUpGeFE7TZwithBBRfGuo8",
        },
      },
    };
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.get(url + "/api/faq-search", {
        headers: {
          Accept: "application/json",
        },
        params: {
          id: this.$route.query.edit,
        },
      });

      this.form_title = response.data[0]["value"];
      this.form_category = response.data[0]["category_id"];
      this.form_content = response.data[0]["body"];
    } catch (error) {}

    try {
      const response = await this.$axios.get(
        url + "/api/get-faq-category",
        config
      );
      console.log(response.data);
      var data = [];
      this.categorieslist = response.data;
      for (const [key, value] of Object.entries(response.data)) {
        data.push({ id: value.id, name: value.name });
      }

      this.categories = data;
    } catch (error) {}
  },
  mixins: [adminPage],
  mounted() {},

  computed: {
    ...mapGetters({
      profile: "session/GET_PROFILE",
      sessionToken: "session/GET_TOKEN",
    }),
  },
  watch: {},
  methods: {
    save() {
      console.log(this.editorData);
    },
    onSubmit() {
      this.submitloading = true;
      if (this.form_title && this.form_category && this.form_content) {
        //success

        var categoryname = this.categorieslist[this.form_category]["name"];

        var profile_id = this.profile.id;
        var name = this.profile.name;
        let payload = new FormData();
        payload.append("value", this.form_title);
        payload.append("category_id", this.form_category);
        payload.append("body", this.form_content);
        payload.append("id", this.id);
        payload.append("profile_id", profile_id);
        payload.append("name", name);
        payload.append("category_name", categoryname);

        this.submitted = true;
        this.$axios
          .post("/update-faq-item", payload)
          .then((res) => {
            this.submitted = false;
            this.$toast.success("Save is done");
            this.submitloading = false;
          })
          .catch((error) => {
            this.submitted = false;
            this.submitloading = false;
          })
          .finally(() => {});
      } else {
        this.submitloading = false;
        //error
        this.errors.length = 0;

        if (!this.form_title) {
          this.$toast.error("Title is required.");
        }
        if (!this.form_category) {
          this.$toast.error("Category is required.");
        }
        if (!this.form_content) {
          this.$toast.error("Content body is required.");
        }
      }
    },
  },
};
</script>
<style lang="css" scoped>
.ck-editor__editable {
  min-height: 500px;
}
.errorMessage {
  color: red;
}
</style>

<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
