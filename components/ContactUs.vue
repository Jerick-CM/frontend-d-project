<template>
<div id="contact-us">
  <h3 class="mb-3">
    Contact Us
  </h3>
  <v-layout wrap row>
    <v-flex lg6 xs12>
      <v-card class="p-md">
        <v-card-text class="pt-0">
          <v-form
            ref="form"
            v-model="form.isValid">
            <v-text-field
              class="contact-form-field"
              v-model="form.name"
              v-bind:rules="nameRules"
              placeholder="Name"
              color="light-green lighten-1"
              required
              disabled
            />
            <v-text-field
              class="contact-form-field"
              v-model="form.email"
              v-bind:rules="emailRules"
              type="email"
              placeholder="Email"
              color="light-green lighten-1"
              required
              disabled
            />
            <v-text-field
              class="contact-form-field"
              v-model="form.department"
              v-bind:rules="departmentRules"
              placeholder="Department"
              color="light-green lighten-1"
              required
              disabled
            />
            <v-text-field
              class="contact-form-field"
              v-model="form.designation"
              v-bind:rules="designationRules"
              placeholder="Designation"
              color="light-green lighten-1"
              required
              disabled
            />
            <v-select
              class="contact-form-field"
              v-model="form.type"
              v-bind:items="inquiryTypes"
              append-icon="unfold_more"
              required
              item-text="text"
              item-value="value"
              color="light-green lighten-1"
              placeholder="Type of enquiry"
            />
            <v-layout
              align-center
              justify-center
              row>
              <v-flex class="ma-0" xs12>
                <h4 class="px-2 mb-3">
                  Message
                </h4>
                <v-textarea
                  class="contact-form-field"
                  v-model="form.message"
                  v-bind:rules="messageRules"
                  color="light-green lighten-1"
                  placeholder="Type your message here"
                  no-resize
                  required
                  hide-details
                  box
                />
              </v-flex>
            </v-layout>
            <v-layout
              align-center
              justify-center
              row>
              <v-flex xs12>
                <v-radio-group
                  class="contact-form-field"
                  v-model="form.no_reply"
                  row>
                  <v-radio
                    color="light-green lighten-1"
                    label="No reply required"
                    v-bind:value="1">
                  </v-radio>
                  <v-radio
                    color="light-green lighten-1"
                    label="I would like a reply"
                    v-bind:value="0">
                  </v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
            <v-layout
              align-center
              justify-center
              row>
              <v-flex xs12>
                <dropzone
                  ref="dropzone"
                  v-bind:options="dropzoneOptions"
                  v-bind:duplicateCheck="dropzoneOptions.duplicateCheck"
                  v-bind:destroyDropzone="dropzoneOptions.destroyDropzone"
                  v-bind:useCustomSlot="true">
                  <div class="dropzone-custom-content dz-default dz-message">
                    <div class="subtitle">
                      <div class="link-container">
                        <v-icon>link</v-icon>
                      </div>
                      <strong>Select attachment to upload</strong>
                    </div>
                  </div>
                </dropzone>
              </v-flex>
            </v-layout>
            <v-btn
              @click.prevent="submit()"
              v-bind:loading="isSending"
              color="light-green lighten-1" block large dark>
              <strong>Submit</strong>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Dropzone from 'nuxt-dropzone';
import 'nuxt-dropzone/dropzone.css';

const INQUIRY_TYPES = {
  NO_REPLY: 0,
  TECHNICAL_ISSUE: 1,
  REDEMPTION: 2,
  ACCESS: 3,
  TOKEN_BADGES: 4,
  MESSAGE: 5,
  OTHERS: 6,
};


