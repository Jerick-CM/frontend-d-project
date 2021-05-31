<template>
  <div id="cms-page">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>MENU EDIT</v-toolbar-title>

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
              <div>Edit Menu Page</div>

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
                <strong>Main Icon</strong>
                <div v-if="this.icon_default != ''">
                  <label>Default Icon:</label>

                  <img class="image-preview" :src="icon_default" />
                </div>

                <div>
                  <div v-if="this.icon_text != ''">
                    Icon :
                    <img
                      class="image-preview"
                      v-bind:src="this.url + '/' + this.icon_text"
                    />
                  </div>
                  <div v-else>
                    Icon :
                    <img
                      class="image-preview"
                      v-if="url_preview"
                      :src="url_preview"
                    />
                  </div>
                </div>
                <br />
                <div>
                  <input
                    type="file"
                    id="file"
                    ref="file"
                    v-on:change="handleFileUpload()"
                  />
                </div>
                <br />
                <div>
                  <div v-if="!this.is_defaulticon">
                    <label
                      v-if="this.url_preview != ''"
                      onclick="return false"
                      v-on:click="removeicon()"
                      class="red-font"
                      >Remove</label
                    >
                  </div>
                </div>
                <br />
                <div></div>
              </div>

              <br />

              <div>
                <strong>Hover Icon</strong>
                <div v-if="this.icon_default_hover != ''">
                  <label>Default Icon:</label>

                  <img class="image-preview" :src="icon_default_hover" />
                </div>

                <div>
                  <div v-if="this.icon_text_hover != ''">
                    Icon :
                    <img
                      class="image-preview"
                      v-bind:src="this.url + '/' + this.icon_text_hover"
                    />
                  </div>
                  <div v-else>
                    Icon :
                    <img
                      class="image-preview"
                      v-if="url_preview_hover"
                      :src="url_preview_hover"
                    />
                  </div>
                </div>
                <br />
                <div>
                  <input
                    type="file"
                    id="file"
                    ref="file_hover"
                    v-on:change="handleFileUpload_hover()"
                  />
                </div>
                <br />
                <div>
                  <div v-if="!this.is_defaulticon_hover">
                    <label
                      v-if="this.url_preview_hover != ''"
                      onclick="return false"
                      v-on:click="removeicon_hover()"
                      class="red-font"
                      >Remove</label
                    >
                  </div>
                </div>
                <br />
                <div></div>
              </div>

              <br />

              <div>
                <client-only placeholder="loading...">
                  <ckeditor-nuxt
                    :config="editorConfig"
                    v-model="form_content"
                    @blur="$v.form_content.$touch()"
                  />
                </client-only>

                <template v-if="$v.form_content.$error">
                  <p v-if="!$v.form_content.required" class="errorMessage">
                    Content is required.
                  </p>
                </template>
              </div>

              <div align="left" justify="left">
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
              </div>
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
import juice from "juice";
import ckeditor5const from "~/mixins/ckeditor5const";

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
    url: null,
    editorSettings: {
      modules: {
        imageDrop: true,
        imageResize: {},
      },
    },
    icon_default: "",
    icon_default_hover: "",
    url_preview: "",
    url_preview_hover: "",
    is_defaulticon: "",
    is_defaulticon_hover: "",
    iconselect: [
      {
        value: "home",
        text: "Home",
      },
      {
        value: "event",
        text: "Event",
      },
      {
        value: "gavel",
        text: "Gavel",
      },
      {
        value: "analytics",
        text: "Analytics",
      },
      {
        value: "call",
        text: "Call",
      },
      {
        value: "storage",
        text: "Storage",
      },
      {
        value: "push_pin",
        text: "Push Pin",
      },
      {
        value: "verified_user",
        text: "Verified",
      },
    ],
    submitted: false,
    categories: [],
    dbSelect: null,
    form_title: null,
    form_name: null,
    form_publish: 1,
    form_content: null,
    form_slug: null,
    icon: "img/menu/article-black-24dp.svg",
    icon_hover: "img/menu/article-white-24dp.svg",
    icon_text: "",
    icon_text_hover: "",
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
    this.id = this.$route.query.edit;
    this.url = url;
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.get(url + "/api/page-search", {
        headers: {
          Accept: "application/json",
        },
        params: {
          id: this.$route.query.edit,
        },
      });
      this.form_slug = response.data[0]["pageurl"];
      this.form_name = response.data[0]["name"];
      this.form_title = response.data[0]["title"];
      this.form_publish = response.data[0]["publish"];
      this.icon = response.data[0]["icon"];
      this.icon_text = response.data[0]["icon"];

      this.icon_hover = response.data[0]["icon_hover"];
      this.icon_text_hover = response.data[0]["icon_hover"];

      this.url_preview = response.data[0]["icon"];
      this.url_preview_hover = response.data[0]["icon_hover"];

      if (this.url_preview.includes("article-black-24dp")) {
        this.is_defaulticon = true;
      } else {
        this.is_defaulticon = false;
      }

      if (this.url_preview_hover.includes("article-white-24dp")) {
        this.is_defaulticon_hover = true;
      } else {
        this.is_defaulticon_hover = false;
      }

      if (response.data[0]["publish"]) {
        this.form_publish = {
          value: 2,
          text: "Publish",
        };
      } else {
        this.form_publish = {
          value: 1,
          text: "Draft",
        };
      }
      this.form_content = response.data[0]["content"];
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
    removeicon() {
      this.$refs.file.value = null;
      this.icon_text = "";
      this.icon = "";
      this.url_preview = "";
      this.icon_default = url + "/img/menu/article-black-24dp.svg";
    },
    removeicon_hover() {
      this.$refs.file_hover.value = null;
      this.icon_text_hover = "";
      this.icon_hover = "";
      this.url_preview_hover = "";
      this.icon_default_hover = url + "/img/menu/article-white-24dp.svg";
    },
    handleFileUpload(e) {
      try {
        this.icon_default = "";
        const file = this.$refs.file.files[0];

        if (this.$refs.file.files[0].name.includes("article-black-24dp")) {
          this.is_defaulticon = true;
        } else {
          this.is_defaulticon = false;
        }

        this.url_preview = URL.createObjectURL(file);
        this.icon_text = "img/menu/" + this.$refs.file.files[0].name;
        this.icon_text = "";
        this.icon = this.$refs.file.files[0];
      } catch (err) {
        console.log(err);
      }
    },
    handleFileUpload_hover(e) {
      try {
        this.icon_default_hover = "";
        const file = this.$refs.file_hover.files[0];
        console.log(file);

        if (
          this.$refs.file_hover.files[0].name.includes("article-white-24dp")
        ) {
          this.is_defaulticon_hover = true;
        } else {
          this.is_defaulticon_hover = false;
        }

        this.url_preview_hover = URL.createObjectURL(file);

        this.icon_text_hover = "img/menu/" + this.$refs.file.files[0].name;
        this.icon_text_hover = "";
        this.icon_hover = this.$refs.file_hover.files[0];
      } catch (err) {
        console.log(err);
      }
    },
    save() {
      console.log(this.editorData);
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
        this.submitloading = true;
        //success
        var profile_id = this.profile.id;
        var name = this.profile.name;
        let payload = new FormData();
        this.$toast.success("Please wait");

        var publish = this.form_publish == 2 ? 1 : 0;

        // this.form_content = juice.inlineContent(
        //   this.form_content,
        //   ckeditor5const.styles
        // );

        payload.append("slug", this.form_slug);
        payload.append("id", this.id);
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
          .post("/update-page-item", payload, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.error) {
              // this.$toast.success(res.data.error);
              console.log(res.data);
              this.$toast.success(res.data.error["message"]);
              this.submitted = false;
            }
            if (res.data.success) {
              this.$toast.success("Update is done");
              this.submitted = false;
              // window.location = "/a/cms/menu";
            }
            this.submitloading = false;
          })
          .catch((error) => {
            console.dir(error);
            if (error.message) {
              this.$toast.error(error.message);
            }

            this.submitted = false;
            this.submitloading = false;
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
.ml-0 {
  margin-left: 0 !important;
}
.white-font {
  color: white;
}
.red-font {
  color: red;
}
.ck-editor__editable {
  min-height: 500px;
}
.errorMessage {
  color: red;
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
  /* background-size: 2em 2em; */
}
</style>
<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
