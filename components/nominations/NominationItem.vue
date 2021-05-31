<template>
  <div id="nomination-item" class="nomination-item">
    <header v-if="showHeader">
      <div class="avatar">
        <img :src="nomination.recipient.avatar" :alt="nomination.recipient.name" />
      </div>
      <div class="detail">
        <strong class="name">{{ nomination.recipient.name }}</strong><br />
        <span class="department">
          {{ nomination.recipient.department_short_name || nomination.recipient.department_name }}
        </span>
      </div>

      <v-btn icon color="light-green"  class="text--white" @click="$emit('welcome', nomination)">
        <v-icon>edit</v-icon>
      </v-btn>
    </header>
    <div class="content">
      <div class="badge" v-show="nomination.is_badge_removed == 0">
        <img v-bind:src="badgeImage" />
        <p v-bind:style="{ color: '#000', fontSize: '17px', fontWeight: 700 }"
           v-html="badgeTitle" />
      </div>
      <p class="comment" v-html="nomination.message"></p>
      <strong class="name">From {{ nomination.sender.name }}</strong><br>
      <span class="date">{{ $moment(nomination.created_at).format('DD MMM YYYY | hh:mm A') }}</span>
    </div>
    <footer>
      <a class="like-btn" href="#" :class="{ 'active': nomination.is_liked_by_user }" @click.prevent="toggleLike">
        <span>{{ nomination.total_likes }}</span> <div class="thumbs-up-icon"></div> <span>Great job!</span>
      </a>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  props: {
    isUserNominations: { type: Boolean, default: false },
    nomination: { type: Object, required: true },
  },
  methods: {
    toggleLike() {
      if (this.nomination) {
        this.$store.dispatch('nominations/like', this.nomination.id);
      }
    },
  },
  computed: {
    ...mapGetters({
      isFilterTypeReceived: 'nominations/IS_FILTER_TYPE_RECEIVED',
      user: 'session/GET_PROFILE',
      isAdmin: "session/IS_ADMIN",
      badges: 'badges/GET',
    }),
    showHeader() {
      if (this.isUserNominations)
        return !this.isFilterTypeReceived;
      return true;
    },
    badgeTitle() {
      if (this.nomination) {
        const idx = this.badges.findIndex(b => b.id === this.nomination.badge.id);

        if (idx >= 0) {
          return this.badges[idx].title_html;
        }
      }
      return '';
    },
    badgeImage() {
      if (this.nomination) {
        const idx = this.badges.findIndex(b => b.id === this.nomination.badge.id);

        if (idx >= 0) {
          return this.badges[idx].img;
        }
      }
      return '';
    },
    editNomination(nomination) {
      console.log(nomination);
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/components/nomination-item.scss";
</style>
