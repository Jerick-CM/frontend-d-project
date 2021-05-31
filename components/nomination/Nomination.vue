<template>
  <div id="nomination">
    <div class="content">
      <header>
        <p>Show your appreciation</p>
      </header>
      <!-- Preview Mode -->
      <div class="preview-mode p-lg-horizontal" v-if="!isSelectMode">
        <br>
        <div class="giver-receiver container--flex container--flex-align-item-center">
          <div class="giver center">
            <div class="avatar"><img :src="userAvatar" /></div>
            <p class="name"><strong>{{ user.name }}</strong></p>
          </div>
          <div class="center-align arrow-right p-md-horizontal">
            <em class="thin">to</em>
            <span>
              <img src="~/assets/img/icons/arrow-right.svg" alt="Arrow Right" class="responsive-img mt-1" />
            </span>
          </div>
          <div class="receiver center" @click="isSelectMode = true">
            <div class="avatar" :class="{ 'empty': receiver === null }">
              <img :src="receiverAvatar" />
            </div>
            <div class="name">
              <p class="name" v-if="receiver === null"><strong>Recipient</strong></p>
              <p class="name" v-else><strong>{{ receiver.name }}</strong></p>
            </div>
          </div>
        </div>

        <textarea name="message"
                  class="message"
                  rows="5"
                  v-model="message"
                  :placeholder="textareaPlaceholder">
        </textarea>

        <small class="character-count right"
               :class="{ 'mid': characterLeft <= 70, 'low': characterLeft === 0 }">
          <em>{{ $pluralize('character', characterLeft) }} left</em>
        </small>
        <br><br>

        <div class="controls">

          <!-- Credit Selection -->
          <div class="credit-ctrl no-padding container--flex"
               :class="{ 'active': isCreditGiveMode }"
               v-if="!isBadgeSelectMode && !isReceiverPartner">
            <div class="pts-button clickable" @click="creditMode()">
              <img class="responsive-img"
                   src="~/assets/img/icons/t-letter-ico.png"
                   alt="Tokens" />
              <span class="credits-count" v-if="credits !== null || isCreditGiveMode">
                {{ isCreditGiveMode ? creditSelected : credits }}
              </span>
            </div>
            <div class="input-group" v-if="isCreditGiveMode">
              <div class="credit-wrapper container--flex container--flex-align-item-center">
                <div class="clickable point-btn" @click="decrementPoints()">
                  <i class="material-icons">remove</i>
                </div>
                &nbsp;&nbsp;
                <div class="clickable point-btn" @click="incrementPoints()">
                  <i class="material-icons">add</i>
                </div>
              </div>
              <i class="material-icons save-credit clickable" v-bind:class="{ 'disabled': isReceiverPartner }" @click="saveSelectedCredit">check_circle</i>
            </div>
          </div>

          <!-- Badge Selection -->
          <div class="badge-ctrl no-padding"
               :class="{ 'active': isBadgeSelectMode }"
               v-if="!isCreditGiveMode">
            <div class="choose-badge-btn" v-if="isBadgeSelectMode">
              <div class="badge-list" v-if="isBadgeSelectMode">
                <div class="badge clickable" v-for="(b, i) in badges" :key="i" @click="selectBadge(b)">
                  <v-tooltip top>
                    <img :src="b.icon" slot="activator" />
                    <span v-html="b.title_html" />
                  </v-tooltip>
                </div>
              </div>
              <div class="badge-placeholder container--flex container--flex-align-item-center" v-else>
                <span>Choose a badge</span>
              </div>
            </div>
            <div class="select-badge">
              <img src="~/assets/img/icons/star.svg"
                  class="responsive-img"
                  alt="Select Badge"
                  v-if="selectedBadge === null"
                  @click="toggleIsBadgeSelectMode()" />
            </div>
            <div class="badge-selected"
                 v-if="selectedBadge !== null"
                 @click="toggleIsBadgeSelectMode()">
              <img :src="selectedBadge.icon" />
            </div>
          </div>

          <div class="help-btn" v-if="!isCreditGiveMode">
            <v-dialog v-model="dialog" width="60%">
              <div class="help" slot="activator">
                <img class="responsive-img" src="~/assets/img/icons/question-mark.png" alt="help" />
              </div>
              <div id="nomination-modal">
                <v-card>
                  <v-card-title class="pa-0">
                    <div class="cancel clickable" @click="dialog=false">
                      <img class="responsive-img" src="~/assets/img/icons/close.png" />
                    </div>
                  </v-card-title>

                  <v-card-text>
                    <div class="container--flex container--flex-wrap container--flex-justify-center">
                      <div class="badge mt-3" v-for="(b, idx) in badges" :key="idx">
                        <div class="badge-img">
                          <img class="responsive-img" :src="b.img" />
                        </div>
                        <p class="mb-0"><strong v-html="b.title_html" /></p>
                        <p>{{ b.description }}</p>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </v-dialog>
          </div>
        </div>
        <div>
          <v-alert
            class="error-alert"
            :color="alertType"
            :value="alertVisible"
          >
            {{ alertText }}
          </v-alert>
        </div>
      </div>
      <!-- Select Mode -->
      <div class="select-mode p-lg-horizontal" v-else>
        <div class="cancel" @click="cancelSelectMode">
          <i class="material-icons">cancel</i>
        </div>
        <input v-model="search" class="search" type="text" />
        <ul class="receivers">
          <li v-for="(e, idx) in employees" :key="idx" @click="selectReceiver(e)">
            <div class="avatar"><img :src="e.avatar"></div>
            <div class="employee-details">
              <strong>{{ e.name }}</strong><br>
              <strong><strong>{{ e.position_name }}</strong> | {{ e.service_line_name }}</strong><br>
              <small><strong>{{ e.email }}</strong></small>
            </div>
          </li>

          <infinite-loading @infinite="infiniteHandler" :identifier="infiniteIdentifier">
            <div slot="spinner">Fetching...</div>
            <div slot="no-more">All users have been loaded</div>
            <div slot="no-results">No Search Results Found</div>
          </infinite-loading>
        </ul>
      </div>

      <hr />

      <button class="btn clickable post-btn full-btn p-lg-horizontal m-md-vertical"
              type="button"
              @click.prevent="confirm()"
              :disabled="isSending || !canSend || isCreditGiveMode">
        <strong v-if="!isSending">Post</strong>
        <strong v-if="isSending">
          <v-progress-circular
            style="margin-top: -7px;"
            v-bind:width="2"
            v-bind:size="20"
            color="green"
            indeterminate
          ></v-progress-circular>
        </strong>
      </button>
    </div>

    <!-- Error Dialog -->
    <v-dialog
      v-model="errorDialog"
      width="500">
      <v-card>
        <v-card-title
          class="headline red lighten-2 white--text"
          primary-title>
          Error
        </v-card-title>

        <v-card-text>
          <ul>
            <li v-for="(err, idx) in errors" v-bind:key="idx">
              {{ err }}
            </li>
          </ul>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="errorDialog = false"
            color="error"
            flat>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

