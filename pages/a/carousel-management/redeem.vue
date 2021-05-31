<template>
  <div id="carousel-management-page">
    <div class="container no-padding">
      <v-toolbar flat color="white">
        <v-toolbar-title>Redeem page carousel management</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-btn type="button" slot="activator" dark @click="close()">Add banner</v-btn>
          <v-card>
            <v-toolbar dark>
              <v-btn icon dark @click="close()">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  v-bind:loading="isSaving"
                  v-on:click="submit()"
                  dark
                  flat>Save</v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <v-card-text>
              <div class="preview" v-if="isEditMode">
                <p>Preview</p>
                <img :src="editedItem.file_url" :alt="editedItem.file" width="150" />
              </div>
              <span>{{ isEditMode ? 'Replace' : 'Add' }} banner</span> <input type="file" ref="photo" id="file" name="file" accept="image/*" />

              <v-text-field color="light-green lighten-1" v-model="editedItem.title" label="Title" required></v-text-field>

              <v-text-field color="light-green lighten-1" v-model="editedItem.action" label="URL" required></v-text-field>

              <v-checkbox v-model="editedItem.is_open_in_new_tab"
                          label="Open new tab"
                          :true-value="1"
                          :false-value="0"
                          color="green darken-1"></v-checkbox>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table :headers="table.headers"
                    :items="banners"
                    :loading="table.isLoading"
                    :pagination.sync="pagination"
                    :total-items="table.totalItems"
                    item-key="id"
                    class="table">
        <template slot="items" slot-scope="props">
          <td class="handle center-align" style="max-width: 28px;">::</td>
          <td :data-id="props.item.id">
            <h3>{{ props.item.order }}</h3>
          </td>
          <td>
            <img :src="props.item.file_url" :alt="props.item.file" width="100" />
          </td>
          <td>
            <h3>{{ props.item.title }}</h3>
          </td>
          <td>
            <strong>{{ props.item.action }}</strong>
          </td>
          <td>
            <v-tooltip top>
              <v-icon slot="activator" @click="editItem(props.item)">edit</v-icon>
              <span class="uppercase">Edit</span>
            </v-tooltip>
            <v-tooltip top>
              <v-icon slot="activator" @click="deleteItem(props.item.id)">delete</v-icon>
              <span class="uppercase">Delete</span>
            </v-tooltip>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </div>
  </div>
</template>


<script>
import Sortable from 'sortablejs';

import adminPage from '~/mixins/admin-page.js';