export default {
  components: {
    Dropzone,
  },
  mounted() {
    this.initializeDropzone();
  },
  data() {
    return {
      inquiryTypes: [
        { text: 'Redemption', value: INQUIRY_TYPES.REDEMPTION },
        { text: 'Tokens/Badges', value: INQUIRY_TYPES.TOKEN_BADGES },
        { text: 'Technical issue', value: INQUIRY_TYPES.TECHNICAL_ISSUE },
        // { text: 'Access', value: INQUIRY_TYPES.ACCESS },
        // { text: 'Message', value: INQUIRY_TYPES.MESSAGE },
        { text: 'Others', value: INQUIRY_TYPES.OTHERS },
      ],
      form: {
        name: '',
        email: '',
        department: '',
        designation: '',
        type: null,
        no_reply: 1,
        message: '',
        isValid: true,
      },
      rules: {
        nameRules: [
          (v) => !!v || 'Name is required',
        ],
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        departmentRules: [
          (v) => !!v || 'Department is required',
        ],
        designationRules: [
          (v) => !!v || 'Designation is required',
        ],
        messageRules: [
          (v) => !!v || 'Message is required',
        ],
      },
      dropzone: null,
      dropzoneOptions: {
        url: '/',
        addRemoveLinks: true,
        destroyDropzone: true,
        duplicateCheck: true,
        maxFiles: 1,
      },
      isSending: false,
    };
  },
  watch: {
    userProfile: {
      handler() {
        if (this.userProfile.name !== 'undefined') {
          this.initializeFormFields();
        }
      },
      deep: true
    },
  },
  computed: {
    ...mapGetters({
      userProfile: 'session/GET_PROFILE',
    }),
    chekcboxLabel() {
      if (this.form.no_reply === 1) {
        return 'No reply required';
      }
      return 'I would like a reply';
    },
  },
  methods: {
    submit () {
      if (this.isSending) return;

      this.isSending = true;

      if (this.$refs.form.validate()) {
        let payload = this.$formDataBuilder(this.form);
        const files = this.$refs.dropzone.dropzone.files;

        if (files.length > 0) {
          payload.append('attachment', files[0]);
        }

        this.$axios
            .post('/contact', payload)
            .then(() => {
              this.$toast.success('Your message has been sent');
              this.clear();
            })
            .catch((error) => {
              for (const k in error.response.data) {
                this.$toast.error(error.response.data[k]);
              }
            })
            .finally(() => {
              this.isSending = false;
            });
      }
    },
    clear () {
      this.$refs.dropzone.removeAllFiles(true);

      this.$resetForm(this.form, {
        name: this.userProfile.name,
        email: this.userProfile.email,
        department: this.userProfile.department_name,
        designation: this.userProfile.position_name,
        type: INQUIRY_TYPES.NO_REPLY,
        no_reply: 1,
        isValid: true,
      })
    },
    initializeFormFields() {
      this.form.name = this.userProfile.name;
      this.form.email = this.userProfile.email;
      this.form.department = this.userProfile.department_name;
      this.form.designation = this.userProfile.position_name;
    },
    initializeDropzone() {
      this.dropzone = this.$refs.dropzone;
    },
  },
  mounted() {
    this.initializeFormFields();
  },
};
</script>

<style lang="scss" scoped>
.headline {
  font-size: 18px !important;
  font-family: "Open Sans" !important;
  font-weight: bold !important;
}
.v-form .flex {
  margin: 0 5px;
}
.dz-started .dropzone-custom-content {
  display: none !important;
}
.dropzone {
  background: #f1f1f1;
  min-height: 1em;
  padding: 5px;

  .dz-preview {
    margin: 0;

    .dz-image img {
      width: 150px;
    }
  }
}
.dropzone-custom-content {
  display: block !important;
  border: 2px solid #FFF;
  padding: 1em;
  font-size: 13px;
  margin: 0 !important;
  position: relative;

  .subtitle {
    .link-container {
      background: rgb(255, 255, 255);
      position: absolute;
      left: 0;
      height: 100%;
      top: 0;
      width: 40px;

      .v-icon {
        transform: rotateZ(140deg);
        position: absolute;
        left: 0;
        height: 100%;
        top: 0;
        width: 40px;
      }
    }
  }
}
.dz-default.dz-message {
  display: none;
}
.v-btn__content,
.v-input .v-label,
.v-input textarea,
.v-input input {
  font-size: 13px;
}
.v-input textarea::placeholder {
  color: #525047;
}
.v-input input:read-only {
  color: #8BC349 !important;
}
</style>
