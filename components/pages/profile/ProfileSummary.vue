<template>
  <div id="profile-summary">
    <div class="content container--flex container--flex-direction-column">
      <br><br>
      <div class="center user-profile-details">
        <div class="avatar center-block p-lg-vertical">
          <img :src="avatar" :alt="userName" />
        </div>
        <p class="name mb-2">{{ userName }}</p>

        <a href="#"
           class="white--text v-btn theme--light light-green lighten-1"
           style="text-transform: none !important;"
        @click.prevent="gotoUserHistory()">View user history</a><br>
        <small v-if="user.nearest_token_expiration">"Recognise Others" token expiration:<br>{{ $moment(user.nearest_token_expiration).format('DD MMM YYYY | hh:mm A') }}</small>
      </div>
      <div class="badges-summary container--flex center container--flex-justify-center">
        <div class="sent flex-1 no-padding">
          <p>Badges sent</p>
          <span>{{ badgeSendCount }}</span>
        </div>
        <div class="received flex-1 no-padding">
          <p>Badges received</p>
          <span>{{ badgeReceiveCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
} from 'vuex';

import TransactionHistoryModal from '~/components/modals/TransactionHistoryModal.vue';

import { FILTER_TYPES } from '~/store/nominations';


export default {
  components: {
    TransactionHistoryModal,
  },
  computed: {
    ...mapGetters({
      user: 'profile/GET_USER_PROFILE',
      badges: 'profile/GET_BADGES',
      badgeReceiveCount: 'profile/GET_TOTAL_BADGES',
      badgeSendCount: 'profile/GET_TOTAL_BADGES_SENT',
    }),
    userName() {
      if (this.user && this.user.name) {
        return this.user.name;
      }
      return '';
    },
    avatar() {
      if (this.user && this.user.avatar) {
        return this.user.avatar;
      }
      return '/img/placeholders/user-placeholder.png';
    },
  },
  data() {
    return {
      FILTER_TYPES,
    };
  },
  methods: {
    gotoUserHistory() {
      this.$router.push({name: 'profile-user-history'});
      // const routeData = this.$router.resolve({name: 'profile-user-history'});
      // window.open(routeData.href, '_blank');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/components/profile-summary.scss";
</style>
