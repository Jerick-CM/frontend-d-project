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
            <!--  -->
            <form
              class="review-form"
              name="createfaq"
              @submit.prevent="onSubmit"
            >
              <div class="faq col-md-12">
                <div>Create FAQ</div>
              </div>

              <div class="form-group">
                <label for="title">Title</label>

                <v-text-field
                  v-model="form_title"
                  label="Title"
                  @blur="$v.form_title.$touch()"
                ></v-text-field>
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
              <!-- <div class="form-group"> -->
              <!-- <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="form_content"
                  @blur="$v.form_content.$touch()"
              ></ckeditor>-->
              <!-- </div> -->
              <div class="form-group">
                <!-- <vue-editor
                  :editorOptions="editorSettings"
                  v-model="form_content"
                  @blur="$v.form_content.$touch()"
                ></vue-editor>-->

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

              <div>
                <!-- <rich-editor v-model="content" /> -->
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="content"
                  v-if="editor"
                ></ckeditor>
                <!-- <div id="editor"></div> -->
                <!-- <ckeditor-nuxt v-model="contentHolder" :config="editorConfig" /> -->
              </div>

              <v-btn
                color="success"
                :disable="$v.$invalid"
                :disabled="submitted"
                v-bind:loading="submitloading"
                v-on:click="onSubmit()"
              >
                <label class="white-font">Submit</label>
                <!-- <input type="submit" value="Submit" /> -->
              </v-btn>
            </form>
          </div>
        </v-container>
      </div>
      <div class="controls m-lg-vertical"></div>
    </div>
  </div>
</template>

</script>
<script>
const axios = require("axios");
import adminPage from "~/mixins/admin-page.js";
import dateToFromPicker from "~/mixins/dateToFromPicker.js";
import downloadExcel from "~/mixins/downloadExcel.js";
import { mapGetters } from "vuex";

import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import { required } from "vuelidate/lib/validators";

var url = process.env.API_URL;
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
  data: () => ({
    submitloading: false,
    editor: true,
    editorVal: "",
    contentHolder: "",
    token: null,
    editorConfig: [],
    editorSettings: {
      modules: {
        imageDrop: true,
        imageResize: {},
      },
    },
    submitted: false,
    categories: [],
    dbSelect: null,
    dbOptions: [],
    form_title: null,
    form_category: null,
    form_content: null,
    categorieslist: [],
    errors: [],
    content: null,
  }),
  validations: {
    form_title: { required },
    form_category: { required },
    form_content: { required },
  },
  async created() {
    console.log("non dynamic");
    this.token = this.sessionToken;
    this.timezone = timezone;
    // console.log(this.token);
    this.editorConfig = {
      simpleUpload: {
        uploadUrl: url + "/" + "api/faq/ckeditor",
        headers: {
          Accept: "application/json",
          Timezone: this.timezone,
          Authorization: "Bearer " + this.token,
        },
      },
    };

    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const response = await this.$axios.get(
        url + "/api/get-faq-category",
        config
      );

      var data = [];
      this.categorieslist = response.data;
      for (const [key, value] of Object.entries(response.data)) {
        data.push({ id: value.id, name: value.name });
      }
      console.log(data);
      this.categories = data;
    } catch (error) {}
  },
  mixins: [
    adminPage,
    // dateToFromPicker,
  ],
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
        this.$toast.success("Please wait");
        payload.append("value", this.form_title);
        payload.append("category_id", this.form_category);
        payload.append("body", this.form_content);
        payload.append("profile_id", profile_id);
        payload.append("name", name);
        payload.append("category_name", categoryname);

        this.submitted = true;
        this.$axios
          .post("/create-faq-item", payload)
          .then((res) => {
            this.submitloading = false;
            this.$toast.success("Save is done");
            this.submitted = false;
            window.location = "/a/cms/faq";
          })
          .catch((error) => {
            this.submitloading = false;
            this.submitted = false;
          })
          .finally(() => {});
      } else {
        //error
        this.submitloading = false;
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
