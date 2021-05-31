<template>
  <section id="home" class="page">
    <div class="promo-container container container--grid pb-0">
      <v-progress-circular
        v-if="isFetching"
        class="center-block"
        :size="50"
        color="primary"
        indeterminate
      >
      </v-progress-circular>
      <div v-if="banners.length === 0 && !isFetching">
        <carousel>
          <carousel-item
            style="
              background-image: url('/img/carousel/deloitte.png');
              background-image: url(/img/carousel/deloitte.png);
              background-position: center;
              background-repeat: no-repeat;
              background-color: #000;
              background-size: 100%;
            "
          >
          </carousel-item>
        </carousel>
      </div>
      <div v-if="banners.length > 0 && !isFetching">
        <carousel>
          <carousel-item
            v-for="(banner, idx) in banners"
            :key="idx"
            :action="banner.action"
          >
            <a
              :href="banner.action"
              :target="banner.is_open_in_new_tab ? '_blank' : '_self'"
              v-if="banner.action && banner.action !== '#'"
            >
              <div :style="getBannerStyle(banner.file_url)"></div>
            </a>
            <div :style="getBannerStyle(banner.file_url)" v-else></div>
          </carousel-item>
        </carousel>
      </div>

      <nomination />
    </div>

    <div class="content reward-listing">
      <nomination-list
        v-on:welcome="editNomination"
        :nominations="nominations"
        :show-filter="false"
        :show-sort="false"
      />
      <v-spacer></v-spacer>
      <!-- Add/Edit Item Dialog -->
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark>
            <v-btn icon dark @click="closeModal()">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Appreciation Wall Entry</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <div class="container--flex mb-4">
              <div class="flex-1 preview-item">
                <div class="col-8 offset-2">
                  <v-btn
                    :loading="removeBadgeLoading"
                    :disabled="editedNomination.is_badge_removed == 1"
                    class="ma-2 white--text"
                    color="red"
                    @click="removeBadge()"
                  >
                    <v-icon left>delete</v-icon> <span>Remove Badge</span>
                  </v-btn>
                  <v-btn
                    :loading="removeTokenLoading"
                    :disabled="
                      editedNomination.is_recipienttoken_removed == 1 ||
                      editedNomination.credits == 0
                    "
                    class="ma-2 white--text"
                    color="red"
                    @click="removeToken()"
                  >
                    <v-icon left>delete</v-icon> <span>Remove Token</span>
                  </v-btn>
                  <v-btn
                    :loading="refundTokenLoading"
                    :disabled="
                      editedNomination.is_recipienttoken_removed == 0 ||
                      this.editedNomination.is_refunded == 1
                    "
                    class="ma-2 white--text"
                    color="green"
                    @click="refundToken()"
                  >
                    <v-icon left>refresh</v-icon> <span>Refund Token</span>
                  </v-btn>
                  <v-btn
                    v-if="reverse"
                    :loading="removeBadgeLoading"
                    :disabled="editedNomination.is_badge_removed == 0"
                    class="ma-2 white--text"
                    color="green"
                    @click="removeBadge(0)"
                  >
                    <v-icon left>delete</v-icon> <span>Return Badge</span>
                  </v-btn>
                  <v-btn
                    v-if="reverse"
                    :loading="refundTokenLoading"
                    :disabled="editedNomination.is_recipienttoken_removed == 0"
                    class="ma-2 white--text"
                    color="green"
                    @click="removeToken(0)"
                  >
                    <v-icon left>remove</v-icon> <span>Return Token</span>
                  </v-btn>
                  <v-textarea
                    label="Message"
                    color="light-green lighten-1"
                    v-model="editedNomination.message"
                  ></v-textarea>
                </div>
                <div>
                  <v-btn color="success" @click="save()">Save</v-btn>
                  <v-btn color="error" @click="deleteNomination()"
                    >Delete Full Post</v-btn
                  >
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import authenticatedPage from "~/mixins/authenticated-page.js";

import Nomination from "~/components/nomination";
import Nominations from "~/components/nominations";
import Carousel from "~/components/carousel";

