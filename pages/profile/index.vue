<template>
  <div id="profile" class="page">
    <div class="container no-padding">
      <div class="profile-summary container--flex">
        <div class="card flex-1">
          <profile-summary />
        </div>
        <div class="card flex-4">
          <achievement-summary />
        </div>
      </div>
      <div class="m-md-vertical">
        <received-messages />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSummary from '~/components/pages/profile/ProfileSummary.vue';
import AchievementSummary from '~/components/pages/profile/AchievementSummary.vue';
import ReceivedMessages from '~/components/pages/profile/ReceivedMessages.vue';

import authenticatedPage from '~/mixins/authenticated-page.js';


export default {
  components: {
    AchievementSummary,
    ReceivedMessages,
    ProfileSummary,
  },
  mixins: [authenticatedPage],
  mounted() {
    this.$store.commit('nominations/CLEAR');
    this.$store.commit('profile/CLEAR');
    this.$store.dispatch('profile/fetchUserBadges');
    this.$store.dispatch('profile/fetchProfile');
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/profile.scss";
</style>
