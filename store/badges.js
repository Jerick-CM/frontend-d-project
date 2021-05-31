import fixture from '~/fixtures/badges';


/**
 * Vuex state structure.
 */
export const state = () => ({
  badges: [],
  user: null,
});

/**
 * Vuex Mutation methods.
 */
export const mutations = {
  SET_USER_BADGES(state, userBadges) {
    state.user = userBadges;
  },
  ADD(state, item) {
    state.badges.push(item);
  },
  REMOVE(state, badgeID) {
    const idx = state.badges.findIndex(i => i.id === badgeID);

    if (idx >= 0) {
      state.badges.splice(idx, 1);
    }
  },
  CLEAR(state) {
    state.badges = [];
    state.user = null;
  },
  SET_FIXTURE(state) {
    state.badges = fixture;
  },
  INCREMENT_SENT_COUNT(state) {
    if (state.user) {
      state.user.sendCount += 1;
    }
  },
};

/**
 * Vuex Getter methods.
 */
export const getters = {
  GET(state) {
    return state.badges;
  },
  GET_USER_BADGES(state) {
    if (state.user) {
      return state.user.badges;
    }
    return [];
  },
  GET_USER_SEND_COUNT(state) {
    if (state.user) {
      return state.user.sendCount;
    }
    return 0;
  },
  GET_USER_RECEIVE_COUNT(state) {
    if (state.user) {
      return state.user.receiveCount;
    }
    return 0;
  },
};

/**
 * Vuex Action methods.
 */
export const actions = {
  async fetchUserBadges({ commit }) {
    try {
      const req = await this.$axios.get('/users/badges');
      const badges = req.data;

      commit('SET_USER_BADGES', badges);
    } catch (error) {
      console.error(error);
      this.$toast.error(error.response.data.message);
    }
  },
};
