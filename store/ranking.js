import fixtures from '~/fixtures/ranking';


/**
 * Vuex state structure.
 */
export const state = () => ({
  tiers: [],
  prospects: [],
});

/**
 * Vuex Mutation methods.
 */
export const mutations = {
  CLEAR(state) {
    state.tiers = [];
    state.prospects = [];
  },
  SET_FIXTURE(state) {
    state.tiers = fixtures.tiers;
    state.prospects = fixtures.prospects;
  },
};

/**
 * Vuex Getter methods.
 */
export const getters = {
  GET_TIERS(state) {
    return state.tiers;
  },
  GET_PROSPECTS(state) {
    return state.prospects;
  },
};

/**
 * Vuex Action methods.
 */
export const actions = {};
