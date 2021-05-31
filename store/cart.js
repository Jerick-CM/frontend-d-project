/**
 * Vuex state structure.
 */
export const state = () => ({
  items: [],
});

/**
 * Vuex Mutation methods.
 */
export const mutations = {
  ADD(state, item) {
    state.items.push(item);
  },
  SET(state, items) {
    state.items = items;
  },
  REMOVE(state, itemID) {
    const idx = state.items.findIndex(i => i.id === itemID);

    if (idx >= 0) {
      state.items.splice(idx, 1);
    }
  },
  CLEAR(state) {
    state.items = [];
  },
  UPDATE_ITEM(state, params) {
    const idx = state.items.findIndex(i => i.id === params.itemID);

    if (idx >= 0) {
      state.items[idx].quantity = params.quantity;
    }
  },
};

/**
 * Vuex Getter methods.
 */
export const getters = {
  GET_ITEMS(state) {
    return state.items;
  },
  GET_ITEM_COUNT(state) {
    return state.items.length;
  },
  GET_TOTAL_COST(state) {
    return state.items
                .reduce((acc, cur) => acc + (cur.unit_price * cur.quantity), 0);
  },
};

/**
 * Vuex Action methods.
 */
export const actions = {
  addItem({ commit }, item) {
    return new Promise((resolve, reject) => {
      const payload = {
        id: item.id,
        quantity: 1,
      };

      this.$axios
          .post('/cart', payload)
          .then((response) => {
            commit('ADD', {
              ...response.data.inventory,
              quantity: payload.quantity,
            });
            resolve(response.data);
          })
          .catch((err) => {
            reject(err)
          });
    });
  },
  async fetch({ commit }) {
    try {
      const response = await this.$axios.get('/cart');
      const data = response.data;
      const items = data.map(d => {
        return {
          ...d.inventory,
          quantity: d.quantity,
        };
      });

      commit('SET', items);

      return items;
    } catch (error) {
      console.error(error);
      this.$toast.error(error.response.data.message);
    }
  },
  async checkout({ commit }) {
    try {
      const response = await this.$axios.get('/cart/checkout');

      this.$toast.success('Items successfully checked out.');

      commit('CLEAR');

      return response.data;
    } catch (error) {
      error.response.data.forEach((message) => {
        this.$toast.error(message);
      });
    }
  },
  async updateItem({ commit }, params) {
    try {
      const payload = {
        quantity: params.quantity,
      };
      const response = await this.$axios.put(`/cart/${ params.itemID }`, payload);

      return response.data;
    } catch (error) {
      error.response.data.forEach((message) => {
        this.$toast.error(message);
      });
    }
  },
  async deleteItem({ commit }, itemID) {
    try {
      const response = await this.$axios.delete(`/cart/${ itemID }`);

      return response.data;
    } catch (error) {
      error.response.data.forEach((message) => {
        this.$toast.error(message);
      });
    }
  }
};