export default {
  mixins: [
    adminPage,
  ],
  mounted() {
    this.getDataFromApi()
        .then((res) => {
          this.banners = res.items;
          this.table.totalItems = res.totalItems;
          this.initializeSortable();
        });
  },
  data() {
    return {
      table: {
        headers: [
          { text: '', value: 'order', sortable: false },
          { text: 'Order', value: 'order', sortable: false },
          { text: 'Image', value: 'file', sortable: false },
          { text: 'Title', value: 'title', sortable: false },
          { text: 'URL', value: 'id', sortable: false },
          { text: 'Action', value: '', sortable: false },
        ],
        page: 1,
        totalItems: 0,
        isLoading: false,
      },
      pagination: {},

      banners: [],

      dialog: false,
      isEditMode: false,

      editedItem: {
        title: '',
        file_url: '',
        action: '',
        file: '',
        is_open_in_new_tab: 1,
      },
      defaultItem: {
        title: '',
        file_url: '',
        action: '',
        file: '',
        is_open_in_new_tab: 1,
      },
      requestTimeout: null,

      isSaving: false,
    };
  },
  methods: {
    initializeSortable() {
      const table = document.querySelector('.v-table tbody');
      const self = this;

      Sortable.create(table, {
        handle: '.handle',
        onEnd({ newIdx, oldIdx }) {
          const tableRows = document.querySelectorAll('.v-table tbody tr');
          const reorderedTable = Array.from(tableRows)
                                      .map((r, idx) => {
                                        if (r.childNodes[2]) {
                                          return {
                                            order: idx + 1,
                                            id: Number(r.childNodes[2].dataset.id),
                                          };
                                        }
                                      });

          // Update banners copy
          self.banners.forEach((b, idx) => {
            const data = reorderedTable.find(d => d.id === b.id);
            self.banners[idx].order = data.order;
          });

          // Update banners sort value thru API
          if (self.requestTimeout) {
            clearTimeout(self.requestTimeout);
          }

          self.requestTimeout = setTimeout(() => {
            self.$axios
                .post('/admin/banners/sort', { banners: reorderedTable })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  self.$toast.error(error.response.message);
                })
                .finally(() => {
                  self.requestTimeout = null;
                });
          }, 300);
        },
      });
    },
    submit() {
      if (!this.isEditMode) {
        this.create();
      } else {
        this.update();
      }
    },
    create() {
      let payload = new FormData();

      payload.append('title', this.editedItem.title);
      payload.append('action', this.editedItem.action);
      payload.append('is_open_in_new_tab', this.editedItem.is_open_in_new_tab);
      payload.append('photo', this.$refs.photo.files[0]);
      payload.append('type', 1);

      this.isSaving = true;
      this.$axios
          .post(`/admin/banners`, payload, {
            onUploadProgress: progressEvent => {
              console.log(progressEvent.loaded / progressEvent.total);
            }
          })
          .then(() => {
            this.$toast.success('Successfully added new banner.');
            this.getDataFromApi()
                .then((res) => {
                  this.banners = res.items;
                  this.table.totalItems = res.totalItems;
                });
            this.close();
          })
          .catch((error) => {
            this.$toast.error(error.response.data);
          })
          .finally(() => {
            this.isSaving = false;
          });
    },
    update() {
      let payload = new FormData();

      payload.append('title', this.editedItem.title);
      payload.append('action', this.editedItem.action);
      payload.append('is_open_in_new_tab', this.editedItem.is_open_in_new_tab);
      payload.append('_method', 'PUT');

      if (this.$refs.photo.files.length > 0) {
        payload.append('photo', this.$refs.photo.files[0]);
      }

      this.isSaving = true;
      this.$axios
          .post(`/admin/banners/${this.editedItem.id}`, payload, {
            onUploadProgress: progressEvent => {
              console.log(progressEvent.loaded / progressEvent.total);
            }
          })
          .then(() => {
            this.$toast.success('Successfully updated banner.');
            this.getDataFromApi()
                .then((res) => {
                  this.banners = res.items;
                  this.table.totalItems = res.totalItems;
                });
            this.close();
          })
          .catch((error) => {
            for (let k in error.response.data) {
              const errorType = error.response.data[k];

              errorType.forEach(e => {
                this.$toast.error(e);
              });
            }
          })
          .finally(() => {
            this.isSaving = false;
          });
    },
    deleteItem(itemID) {
      this.$axios
          .delete(`/admin/banners/${itemID}`)
          .then(() => {
            this.$toast.success('Banner successfully deleted.');
            this.getDataFromApi()
                .then((res) => {
                  this.banners = res.items;
                  this.table.totalItems = res.totalItems;
                });
          })
          .catch((error) => {
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
          type: 1,
        };

        if (rowsPerPage === -1) {
          payload.paginate = 0;
        } else {
          payload.rpp = (rowsPerPage) ? rowsPerPage : 5;
        }
        if (sortBy) {
          payload.sort = `${sortBy}:${ (descending) ? 'desc' : 'asc' }`;
        }

        this.$axios
            .get(this.$queryBuilder('/admin/banners', payload))
            .then(res => {
              let items = res.data.data;

              if (rowsPerPage === -1) {
                items = res.data;
              }

              items = items.sort((a, b) => {
                const sortA = a[sortBy];
                const sortB = b[sortBy];

                if (descending) {
                  if (sortA < sortB) return 1;
                  if (sortA > sortB) return -1;
                  return 0;
                } else {
                  if (sortA < sortB) return -1;
                  if (sortA > sortB) return 1;
                  return 0;
                }
              });

              resolve({
                items,
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
    close() {
      this.$refs.photo.value = '';
      this.editedItem = Object.assign({}, this.defaultItem);
      this.isEditMode = false;
      this.dialog = false;
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.isEditMode = true;
      this.dialog = true;
    },
  },
  watch: {
    pagination: {
      handler(val) {
        this.getDataFromApi()
            .then((res) => {
              this.banners = res.items;
              this.table.totalItems = res.totalItems;
            });
      },
      deep: true,
    },
  },
  computed: {
    formTitle() {
      return (!this.isEditMode) ? 'Add New Banner' : `Edit ${this.editedItem.title}`;
    },
  },
}
</script>


<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/carousel-management.scss";
</style>
