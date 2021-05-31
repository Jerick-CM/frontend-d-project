<template>
  <div id="user-levels-page" v-if="selected">
    <div class="container no-padding">
      <v-toolbar flat color="white">
        <v-toolbar-title>Departments</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-data-table
        v-bind:headers="table.headers"
        v-bind:items="departments"
        v-bind:search="search"
        v-bind:loading="table.isLoading"
        v-bind:pagination.sync="pagination"
        v-bind:total-items="table.totalItems"
        item-key="id">
        <template slot="items" slot-scope="props">
          <tr>
            <td>
              <h3>{{ props.item.name }}</h3>
            </td>
            <td>
              <v-text-field
                color="light-green lighten-1"
                v-model="props.item.short_name">
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
          v-on:click="doUpdate()"
          v-bind:loading="isSaving"
          v-bind:disabled="updateSelection.length === 0"
          dark>Save</v-btn>
        <v-btn
          v-bind:disabled="updateSelection.length === 0"
          v-on:click="resetSelection()"
          dark>Cancel</v-btn>
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
          this.departments = res.items;
          this.departmentsCopy = JSON.parse(JSON.stringify(res.items));
          this.table.totalItems = res.totalItems;
        });
  },
  data: () => ({
    // Vuetify Data table Docs
    // https://vuetifyjs.com/en/components/data-tables
    table: {
      headers: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Short name', value: 'short_name', sortable: false },
      ],
      page: 1,
      totalItems: 0,
      isLoading: false,
    },
    defaultItem: {
      name: '',
      short_name: '',
    },
    editedItem: {},
    pagination: {},

    departments: [],
    departmentsCopy: [],

    updateSelection: [],

    searchTimeOut: null,
    searchFilter: '',
    search: null,
    editedIndex: '',

    isSaving: false,
  }),
  methods: {
    doUpdate() {
      let requests = [];

      this.updateSelection.forEach((i) => {
        const payload = {
          short_name: i.short_name,
        };

        requests.push(
          this.$axios
              .put(`/admin/departments/${i.id}`, payload)
        );
      });

      this.isSaving = true;
      Promise
        .all(requests)
        .then(() => {
          this.isSaving = false;
          this.$toast.success('Successfully updated the department');
          this.getDataFromApi()
              .then((res) => {
                this.departments = res.items;
                this.departmentsCopy = JSON.parse(JSON.stringify(res.items));
                this.table.totalItems = res.totalItems;
                this.updateSelection = [];
              });
        })
        .catch((error) => {
          this.isSaving = false;
          for (let k in error.response.data) {
            const errorType = error.response.data[k];

            errorType.forEach(e => {
              this.$toast.error(e);
            });
          }
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
            .get(this.$queryBuilder('/departments', payload))
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
      this.departments = JSON.parse(JSON.stringify(this.departmentsCopy));
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
      for (let i = 0, length = this.departments.length; i < length; ++i) {
        const departmentID = this.departments[i].id;

        // Check if there are changes
        if (this.departmentsCopy[i].short_name !== this.departments[i].short_name) {
            this.addOrUpdateToSelection(this.departments[i]);
        } else if (this.isExistingOnSelection(departmentID)) {
          // If item is existing is on collection,
          // then check if there are changes on the value
          const exist = this.getFromSelection(departmentID);

          if (this.exist) {
            if (this.exist.short_name === this.departmentsCopy[i].short_name) {
              this.removeFromSelection(departmentID);
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
              this.departments = res.items;
              this.departmentsCopy = JSON.parse(JSON.stringify(res.items));
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
