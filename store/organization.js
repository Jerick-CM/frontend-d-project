import fixture from '~/fixtures/organization';


/**
 * Vuex state structure.
 */
export const state = () => ({
  users: [],
});

/**
 * Vuex Mutation methods.
 */
export const mutations = {
  SET(state, users) {
    state.users = users;
  },
  ADD(state, receiver) {
    state.users.push(receiver);
  },
  REMOVE(state, receiverID) {
    const idx = state.users.findIndex(i => i.id === receiverID);

    if (idx >= 0) {
      state.users.splice(idx, 1);
    }
  },
  CLEAR(state) {
    state.user = [];
  },
  SET_FIXTURE(state) {
    state.users = fixture;
  },
};

/**
 * Vuex Getter methods.
 */
export const getters = {
  GET_EMPLOYEES(state) {
    return state.users;
  },
  GET_EMPLOYEE(state, employeeID) {
    const idx = state.users.filter(e => e.id === employeeID);

    if (idx >= 0) {
      return state.users[idx];
    }
    return null;
  },
};

/**
 * Vuex Action methods.
 */
export const actions = {
  async fetchUsers({ commit }) {
    try {
      const req = await this.$axios.get('/users?paginate=0');
      const users = req.data;

      commit('SET', users);
    } catch (error) {
      console.error(error);
      this.$toast.error(error.response.data.message);
    }
  },
};
