import fixture from '~/fixtures/rewards';


/**
 * Vuex state structure.
 */
export const state = () => ({
  rewards: [],
});

/**
 * Vuex Mutation methods.
 */
export const mutations = {
  ADD(state, item) {
    state.rewards.push(item);
  },
  SET(state, rewards) {
    state.rewards = rewards;
  },
  PUSH(state, rewards) {
    state.rewards = state.rewards.concat(rewards);
  },
  REMOVE(state, itemID) {
    const idx = state.rewards.findIndex(i => i.id === itemID);

    if (idx >= 0) {
      state.rewards.splice(idx, 1);
    }
  },
  CLEAR(state) {
    state.rewards = [];
  },
  SET_FIXTURE(state) {
    state.rewards = fixture;
  },
};

/**
 * Vuex Getter methods.
 */
export const getters = {
  GET(state) {
    return state.rewards;
  },
};

/**
 * Vuex Action methods.
 */
export const actions = {
  async fetchInitial({ commit }) {
    try {
      const response = await this.$axios.get('/rewards');
      const rewards = response.data.data;

      commit('SET', rewards);

      return response.data;
    } catch (error) {
      this.$toast.error(error.response.data.message);
    }
  },
  async fetch({ commit }, params) {
    try {
      const queryParams = {
        page: params.page,
      };

      if (params.sort) {
        queryParams.sort = params.sort;
      }
      if (params.search) {
        queryParams.query = `name:like:${params.search}`;
      }
      if (params.category) {
        queryParams.category = params.category;
      }

      const response = await this.$axios.get(this.$queryBuilder('/rewards', queryParams));
      const rewards = response.data.data;

      if (params.page > 1) {
        commit('PUSH', rewards);
      } else {
        commit('SET', rewards);
      }

      return response.data;
    } catch (error) {
      console.error(error);
      this.$toast.error(error.response.data.message);
    }
  },
};
