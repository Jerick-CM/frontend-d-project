export default {
  mounted() {
    this.getDataFromApi()
        .then((res) => {
          this.categories = res.items;
          this.table.totalItems = res.totalItems;
        });
  },
  methods: {
    onCategoryChange(categories) {
      categories.forEach((c, idx) => {
        if (typeof c === 'string') {
          this.addNewCategory(c, idx);
        }
      });
    },
    addNewCategory(category, idx) {
      this.isCategoryLoading = true;

      const payload = {
        name: category
      };

      this.$axios
          .post('/admin/categories', payload)
          .then((res) => {
            const newCategory = res.data;

            this.categories.push(newCategory);
            this.editedItem.categories[idx] = newCategory;
          })
          .finally(() => {
            this.isCategoryLoading = false;
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

        this.$axios
            .get(this.$queryBuilder('/admin/categories', payload))
            .then(res => {
              let items = res.data.data;

              if (rowsPerPage === -1) {
                items = res.data;
              }

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
    getItemPhoto(primaryPhoto) {
      return (primaryPhoto) ? primaryPhoto.file : '';
    },
    editItem(itemID) {
      this.editedIndex = this.categories.findIndex(d => d.id === itemID);
      this.editedItem = Object.assign({}, JSON.parse(JSON.stringify(this.categories[this.editedIndex])));
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.editedIndex = -1;
      this.resetForm();
    },
    resetForm() {
      this.editedItem = Object.assign({}, this.defaultItem);
    },
    create() {
      let payload = new FormData();

      payload.append('name', this.editedItem.name);

      this.$axios
          .post(`/admin/categories`, payload)
          .then(() => {
            this.$toast.success('New category added.');
            this.getDataFromApi()
                .then((res) => {
                  this.categories = res.items;
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
          });
    },
    async update() {
      let payload = new FormData();

      payload.append('name', this.editedItem.name);
      payload.append('_method', 'PUT');

      this.$axios
          .post(`/admin/categories/${this.editedItem.id}`, payload)
          .then(() => {
            this.$toast.success('Successfully updated category.');
            this.getDataFromApi()
                .then((res) => {
                  this.categories = res.items;
                  this.table.totalItems = res.totalItems;
                  this.close();
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
    deleteCategory(id) {
      let payload = new FormData();

      this.$axios
          .delete(`/admin/categories/${id}`)
          .then(() => {
            this.$toast.success('Successfully removed category.');
            this.getDataFromApi()
                .then((res) => {
                  this.categories = res.items;
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
    submit() {
      if (this.editedIndex === -1) {
        this.create();
      } else {
        this.update();
      }
    },
  },
  data() {
    return {
      table: {
        headers: [
          { text: 'Name', value: 'name', sortable: true },
          { text: 'Action', value: 'name', sortable: false },
        ],
        page: 1,
        totalItems: 0,
        isLoading: false,
      },
      pagination: {},

      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },

      categories: [],
    };
  },
  computed: {
    formTitle() {
      return (this.editedIndex === -1) ? 'Add new category' : `Edit ${this.editedItem.name}`;
    },
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi()
            .then((res) => {
              this.categories = res.items;
              this.table.totalItems = res.totalItems;
            });
      },
      deep: true,
    },
  },
}
