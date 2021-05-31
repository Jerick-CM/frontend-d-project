
<template>
  <div id="edm-header">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>EDM Header</v-toolbar-title>

        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <div class="container--flex container--flex-align-item-center"></div>
      </v-toolbar>

      <div class="container no-padding" style="background-color: white">
        <v-container fluid>
          <div>
            <form class="review-form" name="editfaq" @submit.prevent="onSubmit">
              <div class="faq col-md-12">
                <div>Edit Edm Header</div>
              </div>
              <v-layout row class="d-none">
                <v-flex xs12>
                  <v-textarea
                    rows="1"
                    v-model="title"
                    label="Email Title"
                  ></v-textarea>
                </v-flex>
              </v-layout>

              <v-layout row class="d-none">
                <v-flex xs12>
                  <v-textarea
                    rows="1"
                    v-model="label1"
                    label="Label 1"
                  ></v-textarea>
                </v-flex>
              </v-layout>
              <v-layout row class="d-none">
                <v-flex xs12>
                  <v-textarea
                    rows="1"
                    v-model="label2"
                    label="Label 2"
                  ></v-textarea>
                </v-flex>
              </v-layout>
              <v-layout row class="d-none">
                <v-flex xs12>
                  <v-textarea
                    rows="1"
                    v-model="label3"
                    label="Label 3"
                  ></v-textarea>
                </v-flex>
              </v-layout>
              <v-layout row class="d-none">
                <v-flex xs12>
                  <div v-if="this.image1previewstore != ''">
                    <v-img
                      :aspect-ratio="16 / 9"
                      class="image-preview"
                      v-bind:src="this.url + '/' + this.image1previewstore"
                    >
                    </v-img>
                    <!-- <img /> -->
                  </div>
                  <div v-else>
                    <div v-if="this.image1preview != ''">
                      image :

                      <img class="image-preview" :src="image1preview" />
                    </div>
                  </div>

                  <label>Top Header</label>
                  <div class="form-group">
                    <input
                      type="file"
                      ref="image1"
                      v-on:change="handleFileUpload_image1()"
                    />
                  </div>
                </v-flex>
              </v-layout>
              <br />

              <v-layout row>
                <v-flex xs12>
                  <div v-if="this.image2previewstore != ''">
                    <img
                      class="image-preview"
                      v-bind:src="this.url + '/' + this.image2previewstore"
                    />
                  </div>
                  <div v-else>
                    <div v-if="this.image2preview != ''">
                      image :

                      <img class="image-preview" :src="image2preview" />
                    </div>
                  </div>
                  <label>Top Header 2</label>
                  <div class="form-group">
                    <input
                      type="file"
                      ref="image2"
                      v-on:change="handleFileUpload_image2()"
                    />
                  </div>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-textarea
                    rows="1"
                    v-model="form_link"
                    label="image link banner"
                  ></v-textarea>
                </v-flex>
              </v-layout>
              <v-layout row class="d-none">
                <v-flex xs12>
                  <div v-if="this.image3previewstore != ''">
                    <img
                      class="image-preview"
                      v-bind:src="this.url + '/' + this.image3previewstore"
                    />
                  </div>
                  <div v-else>
                    <div v-if="this.image3preview != ''">
                      image :

                      <img class="image-preview" :src="image3preview" />
                    </div>
                  </div>
                  <label>Monthly Summary Mail Banner</label>
                  <div class="form-group">
                    <input
                      type="file"
                      ref="image3"
                      v-on:change="handleFileUpload_image3()"
                    />
                  </div>
                </v-flex>
              </v-layout>

              <v-layout row class="d-none">
                <v-flex xs12>
                  <div v-if="this.image5previewstore != ''">
                    <img
                      class="image-preview"
                      v-bind:src="this.url + '/' + this.image5previewstore"
                    />
                  </div>
                  <div v-else>
                    <div v-if="this.image5preview != ''">
                      image :

                      <img class="image-preview" :src="image5preview" />
                    </div>
                  </div>
                  <label>Redemption Mail Banner</label>
                  <div class="form-group">
                    <input
                      type="file"
                      ref="image5"
                      v-on:change="handleFileUpload_image5()"
                    />
                  </div>
                </v-flex>
              </v-layout>

              <v-layout row class="d-none">
                <v-flex xs12>
                  <div v-if="this.image6previewstore != ''">
                    <img
                      class="image-preview"
                      v-bind:src="this.url + '/' + this.image6previewstore"
                    />
                  </div>
                  <div v-else>
                    <div v-if="this.image6preview != ''">
                      image :

                      <img class="image-preview" :src="image6preview" />
                    </div>
                  </div>
                  <label>Recipient Mail Banner</label>
                  <div class="form-group">
                    <input
                      type="file"
                      ref="image6"
                      v-on:change="handleFileUpload_image6()"
                    />
                  </div>
                </v-flex>
              </v-layout>

              <v-layout row class="d-none">
                <v-flex xs12>
                  <div v-if="this.image7previewstore != ''">
                    <img
                      class="image-preview"
                      v-bind:src="this.url + '/' + this.image7previewstore"
                    />
                  </div>
                  <div v-else>
                    <div v-if="this.image7preview != ''">
                      image :

                      <img class="image-preview" :src="image7preview" />
                    </div>
                  </div>
                  <label>Recipient Mail with Token Banner</label>
                  <div class="form-group">
                    <input
                      type="file"
                      ref="image7"
                      v-on:change="handleFileUpload_image7()"
                    />
                  </div>
                </v-flex>
              </v-layout>

              <v-layout row class="d-none">
                <v-flex xs12>
                  <div v-if="this.image8previewstore != ''">
                    <img
                      class="image-preview"
                      v-bind:src="this.url + '/' + this.image8previewstore"
                    />
                  </div>
                  <div v-else>
                    <div v-if="this.image8preview != ''">
                      image :

                      <img class="image-preview" :src="image8preview" />
                    </div>
                  </div>
                  <label>Sender Mail Banner</label>
                  <div class="form-group">
                    <input
                      type="file"
                      ref="image8"
                      v-on:change="handleFileUpload_image8()"
                    />
                  </div>
                </v-flex>
              </v-layout>

              <v-layout row class="d-none">
                <v-flex xs12>
                  <div v-if="this.image9previewstore != ''">
                    <img
                      class="image-preview"
                      v-bind:src="this.url + '/' + this.image9previewstore"
                    />
                  </div>
                  <div v-else>
                    <div v-if="this.image9preview != ''">
                      image :

                      <img class="image-preview" :src="image9preview" />
                    </div>
                  </div>
                  <label>Sender Mail with Token Banner</label>
                  <div class="form-group">
                    <input
                      type="file"
                      ref="image9"
                      v-on:change="handleFileUpload_image9()"
                    />
                  </div>
                </v-flex>
              </v-layout>

              <v-layout row class="d-none">
                <v-flex xs12>
                  <div v-if="this.image10previewstore != ''">
                    <img
                      class="image-preview"
                      v-bind:src="this.url + '/' + this.image10previewstore"
                    />
                  </div>
                  <div v-else>
                    <div v-if="this.image10preview != ''">
                      image :

                      <img class="image-preview" :src="image10preview" />
                    </div>
                  </div>
                  <label>Tier Promotion</label>
                  <div class="form-group">
                    <input
                      type="file"
                      ref="image10"
                      v-on:change="handleFileUpload_image10()"
                    />
                  </div>
                </v-flex>
              </v-layout>
              <br />
              <v-btn
                color="success"
                :disable="$v.$invalid"
                :disabled="submitted"
              >
                <input type="submit" value="Save" />
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
var timezone = process.env.TIMEZONE;
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
    url: null,
    token: null,
    editorConfig: [],

    submitted: false,
    id: null,
    categories: [],
    categorieslist: [],
    dbSelect: null,
    dbOptions: [],
    form_title: null,

    form_content: null,

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
    image10: null,

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
    image10preview: "",
    image1previewstore: "",
    image2previewstore: "",
    image3previewstore: "",

    image4previewstore: "",
    image5previewstore: "",
    image6previewstore: "",

    image7previewstore: "",
    image8previewstore: "",
    image9previewstore: "",
    image10previewstore: "",
    form_link: "",
  }),
  async created() {
    this.url = url;
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

    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    try {
      const response = await this.$axios.get("/api/search-edmheader", {
        headers: {
          Accept: "application/json",
        },
        params: {
          id: 1,
        },
      });

      this.form_content = response.data[0]["content"];

      this.title = response.data[0]["title"];

      this.preheadertext1 = response.data[0]["preheadertext1"];
      this.preheadertext2 = response.data[0]["preheadertext2"];
      this.preheadertext3 = response.data[0]["preheadertext3"];
      this.preheadertext4 = response.data[0]["preheadertext4"];
      this.preheadertext5 = response.data[0]["preheadertext5"];

      this.preheadertext6 = response.data[0]["preheadertext6"];
      this.preheadertext7 = response.data[0]["preheadertext7"];

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

      this.image10 = response.data[0]["image10"];
      this.image1previewstore = response.data[0]["image1"];
      this.image2previewstore = response.data[0]["image2"];
      this.image3previewstore = response.data[0]["image3"];

      this.image4previewstore = response.data[0]["image4"];
      this.image5previewstore = response.data[0]["image5"];
      this.image6previewstore = response.data[0]["image6"];

      this.image7previewstore = response.data[0]["image7"];
      this.image8previewstore = response.data[0]["image8"];
      this.image9previewstore = response.data[0]["image9"];
      this.image10previewstore = response.data[0]["image10"];
      this.form_link = response.data[0]["link"];
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
      var profile_id = this.profile.id;
      var name = this.profile.name;
      let payload = new FormData();

      payload.append("content", this.form_content);

      payload.append("title", this.title);

      payload.append("link", this.form_link);

      payload.append("preheadertext1", this.preheadertext1);
      payload.append("preheadertext2", this.preheadertext2);
      payload.append("preheadertext3", this.preheadertext3);
      payload.append("preheadertext4", this.preheadertext4);
      payload.append("preheadertext5", this.preheadertext5);

      payload.append("preheadertext6", this.preheadertext6);
      payload.append("preheadertext7", this.preheadertext7);

      payload.append("label1", this.label1);
      payload.append("label2", this.label2);
      payload.append("label3", this.label3);
      payload.append("label4", this.label4);

      payload.append("image1", this.image1);
      payload.append("image2", this.image2);

      payload.append("image3", this.image3);
      payload.append("image4", this.image4);
      payload.append("image5", this.image5);
      payload.append("image6", this.image6);
      payload.append("image7", this.image7);
      payload.append("image8", this.image8);
      payload.append("image9", this.image9);
      payload.append("image10", this.image10);
      payload.append("id", 1);
      payload.append("profile_id", profile_id);
      payload.append("name", name);

      this.submitted = true;

      this.$axios
        .post("/api/update-edm-header", payload)
        .then((res) => {
          this.submitted = false;
          this.$toast.success("Save is done");
        })
        .catch((error) => {
          this.submitted = false;
        })
        .finally(() => {});
    },
    handleFileUpload_image1(e) {
      try {
        const file = this.$refs.image1.files[0];
        console.log(file);
        console.log(URL.createObjectURL(file));
        this.image1preview = URL.createObjectURL(file);
        this.image1 = this.$refs.image1.files[0];
        this.image1previewstore = "";
        // this.image2preview =
        // "public/img/menu/" + this.$refs.image1.files[0].name;
        // this.image1preview = URL.createObjectURL(file);
      } catch (err) {
        console.log(err);
      }
    },
    handleFileUpload_image2(e) {
      try {
        const file = this.$refs.image2.files[0];
        console.log(file);
        this.image2preview = URL.createObjectURL(file);

        this.image2 = this.$refs.image2.files[0];
        this.image2previewstore = "";
        // this.image2preview = URL.createObjectURL(file);
      } catch (err) {
        console.log(err);
      }
    },
    handleFileUpload_image3(e) {
      try {
        const file = this.$refs.image3.files[0];
        console.log(file);
        this.image3preview = URL.createObjectURL(file);
        this.image3 = this.$refs.image3.files[0];
        this.image3previewstore = "";
        // this.image3preview = URL.createObjectURL(file);
      } catch (err) {
        console.log(err);
      }
    },

    handleFileUpload_image4(e) {
      try {
        const file = this.$refs.image4.files[0];
        this.image4preview = URL.createObjectURL(file);
        this.image4 = this.$refs.image4.files[0];
        this.image4previewstore = "";
      } catch (err) {
        console.log(err);
      }
    },
    handleFileUpload_image5(e) {
      try {
        const file = this.$refs.image5.files[0];

        this.image5preview = URL.createObjectURL(file);

        this.image5 = this.$refs.image5.files[0];
        this.image5previewstore = "";
      } catch (err) {
        console.log(err);
      }
    },
    handleFileUpload_image6(e) {
      try {
        const file = this.$refs.image6.files[0];
        this.image6preview = URL.createObjectURL(file);
        this.image6 = this.$refs.image6.files[0];
        this.image6previewstore = "";
      } catch (err) {
        console.log(err);
      }
    },

    handleFileUpload_image7(e) {
      try {
        const file = this.$refs.image7.files[0];

        this.image7preview = URL.createObjectURL(file);
        this.image7 = this.$refs.image7.files[0];
        this.image7previewstore = "";
      } catch (err) {
        console.log(err);
      }
    },
    handleFileUpload_image8(e) {
      try {
        const file = this.$refs.image8.files[0];
        this.image8preview = URL.createObjectURL(file);
        this.image8 = this.$refs.image8.files[0];
        this.image8previewstore = "";
      } catch (err) {
        console.log(err);
      }
    },
    handleFileUpload_image9(e) {
      try {
        const file = this.$refs.image9.files[0];
        this.image9preview = URL.createObjectURL(file);
        this.image9 = this.$refs.image9.files[0];
        this.image9previewstore = "";
      } catch (err) {
        console.log(err);
      }
    },
    handleFileUpload_image10(e) {
      try {
        const file = this.$refs.image10.files[0];
        this.image10preview = URL.createObjectURL(file);
        this.image10 = this.$refs.image10.files[0];
        this.image10previewstore = "";
      } catch (err) {
        console.log(err);
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
