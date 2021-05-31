
<template>
  <div id="edm-footer">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>EDM Footer</v-toolbar-title>

        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <div class="container--flex container--flex-align-item-center"></div>
      </v-toolbar>

      <div class="container no-padding" style="background-color: white">
        <v-container fluid>
          <div>
            <!-- <nuxt-link
              :to="{
                path: '/a/edm-management/footer',
              }"
              >Go Back</nuxt-link
            > -->
            <form class="review-form" name="editfaq" @submit.prevent="onSubmit">
              <div class="faq col-md-12">
                <!-- <div>Edit Edm Footer</div> -->
              </div>
              <!-- <div class="form-group">
                <v-textarea
                  rows="1"
                  v-model="footerlabel1"
                  label="Label 1"
                ></v-textarea>
              </div>

              <div class="form-group">
                <v-textarea
                  rows="1"
                  v-model="footerlabel2"
                  label="Label 2"
                ></v-textarea>
              </div>

              <div class="form-group">
                <v-textarea v-model="footerlabel3" label="Label 3"></v-textarea>
              </div>

              <div class="form-group">
                <v-textarea
                  rows="1"
                  v-model="footerlabel4"
                  label="Label 4"
                ></v-textarea>
              </div>

              <div class="form-group">
                <v-textarea
                  rows="1"
                  v-model="footerlabel5"
                  label="Label 5"
                ></v-textarea>
              </div>

              <div class="form-group">
                <v-textarea v-model="footerlabel6" label="Label 6"></v-textarea>
              </div>

              <div class="form-group">
                <v-textarea
                  rows="1"
                  v-model="footerlabel7"
                  label="Label 7"
                ></v-textarea>
              </div> -->

              <div class="form-group">
                <client-only placeholder="loading...">
                  <ckeditor-nuxt
                    v-model="form_content"
                    @blur="$v.form_content.$touch()"
                    :config="editorConfig"
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
              >
                <input type="submit" value="Submit" />
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
  validations: {
    form_content: { required },
  },
  data: () => ({
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

    footerlabel1: null,
    footerlabel2: null,
    footerlabel3: null,
    footerlabel4: null,
    footerlabel5: null,

    footerlabel6: null,
    footerlabel7: null,
  }),
  async created() {
    this.token = this.sessionToken;
    this.timezone = timezone;
    this.editorConfig = {
      simpleUpload: {
        uploadUrl: url + "/" + "api/edm-header/ckeditor",
        headers: {
          Accept: "application/json",
          Timezone: this.timezone,
          Authorization: "Bearer " + this.token,
        },
      },
    };
    // this.id = this.$route.query.edit;
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    try {
      const response = await this.$axios.get("/api/search-edmfooter", {
        headers: {
          Accept: "application/json",
        },
        params: {
          id: 1, //this.$route.query.edit
        },
      });

      this.form_content = response.data[0]["content"];
      this.footerlabel1 = response.data[0]["footerlabel1"];
      this.footerlabel2 = response.data[0]["footerlabel2"];
      this.footerlabel3 = response.data[0]["footerlabel3"];
      this.footerlabel4 = response.data[0]["footerlabel4"];
      this.footerlabel5 = response.data[0]["footerlabel5"];

      this.footerlabel6 = response.data[0]["footerlabel6"];
      this.footerlabel7 = response.data[0]["footerlabel7"];
    } catch (error) {}
  },
  mixins: [adminPage],
  computed: {
    ...mapGetters({
      profile: "session/GET_PROFILE",
      sessionToken: "session/GET_TOKEN",
    }),
  },
  methods: {
    save() {
      console.log(this.editorData);
    },
    onSubmit() {
      // if (this.form_content) {
      //success

      this.form_content = juice.inlineContent(
        this.form_content,
        ckeditor5const.styles
      );

      var profile_id = this.profile.id;
      var name = this.profile.name;
      let payload = new FormData();

      payload.append("content", this.form_content);

      payload.append("footerlabel1", this.footerlabel1);
      payload.append("footerlabel2", this.footerlabel2);
      payload.append("footerlabel3", this.footerlabel3);
      payload.append("footerlabel4", this.footerlabel4);
      payload.append("footerlabel5", this.footerlabel5);

      payload.append("footerlabel6", this.footerlabel6);
      payload.append("footerlabel7", this.footerlabel7);

      payload.append("id", 1);
      payload.append("profile_id", profile_id);
      payload.append("name", name);

      this.submitted = true;

      this.$axios
        .post("/api/update-edm-footer", payload)
        .then((res) => {
          this.submitted = false;
          this.$toast.success("Save is done");
        })
        .catch((error) => {
          this.submitted = false;
        })
        .finally(() => {});
      // } else {
      //   //error
      //   this.errors.length = 0;

      //   if (!this.form_content) {
      //     this.$toast.success("Content body is required.");
      //   }
      // }
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
