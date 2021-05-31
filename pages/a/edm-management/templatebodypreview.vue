
<template>
  <div id="edm-header">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>EDM Template message body</v-toolbar-title>

        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <div class="container--flex container--flex-align-item-center"></div>
      </v-toolbar>

      <div class="container no-padding" style="background-color: white">
        <v-container fluid>
          <div>
            <nuxt-link
              :to="{
                path: '/a/edm-management/templatebody',
              }"
              >Go Back</nuxt-link
            >
            <div v-html="previewTemplate"></div>
            <form
              v-if="setformhidden == true"
              class="review-form d-none"
              name="editfaq"
              @submit.prevent="onSubmit"
            >
              <div class="faq col-md-12">
                <div>
                  <strong>{{ this.form_label }}</strong>
                </div>
              </div>
              <div class="faq col-md-12">
                <div><h2>HEADER</h2></div>
              </div>
              <div v-if="this.image1 != ''">
                <img
                  class="image-preview"
                  v-bind:src="this.url + '/' + this.image1"
                />
              </div>
              <div class="form-group">
                <v-textarea
                  rows="1"
                  v-model="label3"
                  label="Date"
                  readonly
                ></v-textarea>
              </div>

              <div v-if="this.image2 != ''">
                <img
                  class="image-preview"
                  v-bind:src="this.url + '/' + this.image2"
                />
              </div>
              <!-- review banner per edm -->
              <div v-if="id == 1">
                <!-- send -->
                <div v-if="this.image8 != ''">
                  <img
                    class="image-preview"
                    v-bind:src="this.url + '/' + this.image8"
                  />
                </div>
              </div>
              <div v-if="id == 2">
                <!-- receive -->
                <div v-if="this.image6 != ''">
                  <img
                    class="image-preview"
                    v-bind:src="this.url + '/' + this.image6"
                  />
                </div>
              </div>
              <div v-if="id == 3">
                <!-- send token -->
                <div v-if="this.image9 != ''">
                  <img
                    class="image-preview"
                    v-bind:src="this.url + '/' + this.image9"
                  />
                </div>
              </div>
              <div v-if="id == 4">
                <!-- receive token -->
                <div v-if="this.image7 != ''">
                  <img
                    class="image-preview"
                    v-bind:src="this.url + '/' + this.image7"
                  />
                </div>
              </div>

              <div v-if="id == 5">
                <!-- welcome -->
                <div v-if="this.image4 != ''">
                  <img
                    class="image-preview"
                    v-bind:src="this.url + '/' + this.image4"
                  />
                </div>
              </div>
              <div v-if="id == 6">
                <!-- monthly-->
                <div v-if="this.image3 != ''">
                  <img
                    class="image-preview"
                    v-bind:src="this.url + '/' + this.image3"
                  />
                </div>
              </div>
              <div v-if="id == 7">
                <!-- redeem -->
                <div v-if="this.image5 != ''">
                  <img
                    class="image-preview"
                    v-bind:src="this.url + '/' + this.image5"
                  />
                </div>
              </div>
              <div v-if="id == 8">
                <!-- tier promotion -->
                <div v-if="this.image6 != ''">
                  <img
                    class="image-preview"
                    v-bind:src="this.url + '/' + this.image6"
                  />
                </div>
              </div>
              <br />

              <div class="faq col-md-12">
                <div><h2>BODY</h2></div>
              </div>
              <div v-if="id == 1">
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder1"
                    label="placeholder 1"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    v-model="placeholder2"
                    label="placeholder 2"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder3"
                    label="placeholder 3"
                    readonly
                  ></v-textarea>
                </div>
              </div>
              <div v-if="id == 2">
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder1"
                    label="placeholder 1"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    v-model="placeholder2"
                    label="placeholder 2"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder3"
                    label="placeholder 3"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder4"
                    label="placeholder 4"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder5"
                    label="placeholder 5"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder6"
                    label="placeholder 6"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder7"
                    label="placeholder 7"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder8"
                    label="placeholder 8"
                    readonly
                  ></v-textarea>
                </div>
              </div>
              <div v-if="id == 3">
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder1"
                    label="placeholder 1"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    v-model="placeholder2"
                    label="placeholder 2"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder3"
                    label="placeholder 3"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder4"
                    label="placeholder 4"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder5"
                    label="placeholder 5"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder6"
                    label="placeholder 6"
                    readonly
                  ></v-textarea>
                </div>
              </div>
              <div v-if="id == 4">
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder1"
                    label="placeholder 1"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    v-model="placeholder2"
                    label="placeholder 2"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder3"
                    label="placeholder 3"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder4"
                    label="placeholder 4"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder5"
                    label="placeholder 5"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder6"
                    label="placeholder 6"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder7"
                    label="placeholder 7"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder8"
                    label="placeholder 8"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder9"
                    label="placeholder 9"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder10"
                    label="placeholder 10"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder11"
                    label="placeholder 11"
                    readonly
                  ></v-textarea>
                </div>
              </div>
              <div v-if="id == 5">
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder1"
                    label="placeholder 1"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    v-model="placeholder2"
                    label="placeholder 2"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    v-model="placeholder3"
                    label="placeholder 3"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder4"
                    label="placeholder 4"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    v-model="placeholder5"
                    label="placeholder 5"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder6"
                    label="placeholder 6"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder7"
                    label="placeholder 7"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder8"
                    label="placeholder 8"
                  ></v-textarea>
                </div>
              </div>
              <div v-if="id == 6">
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder1"
                    label="placeholder 1"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder2"
                    label="placeholder 2"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder3"
                    label="placeholder 3"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder4"
                    label="placeholder 4"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder5"
                    label="placeholder 5"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder6"
                    label="placeholder 6"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder7"
                    label="placeholder 7"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder8"
                    label="placeholder 8"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder9"
                    label="placeholder 9"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder10"
                    label="placeholder 10"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder11"
                    label="placeholder 11"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder12"
                    label="placeholder 12"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder13"
                    label="placeholder 13"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder14"
                    label="placeholder 14"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder15"
                    label="placeholder 15"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder16"
                    label="placeholder 16"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder17"
                    label="placeholder 17"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    v-model="placeholder18"
                    label="placeholder 18"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder19"
                    label="placeholder 19"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder20"
                    label="placeholder 20"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder21"
                    label="placeholder 21"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder22"
                    label="placeholder 22"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder23"
                    label="placeholder 23"
                    readonly
                  ></v-textarea>
                </div>
              </div>
              <div v-if="id == 7">
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder1"
                    label="placeholder 1"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder2"
                    label="placeholder 2"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder3"
                    label="placeholder 3"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder4"
                    label="placeholder 4"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder5"
                    label="placeholder 5"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder6"
                    label="placeholder 6"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder7"
                    label="placeholder 7"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder8"
                    label="placeholder 8"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder9"
                    label="placeholder 9"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder10"
                    label="placeholder 10"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder11"
                    label="placeholder 11"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder12"
                    label="placeholder 12"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder13"
                    label="placeholder 13"
                    readonly
                  ></v-textarea>
                </div>

                <div class="form-group">
                  <v-textarea
                    v-model="placeholder14"
                    label="placeholder 14"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder15"
                    label="placeholder 15"
                    readonly
                  ></v-textarea>
                </div>
              </div>
              <div v-if="id == 8">
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder1"
                    label="placeholder 1"
                    readonly
                  ></v-textarea>
                </div>
                <div class="form-group">
                  <v-textarea
                    rows="1"
                    v-model="placeholder2"
                    label="placeholder 2"
                    readonly
                  ></v-textarea>
                </div>
              </div>

              <div class="faq col-md-12">
                <div><h2>FOOTER</h2></div>
              </div>
              <div class="form-group">
                <v-textarea
                  rows="1"
                  v-model="footerlabel1"
                  label="Label 1"
                  readonly
                ></v-textarea>
              </div>

              <div class="form-group">
                <v-textarea
                  rows="1"
                  v-model="footerlabel2"
                  label="Label 2"
                  readonly
                ></v-textarea>
              </div>

              <div class="form-group">
                <v-textarea
                  v-model="footerlabel3"
                  label="Label 3"
                  readonly
                ></v-textarea>
              </div>

              <div class="form-group">
                <v-textarea
                  rows="1"
                  v-model="footerlabel4"
                  label="Label 4"
                  readonly
                ></v-textarea>
              </div>

              <div class="form-group">
                <v-textarea
                  rows="1"
                  v-model="footerlabel5"
                  label="Label 5"
                  readonly
                ></v-textarea>
              </div>

              <div class="form-group">
                <v-textarea
                  v-model="footerlabel6"
                  label="Label 6"
                  readonly
                ></v-textarea>
              </div>

              <div class="form-group">
                <v-textarea
                  rows="1"
                  v-model="footerlabel7"
                  label="Label 7"
                  readonly
                ></v-textarea>
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
    form_content: { required },
  },
  data: () => ({
    setformhidden: true,
    token: null,
    editorConfig: [],

    submitted: false,
    id: null,
    categories: [],
    categorieslist: [],
    dbSelect: null,
    dbOptions: [],
    form_id: null,
    form_label: null,
    form_content: null,
    errors: [],
    title: null,

    preheadertext1: null,
    preheadertext2: null,
    preheadertext3: null,
    preheadertext4: null,
    preheadertext5: null,
    preheadertext6: null,
    preheadertext7: null,

    label1: null,
    label2: null,
    label3: null,
    label4: null,

    image1: null,
    image2: null,
    image3: null,

    image4: null,
    image5: null,
    image6: null,

    image7: null,
    image8: null,
    image9: null,

    errors: [],
    image1preview: "",
    image2preview: "",
    image3preview: "",

    image4preview: "",
    image5preview: "",
    image6preview: "",

    image7preview: "",
    image8preview: "",
    image9preview: "",

    image1previewstore: "",
    image2previewstore: "",
    image3previewstore: "",

    image4previewstore: "",
    image5previewstore: "",
    image6previewstore: "",

    image7previewstore: "",
    image8previewstore: "",
    image9previewstore: "",
    footerlabel1: null,
    footerlabel2: null,
    footerlabel3: null,
    footerlabel4: null,
    footerlabel5: null,

    footerlabel6: null,
    footerlabel7: null,
    previewTemplate: "",
  }),
  async created() {
    this.url = url;
    this.token = this.sessionToken;
    this.timezone = timezone;
    this.token = this.sessionToken;
    this.timezone = timezone;
    this.id = this.$route.query.edit;
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
    // this.editorConfig = {};
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    // this.edmID = 1;
    console.log(this.$route.query.edit);
    switch (parseInt(this.$route.query.edit)) {
      case 1:
        this.edmID = 1;
        //1 MESSAGE SEND
        break;
      case 2:
        //2 MESSAGE RECEIVED
        this.edmID = 2;
        break;
      case 3:
        // 6 MESSAGE SEND TOKEN
        // this.edmID = 6;
        this.edmID = 6;
        break;
      case 4:
        // 5 MESSAGE RECEIVE TOKEN
        // this.edmID = 5;
        this.edmID = 5;
        break;
      case 5:
        // 4 WELCOME
        this.edmID = 4;
        break;
      case 6:
        this.edmID = 7;
        // 7 MONTHLY SUMMARY
        break;
      case 7:
        this.edmID = 3;
        //3 REDEMPTION

        break;
      case 8:
        this.edmID = 8;
        //8 TIER
        break;
      default:
        this.edmID = this.id;
        break;
    }

    this.$axios
      .post(`/admin/edm/` + this.edmID)
      .then((res) => {
        // this.previewTemplate = res.data;
        this.previewTemplate = res.data;
      })
      .catch((err) => {
        this.$toast.error(err.response.message);
      })
      .finally(() => {
        this.isFetching = false;
      });

    try {
      const response = await this.$axios.get("/api/search-edmheader", {
        headers: {
          Accept: "application/json",
        },
        params: {
          id: 1,
        },
      });

      this.title = response.data[0]["title"];

      this.label1 = response.data[0]["label1"];
      this.label2 = response.data[0]["label2"];
      this.label3 = response.data[0]["label3"];
      this.label4 = response.data[0]["label4"];

      this.image1 = response.data[0]["image1"];
      this.image2 = response.data[0]["image2"];
      this.image3 = response.data[0]["image3"];

      this.image4 = response.data[0]["image4"];
      this.image5 = response.data[0]["image5"];
      this.image6 = response.data[0]["image6"];

      this.image7 = response.data[0]["image7"];
      this.image8 = response.data[0]["image8"];
      this.image9 = response.data[0]["image9"];

      this.image2previewstore = response.data[0]["image2"];
      console.log(image2previewstore);
      this.image1previewstore = response.data[0]["image1"];
      console.log(image1previewstore);

      this.image3previewstore = response.data[0]["image3"];

      this.image4previewstore = response.data[0]["image4"];
      this.image5previewstore = response.data[0]["image5"];
      this.image6previewstore = response.data[0]["image6"];

      this.image7previewstore = response.data[0]["image7"];
      this.image8previewstore = response.data[0]["image8"];
      this.image9previewstore = response.data[0]["image9"];
    } catch (error) {}
    try {
      const response = await this.$axios.get("/api/search-edm-templatebody", {
        headers: {
          Accept: "application/json",
        },
        params: {
          id: this.$route.query.edit,
        },
      });
      console.log(response);
      this.form_content = response.data[0]["content"];
      this.form_label = response.data[0]["label"];
      this.form_id = response.data[0]["id"];

      this.placeholder1 = response.data[0]["placeholder1"];
      this.placeholder2 = response.data[0]["placeholder2"];
      this.placeholder3 = response.data[0]["placeholder3"];
      this.placeholder4 = response.data[0]["placeholder4"];
      this.placeholder5 = response.data[0]["placeholder5"];

      this.placeholder6 = response.data[0]["placeholder6"];
      this.placeholder7 = response.data[0]["placeholder7"];
      this.placeholder8 = response.data[0]["placeholder8"];
      this.placeholder9 = response.data[0]["placeholder9"];
      this.placeholder10 = response.data[0]["placeholder10"];

      this.placeholder11 = response.data[0]["placeholder11"];
      this.placeholder12 = response.data[0]["placeholder12"];
      this.placeholder13 = response.data[0]["placeholder13"];
      this.placeholder14 = response.data[0]["placeholder14"];
      this.placeholder15 = response.data[0]["placeholder15"];

      this.placeholder16 = response.data[0]["placeholder16"];
      this.placeholder17 = response.data[0]["placeholder17"];
      this.placeholder18 = response.data[0]["placeholder18"];
      this.placeholder19 = response.data[0]["placeholder19"];
      this.placeholder20 = response.data[0]["placeholder20"];

      this.placeholder21 = response.data[0]["placeholder21"];
      this.placeholder22 = response.data[0]["placeholder22"];
      this.placeholder23 = response.data[0]["placeholder23"];
      this.placeholder24 = response.data[0]["placeholder24"];
      this.placeholder25 = response.data[0]["placeholder25"];

      this.placeholder26 = response.data[0]["placeholder26"];
      this.placeholder27 = response.data[0]["placeholder27"];
    } catch (error) {}

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
  methods: {},
};
</script>
<style lang="css" scoped>
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
  padding: 2px;
  max-width: 1000px;
  /* background-size: 2em 2em; */
}
</style>

<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