export default {
  mixins: [
    authenticatedPage,
    // Components
    Nominations,
    Nomination,
    Carousel,
  ],
  computed: {
    ...mapGetters({
      nominations: "nominations/GET",
      isAdmin: "session/IS_ADMIN",
    }),
  },
  data() {
    return {
      banners: [],
      dialog: false,
      editedNomination: {},
      isFetching: false,
      refundTokenLoading: false,
      removeBadgeLoading: false,
      removeTokenLoading: false,
      reverse: false,
    };
  },
  mounted() {
    this.isFetching = true;
    this.reverse = this.$route.query.reverse;
    this.$axios
      .get(this.$queryBuilder("/banners", { rpp: 0 }))
      .then((res) => {
        const filteredData = res.data.data.map((b) => {
          return {
            ...b,
            action: this.updateURL(b.action),
          };
        });

        this.banners = filteredData;
      })
      .catch((err) => {
        this.$toast.error(err.response.message);
      })
      .finally(() => {
        this.isFetching = false;
      });
  },
  methods: {
    editNomination(nomination) {
      this.dialog = !this.dialog;
      this.editedNomination = nomination;
    },
    closeModal() {
      this.dialog = false;
    },
    async save() {
      this.$axios
        .post(`/black-token-post`, {
          id: this.editedNomination.id,
          message: this.editedNomination.message,
        })
        .then(() => {
          this.$toast.success("Entry successfully updated.");
          const nominationIndex = this.nominations.findIndex(
            (nomination) => nomination.id === this.editedNomination.id
          );
          if (nominationIndex >= 0) {
            this.nominations[nominationIndex] = this.editedNomination;
          }
        })
        .catch((err) => {
          var errorMessage = err.response ? err.response.message : err;
          this.$toast.error(errorMessage);
        })
        .finally(() => {
          this.dialog = false;
        });
    },
    async deleteNomination() {
      const confirmPopupOpts = {
        title: "Delete nomination",
        buttonTrueText: "Confirm",
        buttonFalseText: "Cancel",
        buttonFalseColor: "red",
        buttonTrueColor: "light-green lighten-1",
        color: "black",
        icon: "",
      };

      let isConfirm = await this.$confirm(
        '<div class="center">You are about to delete this nomination!<br>Click "Confirm" to proceed.</div>',
        confirmPopupOpts
      );
      if (isConfirm) {
        this.$axios
          .post(`/nominations/remove-wallpost`, {
            id: this.editedNomination.id,
          })
          .then(() => {
            this.$toast.success("Nomination successfully deleted.");
            this.editedNomination.is_recipienttoken_removed = 1;
            const nominationIndex = this.nominations.findIndex(
              (nomination) => nomination.id === this.editedNomination.id
            );
            if (nominationIndex >= 0) {
              this.nominations.splice(nominationIndex, 1);
            }
            this.dialog = false;
          })
          .catch((err) => {
            var errorMessage = err.response ? err.response.message : err;
            this.$toast.error(errorMessage);
          })
          .finally(() => {
            this.removeTokenLoading = false;
          });
      } else {
        this.removeTokenLoading = false;
      }
    },
    async removeToken(ret = 1) {
      this.removeTokenLoading = true;
      const confirmPopupOpts = {
        title: "Remove Token confirmation",
        buttonTrueText: "Confirm",
        buttonFalseText: "Cancel",
        buttonFalseColor: "red",
        buttonTrueColor: "light-green lighten-1",
        color: "black",
        icon: "",
      };

      let isConfirm = await this.$confirm(
        '<div class="center">You are about to remove the token!<br>Click "Confirm" to proceed.</div>',
        confirmPopupOpts
      );
      if (isConfirm) {
        this.$axios
          .post(`/post-remove-retain-token-recipient`, {
            id: this.editedNomination.id,
            remove: ret,
          })
          .then(() => {
            this.$toast.success("Token successfully removed.");
            this.editedNomination.is_recipienttoken_removed = 1;
            const nominationIndex = this.nominations.findIndex(
              (nomination) => nomination.id === this.editedNomination.id
            );
            if (nominationIndex >= 0) {
              this.nominations[nominationIndex] = this.editedNomination;
            }
          })
          .catch((err) => {
            var errorMessage = err.response ? err.response.message : err;
            this.$toast.error(errorMessage);
          })
          .finally(() => {
            this.removeTokenLoading = false;
          });
      } else {
        this.removeTokenLoading = false;
      }
    },
    async refundToken() {
      this.refundTokenLoading = true;
      const confirmPopupOpts = {
        title: "Refund token confirmation",
        buttonTrueText: "Confirm",
        buttonFalseText: "Cancel",
        buttonFalseColor: "red",
        buttonTrueColor: "light-green lighten-1",
        color: "black",
        icon: "",
      };

      let isConfirm = await this.$confirm(
        '<div class="center">You are about to refund the tokens!<br>Click "Confirm" to proceed.</div>',
        confirmPopupOpts
      );
      if (isConfirm) {
        this.$axios
          .post(`/refund_black_token`, {
            id: this.editedNomination.id,
          })
          .then(() => {
            this.$toast.success("Tokens successfully refunded.");
            this.refundTokenLoading = false;
            this.editedNomination.is_refunded = 1;
            const nominationIndex = this.nominations.findIndex(
              (nomination) => nomination.id === this.editedNomination.id
            );
            if (nominationIndex >= 0) {
              this.nominations[nominationIndex] = this.editedNomination;
            }
          })
          .catch((err) => {
            var errorMessage = err.response ? err.response.message : err;
            this.$toast.error(errorMessage);
          })
          .finally(() => {
            this.refundTokenLoading = false;
          });
      } else {
        this.refundTokenLoading = false;
      }
    },
    async removeBadge(ret = 1) {
      this.removeBadgeLoading = true;
      const confirmPopupOpts = {
        title: "Remove Badge confirmation",
        buttonTrueText: "Confirm",
        buttonFalseText: "Cancel",
        buttonFalseColor: "red",
        buttonTrueColor: "light-green lighten-1",
        color: "black",
        icon: "",
      };

      let isConfirm = await this.$confirm(
        '<div class="center">You are about to remove the Badge!<br>Click "Confirm" to proceed.</div>',
        confirmPopupOpts
      );
      if (isConfirm) {
        this.$axios
          .post(`/post-remove-retain-badge`, {
            id: this.editedNomination.id,
            remove: ret,
          })
          .then(() => {
            this.$toast.success("Badge successfully removed.");
            this.editedNomination.is_badge_removed = 1;
            const nominationIndex = this.nominations.findIndex(
              (nomination) => nomination.id === this.editedNomination.id
            );
            if (nominationIndex >= 0) {
              this.nominations[nominationIndex] = this.editedNomination;
            }
          })
          .catch((err) => {
            var errorMessage = err.response ? err.response.message : err;
            this.$toast.error(errorMessage);
          })
          .finally(() => {
            this.removeBadgeLoading = false;
          });
      } else {
        this.removeBadgeLoading = false;
      }
    },
    getBannerStyle(imgURL) {
      return {
        backgroundImage: `url(${imgURL})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
        backgroundSize: "100%",
        width: "100%",
        height: "100%",
      };
    },
    updateURL(url) {
      if (url) {
        const regex = /(http:\/\/|www\.)/;
        return url.replace(regex, "https://");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/home.scss";
</style>
