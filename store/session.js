import fixture from '~/fixtures/user';

const STORAGE_KEY = {
  TOKEN: 'deloitte:token',
  USER: 'deloitte:user',
};


/**
 * Vuex state structure.
 *
 */
export const state = () => ({
  user: null,
  token: null,
  profile: {},
});

/**
 * Vuex Mutation methods.
 */
export const mutations = {
  SET_USER(state, user) {
    state.user = user;
    localStorage.setItem(STORAGE_KEY.USER, JSON.stringify(user));
  },
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem(STORAGE_KEY.TOKEN, token);
  },
  SET_PROFILE(state, profile) {
    state.profile = profile;
  },
  SET_FIXTURE(state) {
    state.user = fixture;
  },
  CHECK_AND_SET(state) {
    if (state.user === null) {
      const user = localStorage.getItem(STORAGE_KEY.USER);
      state.user = (user) ? JSON.parse(user) : null;
    }
    if (state.token === null) {
      state.token = localStorage.getItem(STORAGE_KEY.TOKEN);
    }
  },
  UPDATE_PROFILE_CREDITS(state, credits) {
    if (state.profile) {
      state.profile.credits = credits;
    }
  },
  UPDATE_PROFILE_TOKENS(state, black_token) {
    if (state.profile) {
      state.profile.black_token = black_token;
    }
  },
  DEDUCT_PROFILE_TOKENS(state, value) {
    if (state.profile) {
      state.profile.black_token = state.profile.black_token - value;
    }
  },
  CLEAR(state) {
    localStorage.clear();
    state.user = null;
    state.token = null;
    state.profile = {};
  },
};

/**
 * Vuex Getter methods.
 */
export const getters = {
  GET_USER(state) {
    return state.user;
  },
  GET_PROFILE(state) {
    return state.profile;
  },
  GET_TOKEN(state) {
    return state.token;
  },
  GET_USER_AVATAR(state) {
    if (state.profile && state.profile.avatar) {
      return state.profile.avatar;
    }
    return '/img/placeholders/user-placeholder.png';
  },
  IS_AUTHENTICATED(state) {
    return state.token !== null && state.user !== null;
  },
  IS_ADMIN(state) {
    if (state.token !== null && state.user !== null) {
      return state.profile.is_admin === 1;
    }
    return false;
  },
  HAS_PROFILE(state) {
    return Object.keys(state.profile).length === 0 && state.profile.constructor === Object;
  },
  IS_PARTNER(state) {
    if (state.profile) {
      return state.profile.is_partner === 1;
    }
    return false;
  },
};

/**
 * Vuex Action methods.
 */
export const actions = {
  async authenticate({ commit }, query) {
    try {
      const url = '/token/request';
      const response = await this.$axios.get(url, {
        params: query,
      });

      commit('SET_TOKEN', response.data.accessToken);
      commit('SET_USER', response.data.token);

      return response.data;
    } catch (error) {
      this.$toast.error(error);

      return error;
    }
  },
  logout() {
    return new Promise((resolve, reject) => {
      this.$axios
          .get('/logout')
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            this.$toast.error(error.response.message);
            reject(error);
          });
    });
  },
  async fetchUserProfile({ commit }) {
    try {
      const req = await this.$axios.get('/user');
      const profile = req.data;

      commit('SET_PROFILE', profile);

      return profile;
    } catch (error) {
      if (error.response.status === 401) {
        this.$toast.error('This account is disabled on the system.');
      } else {
        this.$toast.error(error.response.message);
      }

      return error.response.message;
    }
  },
};
