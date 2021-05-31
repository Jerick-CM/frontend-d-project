<template>
  <div id="cms-page">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>MENU CREATE</v-toolbar-title>

        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <div class="container--flex container--flex-align-item-center"></div>
      </v-toolbar>

      <div class="container no-padding" style="background-color: white">
        <v-container fluid>
          <div>
            <nuxt-link :to="{ name: 'a-cms-menu' }">Go Back</nuxt-link>

            <form
              class="review-form"
              name="createfaq"
              @submit.prevent="onSubmit"
            >
              <div>Create Menu page</div>
              <div>
                <v-text-field
                  v-model="form_name"
                  label="Menu Name"
                  @blur="$v.form_name.$touch()"
                ></v-text-field>

                <template v-if="$v.form_name.$error">
                  <p v-if="!$v.form_name.required" class="errorMessage">
                    Menu Name is required.
                  </p>
                </template>
              </div>
              <div>
                <v-text-field
                  v-model="form_title"
                  label="Title"
                  @blur="$v.form_title.$touch()"
                ></v-text-field>
                <template v-if="$v.form_title.$error">
                  <p v-if="!$v.form_title.required" class="errorMessage">
                    Title is required.
                  </p>
                </template>
              </div>

              <!-- <v-app> -->
              <div>
                <v-select
                  v-model="form_publish"
                  :items="publishselection"
                  item-value="value"
                  item-text="text"
                  label="Publish"
                  @blur="$v.form_publish.$touch()"
                />
                <template v-if="$v.form_publish.$error">
                  <p v-if="!$v.form_publish.required" class="errorMessage">
                    Select Publish is required.
                  </p>
                </template>
              </div>
              <div>
                <v-text-field v-model="form_slug" label="Slug"></v-text-field>
              </div>

              <div>
                <div>
                  <label>
                    <strong>Main Icon:</strong>
                  </label>
                  <br />
                  <label>Default Icon:</label>

                  <img class="image-preview" :src="icon_default" />
                </div>
                <br />
                <div>Icon:</div>
                <div>
                  <img
                    class="image-preview"
                    v-if="url_preview"
                    :src="url_preview"
                  />
                </div>

                <br />
                <input
                  type="file"
                  id="file"
                  ref="file"
                  v-on:change="handleFileUpload()"
                />
              </div>

              <br />

              <div>
                <label
                  v-if="this.icon_text != ''"
                  onclick="return false"
                  v-on:click="removeicon()"
                  class="red-font"
                  >Remove</label
                >
              </div>

              <div>
                <div>
                  <label>
                    <strong>Hover Icon:</strong>
                  </label>
                  <br />
                  <label>Default Icon:</label>
                  <img class="image-preview" :src="icon_default_hover" />
                </div>
                <br />
                <div>Icon:</div>
                <div>
                  <img
                    class="image-preview"
                    v-if="url_preview_hover"
                    :src="url_preview_hover"
                  />
                </div>

                <br />
                <input
                  type="file"
                  id="file_icon"
                  ref="file_iconhover"
                  v-on:change="handleFileUpload_hover()"
                />
              </div>
              <br />

              <div>
                <label
                  v-if="this.icon_text_hover != ''"
                  onclick="return false"
                  v-on:click="removeicon_hover()"
                  class="red-font"
                  >Remove</label
                >
              </div>
              <div class="form-group">
                <br />
                <label for>Content</label>

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
                class="ml-0"
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
    generate: {
      fallback: true, // if you want to use '404.html' instead of the default '200.html'
    },
    validate({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id);
    },
    url: null,

    icon: "img/menu/article-black-24dp.svg",
    icon_hover: "img/menu/article-white-24dp.svg",
    icon_text: "",
    icon_text_hover: "",
    url_preview: "",
    url_preview_hover: "",
    form_slug: "",
    content: "",
    submitted: false,
    categories: [],
    dbSelect: null,
    form_title: null,
    form_name: null,
    form_publish: null,
    form_content: null,
    errors: [],
    publish: {
      value: 1,
      name: "Draft",
    },
    publishselection: [
      {
        value: 1,
        text: "Draft",
      },
      {
        value: 2,
        text: "Publish",
      },
    ],
  }),
  validations: {
    form_name: { required },
    form_title: { required },
    form_publish: { required },
    form_content: { required },
    icon: { required },
  },
  async created() {
    this.token = this.sessionToken;
    this.timezone = timezone;
    this.editorConfig = {
      simpleUpload: {
        uploadUrl: url + "/" + "api/menu/ckeditor",
        headers: {
          Accept: "application/json",
          Timezone: this.timezone,
          Authorization: "Bearer " + this.token,
        },
      },
    };
    this.url = url;
    this.icon_default = url + "/img/menu/article-black-24dp.svg";
    this.icon_default_hover = url + "/img/menu/article-white-24dp.svg";
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
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
    firetable() {
      // this.table.insertTable(2, 2);
    },
    removeicon() {
      this.icon_default = url + "/public/img/menu/article-black-24dp.svg";
      this.$refs.file.value = null;
      this.icon_text = "";
      this.icon = "";
      this.url_preview = "";
      return false;
    },
    handleFileUpload(e) {
      this.icon_default = "";
      const file = this.$refs.file.files[0];
      this.url_preview = URL.createObjectURL(file);

      try {
        this.icon_text = this.$refs.file.files[0].name;
        this.icon = this.$refs.file.files[0];
        // this.$refs.file.value = null;
      } catch (err) {
        console.log(err);
      }
    },
    removeicon_hover() {
      this.icon_default_hover = url + "/public/img/menu/article-black-24dp.svg";
      this.$refs.file_iconhover.value = null;
      this.icon_text_hover = "";
      this.icon_hover = "";
      this.url_preview_hover = "";
      return false;
    },
    handleFileUpload_hover(e) {
      this.icon_default_hover = "";
      const file = this.$refs.file_iconhover.files[0];
      this.url_preview_hover = URL.createObjectURL(file);

      try {
        this.icon_text_hover = this.$refs.file_iconhover.files[0].name;
        this.icon_hover = this.$refs.file_iconhover.files[0];
        this.$refs.file_iconhover.value = null;
      } catch (err) {
        console.log(err);
      }
    },
    onSubmit() {
      if (
        this.form_name &&
        this.form_title &&
        this.form_publish &&
        this.form_content
        // &&
        // this.icon
      ) {
        //success
        this.submitloading = true;
        var profile_id = this.profile.id;
        var name = this.profile.name;
        let payload = new FormData();
        this.$toast.success("Please wait");

        var publish = this.form_publish == 2 ? 1 : 0;
        payload.append("slug", this.form_slug);
        payload.append("title", this.form_title);
        payload.append("name", this.form_name);
        payload.append("publish", publish);
        payload.append("content", this.form_content);
        payload.append("icon", this.icon);
        payload.append("icon_hover", this.icon_hover);
        payload.append("profile_id", profile_id);
        payload.append("profile_name", name);

        this.submitted = true;
        this.$axios
          .post("/create-page-item", payload, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.submitloading = false;

            if (res.data.error) {
              this.$toast.success(res.data.error["message"]);
              this.submitted = false;
            }
            if (res.data.success) {
              this.$toast.success("Save is done");
              this.submitted = false;
              window.location = "/a/cms/menu";
            }
          })
          .catch((error) => {
            this.submitloading = false;
            console.dir(error);
            if (error.message) {
              this.$toast.error(error.message);
            }

            this.submitted = false;
          })
          .finally(() => {});
      } else {
        this.errors.length = 0;

        if (!this.form_name) {
          this.$toast.error("Menu name is required");
        }
        if (!this.form_title) {
          this.$toast.error("Title is required");
        }
        if (!this.form_publish) {
          this.$toast.error("Please select Publish");
        }
        if (!this.form_content) {
          this.$toast.error("Content body is required");
        }
      }
    },
  },
};
</script>
<style lang="css" scoped>
#bubble-container,
#snow-container {
  height: 300px;
  margin-bottom: 10px;
}

.red-font {
  color: red;
}
.ml-0 {
  margin-left: 0 !important;
}
.white-font {
  color: white;
}

.errorMessage {
  color: red;
}
select.selecticons {
  font-family: "FontAwesome", "sans-serif";
}
.image-preview {
  background-image: linear-gradient(
      to right,
      rgba(192, 192, 192, 0.75),
      rgba(192, 192, 192, 0.75)
    ),
    /* checkered effect */ linear-gradient(to right, black 50%, white 50%),
    linear-gradient(to bottom, black 50%, white 50%);
  background-blend-mode: normal, difference, normal;
  padding: 2px;
  /* background-size: 2em 2em; */
}
</style>
<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
