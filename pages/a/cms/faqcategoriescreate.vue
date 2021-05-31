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
            <nuxt-link :to="{ name: 'a-cms-faqcategories'}">Go Back</nuxt-link>

            <form class="review-form" name="editfaq" @submit.prevent="onSubmit">
              <div class="faq col-md-12">
                <div>Edit FAQ Categories</div>
              </div>

              <div class="form-group">
                <v-text-field v-model="form_value" label="Category" @blur="$v.form_value.$touch()"></v-text-field>
              </div>
              <template v-if="$v.form_value.$error">
                <p v-if="!$v.form_value.required" class="errorMessage">Title is required.</p>
              </template>
              <v-btn color="success" :disable="$v.$invalid" :disabled="submitted">
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
import Faq from "~/components/admin/cms/index";
import { mapGetters } from "vuex";
var url = process.env.API_URL;

import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import { required } from "vuelidate/lib/validators";

export default {
  head() {
    return {
      script: [],
      link: [],
    };
  },
  components: {
    Faq,
  },
  data: () => ({
    submitted: false,
    id: null,
    categories: [],
    dbSelect: null,
    dbOptions: [],
    form_value: null,
    form_id: null,
    errors: [],
  }),
  validations: {
    form_value: { required },
  },
  async created() {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.get(url + "/api/faqcategories-search", {
        headers: {
          Accept: "application/json",
        },
        params: {
          id: this.$route.params.id,
        },
      });

      this.form_value = response.data[0]["value"];
      this.form_id = response.data[0]["id"];
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
    save() {
      console.log(this.editorData);
    },
    onSubmit() {
      if (this.form_value) {
        //success
        this.submitted = true;
        var profile_id = this.profile.id;
        var name = this.profile.name;

        let payload = new FormData();
        payload.append("value", this.form_value);
        payload.append("profile_id", profile_id);
        payload.append("name", name);

        this.$toast.success("Please wait");
        this.$axios
          .post("/create-faqcategories-item", payload)
          .then((res) => {
            this.$toast.success("Create Category is done");
            // this.form_value = null;
            this.submitted = false;

            window.location = "/a/cms/faqcategories";
          })
          .catch((error) => {
            this.submitted = false;
          })
          .finally(() => {});
      } else {
        //error

        this.errors.length = 0;
        if (!this.form_value) {
          this.$toast.success("Title is required.");
          this.errors.push("Title is required.");
        }
      }
    },
  },
};
</script>
<style lang="css" scoped>
.errorMessage {
  color: red;
}
</style>
<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
