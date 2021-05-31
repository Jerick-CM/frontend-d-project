/**
 * Vuex state structure.
 */
export const state = () => ({
  userProfile: {},
  profileBadges: [],
  sendCount: 0,
  receiveCount: 0,
  totalBadges: 0,
  totalBadgesSent: 0,
});

/**
 * Vuex Mutation methods.
 */
export const mutations = {
  SET_USER_PROFILE(state, profile) {
    state.userProfile = profile;
  },
  SET_BADGES(state, badges) {
    state.profileBadges = badges;
  },
  SET_SEND_COUNT(state, sendCount) {
    state.sendCount = sendCount;
  },
  SET_RECEIVE_COUNT(state, receiveCount) {
    state.receiveCount = receiveCount;
  },
  SET_TOTAL_BADGES(state, totalBadges) {
    state.totalBadges = totalBadges;
  },
  SET_TOTAL_BADGES_SENT(state, totalBadgesSent) {
    state.totalBadgesSent = totalBadgesSent;
  },
  CLEAR(state) {
    state.userProfile = {};
    state.profileBadges = [];
    state.sendCount = 0;
    state.receiveCount = 0;
  },
};

/**
 * Vuex Getter methods.
 */
export const getters = {
  GET_USER_PROFILE(state) {
    return state.userProfile || {};
  },
  GET_BADGES(state) {
    return state.profileBadges;
  },
  GET_SEND_COUNT(state) {
    return state.sendCount;
  },
  GET_RECEIVE_COUNT(state) {
    return state.receiveCount;
  },
  GET_TOTAL_BADGES(state, totalBadges) {
    return state.totalBadges;
  },
  GET_TOTAL_BADGES_SENT(state, totalBadgesSent) {
    return state.totalBadgesSent;
  },
};

/**
 * Vuex Action methods.
 */
export const actions = {
  async fetchProfile({ commit }, user_id=null) {
    try {
      const url = user_id ? `/users/${user_id}` : '/user';
      const req = await this.$axios.get(url);

      commit('SET_USER_PROFILE', req.data);
    } catch (error) {
      this.$toast.error(error);
    }
  },
  async fetchUserBadges({ commit }, user_id=null) {
    try {
      const url = user_id ? this.$queryBuilder('/users/badges', { user_id }) : '/users/badges';
      const req = await this.$axios.get(url);
      const badges = req.data.badges;

      commit('SET_BADGES', req.data.badges);
      commit('SET_SEND_COUNT', req.data.sendCount);
      commit('SET_TOTAL_BADGES', req.data.totalBadges);
      commit('SET_TOTAL_BADGES_SENT', req.data.totalBadgesSent);
      commit('SET_RECEIVE_COUNT', req.data.receiveCount);
    } catch (error) {
      this.$toast.error(error.response.data.message);
    }
  },
};
