
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
            <br />
            <form class="review-form" name="editfaq" @submit.prevent="onSubmit">
              <br />
              <v-layout row wrap>
                <v-flex xs12>
                  <ckeditor-nuxt
                    v-model="form_locationdate"
                    :config="editorConfig"
                  />
                </v-flex>
              </v-layout>

              <br />

                <v-layout row>
                <v-flex xs12>
                  <div v-if="this.image1previewstore != ''">
                    <v-img
                      class="image-preview"
                      v-bind:src="this.url + '/' + this.image1previewstore"
                    >
                    </v-img>
                  </div>
                  <div v-else>
                    <div v-if="this.image1preview != ''">
                      image :
                      <v-img class="image-preview" :src="image1preview">
                      </v-img>
                    </div>
                  </div>
                  <br />
                  <label>Top Header</label>

                  <div class="form-group">
                    <input
                      type="file"
                      ref="image1"
                      v-on:change="handleFileUpload_image1()"
                    />
                  </div>

                  <div>
                    <label
                      onclick="return false"
                      v-on:click="removeheader1()"
                      class="red-font"
                      >Remove</label
                    >
                  </div>
                </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href1"
                    label="image link 1"
                    ></v-textarea>
                    </v-flex>
                </v-layout> 

                <br />

                <v-layout row class="">
                  <v-flex xs12>
                     
                    <div v-if="this.image2previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image2previewstore"
                      />
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image2preview != ''">
                        image :
                         <v-img class="image-preview" :src="image2preview" /> </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header 2</label>
                    <div class="form-group">
                      <input
                        type="file"
                        ref="image2"
                        v-on:change="handleFileUpload_image2()"
                      />
                    </div>
                      <div >
                      <label                       
                        onclick="return false"
                        v-on:click="removeheader2()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href2"
                    label="image link 2"
                    ></v-textarea>
                    </v-flex>
                </v-layout> 

                <v-layout row>
                  <v-flex xs12>
                    <div class="form-group">
                      <v-textarea
                        rows="1"
                        v-model="form_label"
                        label="E-mail Title:"
                        @blur="$v.form_label.$touch()"
                      ></v-textarea>
                    </div>
                    <template v-if="$v.form_label.$error">
                      <p v-if="!$v.form_label.required" class="errorMessage">
                        Title is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>

                <div class="form-group d-none">
                <v-textarea
                  rows="1"
                  v-model="form_title"
                  label="EDM Title:"
                  @blur="$v.form_title.$touch()"
                ></v-textarea>
                </div>

                <template v-if="$v.form_title.$error">
                <p v-if="!$v.form_title.required" class="errorMessage">
                  Title is required.
                </p>
                </template>

                <v-layout row>
                  <v-flex xs12>
                    <v-textarea
                      rows="1"
                      v-model="form_subject"
                      label="E-mail Subject:"
                      @blur="$v.form_subject.$touch()"
                    ></v-textarea>
                   </v-flex>
                </v-layout>

              <template v-if="$v.form_subject.$error">
                <p v-if="!$v.form_subject.required" class="errorMessage">
                  E-mail subject is required.
                </p>
              </template>

              <v-layout row>
                <v-flex xs12>
                <client-only placeholder="loading...">
                  <ckeditor-nuxt
                    v-model="form_content"
                    :config="editorConfig"
                    @blur="$v.form_content.$touch()"
                  />
                </client-only>
                </v-flex>
              </v-layout>

              <template v-if="$v.form_content.$error">
                <p v-if="!$v.form_content.required" class="errorMessage">
                  Content is required.
                </p>
              </template>

              <v-btn
                
                color="blue"
                :disable="$v.$invalid"
                :disabled="submitted"
                  v-on:click="onSubmit()"
              >
                <!-- <input type="submit" value="Submit" /> -->
                <label class="white-font">Submit</label> 
              </v-btn>

              <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <template v-slot:activator="{ on }">
                      <v-btn  dark v-on="on"  color="success" v-on:click="loadpreview()">
                          <label class="white-font">Preview</label>
                      </v-btn>
                    </template>

                    <v-card>
                      <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                          <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Preview</v-toolbar-title>
                        <v-spacer></v-spacer>
                      
                      </v-toolbar>
                      <v-container fluid>
                          <v-layout row>
                          <v-flex xs12>
                          <div v-html="previewTemplate"></div>
                          </v-flex>
                          </v-layout>
                      </v-container>
                    </v-card>
              </v-dialog>


            </form>
            


          </div>
          <br/>
          <v-layout row>
            <v-combobox
              v-model="emails"
              :items="items"
              :disabled="comboBoxDisabled"
              item-text="name"
              item-value="email"
              multiple
              chips
              deletable-chips
              label="Select emails to send"
            ></v-combobox>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="*/*"
              @change="onFilePicked"
            />
          </v-layout>

           <v-layout row >
              <v-btn color="primary" @click="onPickFile">Select file</v-btn>
              <v-chip v-model="comboBoxDisabled" close>
                {{ filename }}
              </v-chip>
            </v-layout>
            <!-- color="success" -->
            <v-btn    
            color="success"      
              :class="{ 'disable-input': disableSendEmail }"
              :disabled="disableSendEmail"   
              
              v-on:click="fireSendEmail()"
              v-bind:loading="submitted"           
            >
              <label class="white-font" >Send Email</label>
            </v-btn>
            <div style="white-space: pre">{{ report }}</div>

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

  data: () => ({
    token: null,
    editorConfig: [],

    submitted: false,
    id: null,
    dbSelect: null,
    dbOptions: [],
    form_id: null,
    form_label: null,
    form_title: null,
    form_subject: null,
    form_content: "",
    form_locationdate: "Singapore | {{date}}",
    errors: [],

    image1previewstore: "img/edm/main-banner.jpg",
    image2previewstore: "img/edm/welcome_banner_default.jpg",
    image1preview: "",
    image2preview: "",
    image1: "img/edm/main-banner.jpg",
    image2: "img/edm/welcome_banner_default.jpg",
    href1: "https://www.deloitte.com/",
    href2: "https://www.deloitte.com/",
    dialog: false,
    edmID: 10,
    previewTemplate: "",
    emails: "",
    comboBoxDisabled: false,
    filename: "",
    items: [""],
    disableSendEmail: true,
  }),
  validations: {
    form_label: { required },
    form_title: { required },
    form_subject: { required },
    form_content: { required },
  },
  async mounted() {
    const { data } = await this.$axios.get("/users", {
      params: {
        page: 1,
        paginate: 0,
        sort: "name:asc",
        blast: 1,
      },
    });
    this.items = data;
    console.log(data);
  },
  async created() {
    this.url = url;
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

    const config = {
      headers: {
        Accept: "application/json",
      },
    };
  },
  mixins: [adminPage],
  computed: {
    ...mapGetters({
      profile: "session/GET_PROFILE",
      sessionToken: "session/GET_TOKEN",
    }),
  },
  methods: {
    fireSendEmail() {
      var fileSelected = this.comboBoxDisabled;
      var file = null;
      var emails = [];
      var formData = new FormData();
      this.submitted = true;
      if (fileSelected) {
        file = this.$refs.fileInput.files[0];
        formData.append("emailFile", file);
      } else {
        this.emails.forEach(function (item, index) {
          emails.push(item.email);
        });
        formData.append("emails", emails);
      }
      this.$axios
        .post("/admin/edm/send_blast/" + this.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          this.submitted = false;
          this.$toast.success("Send sent success fully.");
        })
        .catch((error) => {
          this.$toast.error("Email sending error.");
          this.submitted = false;
        })
        .finally(() => {});
    },
    onPickFile() {
      this.$refs.fileInput.value = null;
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      if (files[0] !== undefined) {
        this.filename = files[0].name;
        // this.comboBoxDisabled = true;
        this.filenameSelected = true;
        Papa.parse(files[0], {
          complete: this.applyCsv,
        });
      } else {
        this.comboBoxDisabled = false;
        this.fileName = "";
        this.filenameSelected = false;
      }
    },
    async applyCsv(results, file) {
      var emails = this.emails;
      var uniqueEmails = [];
      var duplicateEmails = [];
      var missingEmails = [];
      if (!emails) {
        emails = [];
      }
      for (var i = results.data.length - 1; i >= 0; i--) {
        if (results.data[i][0]) {
          const found = this.items.find(
            (element) => element.email == results.data[i][0]
          );
          if (found) {
            if (
              !emails.length ||
              !emails.find((element) => element.email == results.data[i][0])
            ) {
              emails.push(found);
              uniqueEmails.push(results.data[i][0]);
            } else {
              duplicateEmails.push(results.data[i][0]);
            }
          } else {
            missingEmails.push(results.data[i][0]);
          }
        }
      }

      this.report =
        `Unique emails: (` +
        uniqueEmails.length +
        `)` +
        uniqueEmails.join(", ") +
        `\n` +
        `Duplicate emails: ` +
        ` (` +
        duplicateEmails.length +
        `)` +
        duplicateEmails.join(", ") +
        `\n` +
        `Email with no user: ` +
        ` (` +
        missingEmails.length +
        `) ` +
        missingEmails.join(", ") +
        `\n`;
      this.emails = emails;
    },
    loadpreview() {
      let payload = new FormData();
      payload.append("content", this.form_content);
      payload.append("editpreview", true);
      this.$axios
        .post(`/admin/edm/` + this.edmID, payload)
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
    },
    handleFileUpload_image1(e) {
      try {
        const file = this.$refs.image1.files[0];
        this.image1preview = URL.createObjectURL(file);
        this.image1 = this.$refs.image1.files[0];
        this.image1previewstore = "";
      } catch (err) {
        console.log(err);
      }
    },
    handleFileUpload_image2(e) {
      try {
        const file = this.$refs.image2.files[0];

        this.image2preview = URL.createObjectURL(file);

        this.image2 = this.$refs.image2.files[0];
        this.image2previewstore = "";
      } catch (err) {
        console.log(err);
      }
    },
    removeheader1() {
      this.$refs.image1.value = null;
      this.image1previewstore = "";
      this.image1 = "";
      this.image1preview = "";
    },
    removeheader2() {
      this.$refs.image2.value = null;
      this.image2previewstore = "";
      this.image2 = "";
      this.image2preview = "";
    },
    onSubmit() {
      if (
        this.form_label &&
        // this.form_title &&
        this.form_subject &&
        this.form_content
      ) {
        var profile_id = this.profile.id;
        var name = this.profile.name;
        let payload = new FormData();
        this.$toast.success("Please wait");

        this.form_content = juice.inlineContent(
          this.form_content,
          ckeditor5const.styles
        );

        // this.form_locationdate = juice.inlineContent(
        //   this.form_locationdate,
        //   ckeditor5const.styles
        // );

        payload.append("profile_id", profile_id);
        payload.append("name", name);

        payload.append("label", this.form_label);
        // payload.append("title", this.form_title);
        payload.append("subject", this.form_subject);
        payload.append("content", this.form_content);

        payload.append("href1", this.href1);
        payload.append("href2", this.href2);
        payload.append("header1", this.image1);
        payload.append("header2", this.image2);
        payload.append("locationdate", this.form_locationdate);

        this.$axios
          .post("/api/create-edm-templatebody", payload)
          .then((res) => {
            this.$toast.success("Save is done");
            this.submitted = false;
            this.id = res.data["data"]["id"];
            if (this.id) {
              this.disableSendEmail = false;
            }

            // window.location = "/a/edm-management/templatebody";
          })
          .catch((error) => {
            this.submitted = false;
          })
          .finally(() => {});
      } else {
        this.errors.length = 0;

        if (!this.form_label) {
          this.$toast.error("Title is required.");
        }
        if (!this.form_title) {
          this.$toast.error("Subject is required.");
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
.white-font {
  color: white;
}
.red-font {
  color: red;
}
table.preview {
  border: 1px solid black;
}
</style>

<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