import { mapGetters } from 'vuex';

import Carousel from '~/components/carousel';

const SEARCH_DELAY = 500; // Input delay before triggering search

const POINTS_MAX = 100; // Maximum points possible
const POINTS_STEP = 1;  // Points to add/reduce
const POINTS_MIN = 5;   // Minimum points possible
const MAX_CHAR = 280;   // Character limit for message

export default {
  mixins: [
    Carousel,
  ],
  data() {
    return {
      alertText: null,
      alertTimeout: null,
      alertType: 'error',
      alertVisible: false,
      confirmationDialog: false,
      credits: null,
      creditSelected: POINTS_MIN,
      dialog: false,
      employees: [],
      errorDialog: false,
      errors: [],
      infiniteIdentifier: new Date(),
      isBadgeSelectMode: false,
      isCreditGiveMode: false,
      isSelectMode: false,
      isSending: false,
      maximum_points: 100,
      message: '',
      page: 1,
      receiver: null,
      search: '',
      searchTimeout: null,
      selectedBadge: null,
    };
  },
  computed: {
    ...mapGetters({
      user: 'session/GET_PROFILE',
      userAvatar: 'session/GET_USER_AVATAR',
      badges: 'badges/GET',
    }),
    receiverAvatar() {
      return (this.receiver) ? this.receiver.avatar : require('~/assets/img/icons/plus.svg');
    },
    textareaPlaceholder() {
      return 'Type your message here';
    },
    canSend() {
      return this.receiver && this.selectedBadge && this.message;
    },
    characterLeft() {
      // Count all characters except for newline
      const charMatch = this.message.match(/.[^\n]*/g);

      return (charMatch) ? (MAX_CHAR - charMatch.join('').length) : MAX_CHAR;
    },
    isReceiverPartner() {
      if (this.receiver) {
        return this.receiver.is_partner == 1;
      }
      return false;
    },

  },
  methods: {
    creditMode() {
      this.isCreditGiveMode = !this.isCreditGiveMode;
      this.incrementPoints(true);
    },
    async infiniteHandler($state) {
      try {
        let payload = {
          page: this.page++,
        };

        if (this.search) {
          payload.search = this.search;
        }

        const res = await this.$axios.get(this.$queryBuilder('/users', payload));
        const results = res.data.data;

        // Check if need to append on array or a new one
        if (this.employees.length > 0) {
          this.employees.concat(results);
        } else {
          this.employees = results;
        }

        // infinite-loader load finish checking
        if (results.length > 0) {
          $state.loaded();
        } else {
          $state.complete();
        }

      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    resetInfiniteScroll() {
      this.infiniteIdentifier += 1;
      this.page = 1;
      this.employees = [];
    },
    cancelSelectMode() {
      this.resetInfiniteScroll();
      this.isSelectMode = false;
    },
    async selectReceiver(newReceiver) {
      this.receiver = newReceiver;
      this.isSelectMode = false;
      this.isCreditGiveMode = false;
      this.isBadgeSelectMode = false;

      if (newReceiver.is_partner === 1) {
        this.creditSelected = POINTS_MIN;
        this.credits = null;
      }
      const res = await this.$axios.get('/nominations/get_maximum_recipient_token_limit', {
        params: {
          recipient_id: this.receiver.id
        }
      });
      this.maximum_points = res.data.data.maximum_token_limit;
      if (this.creditSelected > this.maximum_points) {
        this.creditSelected = this.maximum_points;
      }
      if (this.user.black_token < POINTS_MIN) {
        this.creditSelected = 0;
      }
    },
    selectBadge(newBadge) {
      this.selectedBadge = newBadge;
      this.isBadgeSelectMode = false;
    },
    async confirm() {
      const confirmPopupOpts = {
        title: 'Do you want to confirm the action below?',
        buttonTrueText: 'Confirm',
        buttonFalseText: 'Back',
        color: 'black',
        icon: '',
      };

      const text = `
      <p>Your Message: ${this.message}</p>
      <p>Token Value: ${this.credits ? this.credits : 0}</p>
      <p>Badge Type: ${this.selectedBadge.title_html}</p>
      `;

      let res = await this.$confirm(text, confirmPopupOpts);

      if (res) {
        this.post();
      }
    },
    post() {
      const payload = {
        id: this.receiver.id,
        badge_id: this.selectedBadge.id,
        credits: (this.credits) ? this.credits : 0,
        message: this.message,
      };

      this.isSending = true;
      this.$store
          .dispatch('nominations/send', payload)
          .then(() => {
            this.$store.dispatch('nominations/fetchAll');
            this.$store.commit('session/DEDUCT_PROFILE_TOKENS', payload.credits);
            this.$toast.success('Nomination successfully sent.');
            this.reset();
          })
          .catch((error) => {
            this.errors = [];
            this.errorDialog = true;

            for (const k in error.response.data) {
              this.errors.push(error.response.data[k][0]);
            }
          })
          .finally(() => {
            this.confirmationDialog = false;
            this.isSending = false;

            setTimeout(() => {
              this.$redrawVueMasonry();
            }, 300);
          });
    },
    reset() {
      this.isBadgeSelectMode = false;
      this.isCreditGiveMode = false;
      this.isSelectMode = false;

      this.creditSelected = POINTS_MIN;
      this.selectedBadge = null;
      this.receiver = null;
      this.credits = null;
      this.message = '';
      this.errors = [];
    },
    toggleIsBadgeSelectMode() {
      this.isBadgeSelectMode = !this.isBadgeSelectMode;
    },
    incrementPoints(checkOnly = false) {
      if (!checkOnly) {
        this.creditSelected += POINTS_STEP;
      }
      var showInsufficientMessage = false;
      if (this.user.black_token < this.creditSelected) {
        showInsufficientMessage = true;
        this.creditSelected = this.user.black_token;
      }

      if (this.user.black_token < POINTS_MIN) {
        showInsufficientMessage = true;
        this.creditSelected = 0;
      }
      if (this.creditSelected > this.user.maximum_token_limit) {
        this.creditSelected = this.user.maximum_token_limit;
      }
      if (this.creditSelected > this.maximum_points) {
        this.creditSelected = this.maximum_points;
      }
      if (showInsufficientMessage) {
        this.alertVisible = true;
        this.alertType = 'error';
        this.alertText = "Insufficient tokens";
        this.alertTimeout = setTimeout(() => this.alertVisible = false, 5000);
      }
    },
    decrementPoints() {
      this.creditSelected -= POINTS_STEP;

      if (this.creditSelected < POINTS_MIN) {
        this.creditSelected = POINTS_MIN;
      }
      if (this.user.black_token < POINTS_MIN || this.creditSelected < 0) {
        this.creditSelected = 0;
      }
    },
    saveSelectedCredit() {
      this.credits = this.creditSelected;
      this.isCreditGiveMode = false;
    },
   },
   watch: {
    message(newVal, oldVal) {
      // Revert change if double enter is detected
      if (newVal.indexOf('\n\n\n') >= 0) {
        this.message = oldVal;
      }
      if (this.characterLeft < 0) {
        this.message = oldVal;
      }
    },
    search() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      this.searchTimeout = setTimeout(() => {
        this.resetInfiniteScroll()
        this.searchTimeout = null
      }, SEARCH_DELAY)
    },
  },
  components: {
    InfiniteLoading,
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/components/nomination.scss";
</style>
