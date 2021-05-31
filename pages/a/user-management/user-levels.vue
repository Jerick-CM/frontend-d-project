<template>
  <div id="user-levels-page" v-if="selected">
    <div class="container no-padding">
      <v-toolbar flat color="white">
        <v-toolbar-title>User levels</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table :headers="table.headers"
                    :items="positions"
                    :search="search"
                    :loading="table.isLoading"
                    :pagination.sync="pagination"
                    :total-items="table.totalItems"
                    item-key="id">
        <template slot="items" slot-scope="props">
          <tr>
            <td>
              <h3>{{ props.item.career_level }}</h3>
            </td>
            <td>
              <h3>{{ props.item.head_count }}</h3>
            </td>
            <td>
              <v-text-field color="light-green lighten-1"
                            v-model="props.item.monthly_token_allocation"
                            type="number"
                            min="0">
              </v-text-field>
            </td>
            <td>
              <v-text-field color="light-green lighten-1"
                            v-model="props.item.max_token_send_to_same_user"
                            type="number"
                            min="0">
              </v-text-field>
            </td>
          </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>

      <div class="controls m-lg-vertical right">
        <v-btn
          v-bind:disabled="updateSelection.length === 0"
          v-bind:loading="isSaving"
          v-on:click="doUpdate()"
          dark>Save</v-btn>
        <v-btn dark :disabled="updateSelection.length === 0" @click="resetSelection()">Cancel</v-btn>
      </div>
    </div>
  </div>
</template>


<script>
import adminPage from '~/mixins/admin-page.js';


export default {
  mixins: [
    adminPage
  ],
  mounted() {
    this.getDataFromApi()
        .then((res) => {
          this.positions = res.items;
          this.positionsCopy = JSON.parse(JSON.stringify(res.items));
          this.table.totalItems = res.totalItems;
        });
  },
  data() {
    return {
      // Vuetify Data table Docs
      // https://vuetifyjs.com/en/components/data-tables
      table: {
        headers: [
          { text: 'Career level', value: 'career_level', sortable: true },
          { text: 'Head count', value: 'head_count', sortable: false },
          { text: 'Quarterly token allowance', value: 'monthly_token_allocation', sortable: true },
          { text: 'Maximum send token limit', value: 'max_token_send_to_same_user', sortable: true },
        ],
        page: 1,
        totalItems: 0,
        isLoading: false,
      },
      pagination: {},

      positions: [],
      positionsCopy: [],

      updateSelection: [],

      searchTimeOut: null,
      searchFilter: '',
      search: null,
      dialog: false,

      isSaving: false,
    };
  },
  methods: {
    close() {
      this.dialog = false;
    },
    doUpdate() {
      let requests = []

      this.updateSelection.forEach((i) => {
        const payload = {
          monthly_token_allocation: i.monthly_token_allocation,
          max_token_send_to_same_user: i.max_token_send_to_same_user,
        };

        requests.push(
          this.$axios.put(`/admin/user-levels/${i.id}`, payload)
        );
      });

      this.isSaving = true;

      Promise
        .all(requests)
        .then((response) => {
          this.isSaving = false;
          this.$toast.success('User levels has been successfully been updated.');
          this.positionsCopy = JSON.parse(JSON.stringify(this.positions));
          this.updateSelection = [];
        })
        .catch(() => {
          this.isSaving = false;
        });
    },
    getDataFromApi() {
      this.table.isLoading = true;

      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;

        let payload = {
          page,
        };

        if (rowsPerPage === -1) {
          payload.paginate = 0;
        } else {
          payload.rpp = (rowsPerPage) ? rowsPerPage : 5;
        }
        if (sortBy) {
          payload.sort = `${sortBy}:${ (descending) ? 'desc' : 'asc' }`;
        }
        if (this.search) {
          payload.search = this.search
        }

        this.$axios
            .get(this.$queryBuilder('/admin/user-levels', payload))
            .then(res => {
              let items = res.data.data;

              if (rowsPerPage === -1) {
                items = res.data;
              }

              resolve({
                items: items.map(i => {
                  return {
                    ...i,
                  };
                }),
                totalItems: res.data.total,
              });
            })
            .catch((err) => {
              reject(err.response);
            })
            .finally(() => {
              this.table.isLoading = false;
            });
      });
    },
    resetSelection() {
      this.positions = JSON.parse(JSON.stringify(this.positionsCopy));
      this.updateSelection = [];
    },
    isExistingOnSelection(id) {
      return this.updateSelection.findIndex(u => u.id === id) !== -1;
    },
    addOrUpdateToSelection(item) {
      if (this.isExistingOnSelection(item.id)) {
        const idx = this.updateSelection.findIndex(u => u.id === item.id);

        this.updateSelection[idx] = Object.assign({}, item);
      } else {
        this.updateSelection.push(item);
      }
    },
    removeFromSelection(id) {
      const idx = this.updateSelection.findIndex(u => u.id === id);

      if (idx >= 0) {
        this.updateSelection.splice(idx, 1);
      }
    },
    getFromSelection(id) {
      return this.updateSelection.find(u => u.id === id);
    },
  },
  computed: {
    selected() {
      for (let i = 0, length = this.positions.length; i < length; ++i) {
        const positionID = this.positions[i].id;

        // Check if there are changes
        if (this.positionsCopy[i].monthly_token_allocation !== this.positions[i].monthly_token_allocation ||
            this.positionsCopy[i].max_token_send_to_same_user !== this.positions[i].max_token_send_to_same_user) {
            this.addOrUpdateToSelection(this.positions[i]);
        } else if (this.isExistingOnSelection(positionID)) {
          // If item is existing is on collection,
          // then check if there are changes on the value
          const exist = this.getFromSelection(positionID);

          if (this.exist) {
            if (this.exist.monthly_token_allocation === this.positionsCopy[i].monthly_token_allocation &&
                this.exist.max_token_send_to_same_user === this.positionsCopy[i].max_token_send_to_same_user) {
              this.removeFromSelection(positionID);
            }
          }
        }
      }

      return true;
    },
  },
  watch: {
    pagination: {
      handler(val) {
        this.getDataFromApi()
            .then((res) => {
              this.positions = res.items;
              this.positionsCopy = JSON.parse(JSON.stringify(res.items));
              this.table.totalItems = res.totalItems;
            });
      },
      deep: true,
    },
    searchFilter(val) {
      if (this.searchTimeOut) {
        clearTimeout(this.searchTimeOut);
      }

      this.searchTimeOut = setTimeout(() => {
        if (this.searchFilter.length >= 3) {
          this.search = this.searchFilter;
        } else {
          this.search = null;
        }
      }, 300);
    },
  },
};
</script>
