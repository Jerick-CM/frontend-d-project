import fixture from '~/fixtures/nominations';


export const FILTER_TYPES = {
  LATEST: 'created_at:desc',
  DATE: 'created_at:desc',
  BADGE: 'badge_name:asc',
  RECEIVED: 'received',
  SENT: 'sent',
};


/**
 * Vuex state structure.
 */
export const state = () => ({
  nominations: [],
  userNominations: [],
  filter: FILTER_TYPES.LATEST,
});

/**
 * Vuex Mutation methods.
 */
export const mutations = {
  SET(state, nominations) {
    state.nominations = nominations;
  },
  SET_USER_NOMINATIONS(state, nominations) {
    state.userNominations = nominations;
  },
  ADD(state, nomination) {
    state.nominations = state.nominations.concat(nomination);
  },
  ADD_USER_NOMINATIONS(state, nomination) {
    state.userNominations = state.userNominations.concat(nomination);
  },
  REMOVE(state, nominationID) {
    const idx = state.nominations.findIndex(i => i.id === nominationID);

    if (idx >= 0) {
      state.nominations.splice(idx, 1);
    }
  },
  CLEAR(state) {
    state.nominations = [];
    state.userNominations = [];
    state.filter = FILTER_TYPES.LATEST;
  },
  CLEAR_USER_NOMINATIONS(state) {
    state.userNominations = [];
  },
  CLEAR_NOMINATIONS(state) {
    state.nominations = [];
  },
  SET_FIXTURE(state) {
    state.nominations = fixture;
  },
  UPDATE_NOMINATION_LIKE(state, nominationID) {
    const nIdx = state.nominations.findIndex(n => n.id === nominationID);
    const uIdx = state.userNominations.findIndex(n => n.id === nominationID);

    if (nIdx >= 0) {
      const likeState = state.nominations[nIdx].is_liked_by_user;

      if (likeState) {
        state.nominations[nIdx].total_likes -= 1;
      } else {
        state.nominations[nIdx].total_likes += 1;
      }

      state.nominations[nIdx].is_liked_by_user = !likeState;
    }
    if (uIdx >= 0) {
      const likeState = state.userNominations[uIdx].is_liked_by_user;

      if (likeState) {
        state.userNominations[uIdx].total_likes -= 1;
      } else {
        state.userNominations[uIdx].total_likes += 1;
      }

      state.userNominations[uIdx].is_liked_by_user = !likeState;
    }
  },
  SET_FILTER(state, filter) {
    state.filter = filter;
  },
};

/**
 * Vuex Getter methods.
 */
export const getters = {
  GET(state) {
    return state.nominations;
  },
  GET_USER_NOMINATIONS(state) {
    return state.userNominations;
  },
  GET_FILTER_TYPE(state) {
    return state.filter;
  },
  IS_FILTER_TYPE_RECEIVED(state) {
    return state.filter === FILTER_TYPES.RECEIVED;
  },
};

/**
 * Vuex Action methods.
 */
export const actions = {
  /**
   * Fetch all nominations API
   *
   * @param  {Object} options.commit
   */
  async fetchAll({ commit }) {
    try {
      const req = await this.$axios.get('/nominations');
      const nominations = req.data.data;

      commit('SET', nominations);

      return nominations;
    } catch (error) {
      this.$toast.error(error.response.message);

      return error.response;
    }
  },
  /**
   * Fetch next page for nomination.
   *
   * @param  {Object} options.commit
   * @paraom {Object} payload
   */
  fetchNextPage({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
          .get(this.$queryBuilder('/nominations', payload))
          .then((res) => {
            const nominations = res.data.data;

            if (payload.page > 1) {
              commit('ADD', nominations);
            } else {
              commit('SET', nominations);
            }
              resolve(res.data.data);
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message);
            reject(error);
          });
    });
  },
  /**
   * Fetch user nomination API.
   *
   * @param  {Object} options.commit
   */
  async fetchUserNominations({ commit }) {
    try {
      const req = await this.$axios.get(this.$queryBuilder('/users/nominations', { sort: FILTER_TYPES.SENT }));
      const userNominations = req.data.data;

      commit('SET_USER_NOMINATIONS', userNominations);

      return userNominations;
    } catch (error) {
      this.$toast.error(error.response.message);

      return error.response;
    }
  },
  /**
   * Fetch nuext user page nomination API request.
   *
   * @param  {Object} options.commit
   * @param  {Object} payload
   */
  fetchNextUserPageNominations({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
          .get(this.$queryBuilder('/users/nominations', payload))
          .then((res) => {
            commit('ADD_USER_NOMINATIONS', res.data.data);
            resolve(res.data.data);
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message);
            reject(error);
          });
    });
  },
  /**
   * Send nomination API request.
   *
   * @param  {Object} options.commit
   * @param  {Object} payload
   */
  send({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
          .post('/nominations', payload)
          .then((res) => {
            commit('ADD', res.data);
            resolve(res);
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message);
            reject(error);
          });
    });
  },
  /**
   * Like nomination API request.
   *
   * @param  {Object} options.commit
   * @param  {Number} nominationID
   */
  async like({ commit }, nominationID) {
    try {
      const req = await this.$axios.post(`/nominations/${nominationID}/like`);

      commit('UPDATE_NOMINATION_LIKE', nominationID);

      return req.data;
    } catch (error) {
      this.$toast.error(error.response.message);

      return error.response;
    }
  },
};
