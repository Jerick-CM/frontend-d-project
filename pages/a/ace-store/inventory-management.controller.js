const fileDownload = require('js-file-download');
export default {

  mounted() {
    this.fetchItems();
    this.getDownloadableLogs().then((res) => {
      this.downloadableLogs = res.items;
      this.logsTable.totalItems = res.totalItems;
    });
    this.primaryPhotoDropzone = this.$refs.primaryPhotoDropzone;
    this.otherPhotoDropzone = this.$refs.otherPhotoDropzone;
  },
  methods: {

    downloadFile(log) {
      if (this.isDownloading) return;

      this.isDownloading = true;
      this.$axios
        .get(this.$queryBuilder("/admin/logs/download", { id: log.id }), {
          responseType: "blob",
        })
        .then((res) => {
          fileDownload(res.data, "inventory_" + Date.now() + ".csv");
        })
        .catch((err) => {
          if (err.response) {
            this.$toast.error(err.response.data.message);
          }
        })
        .finally(() => {
          this.isDownloading = false;
        });
    },
    getDownloadableLogs(noDateFilter = false) {
      this.logsTable.isLoading = true;
      return new Promise((resolve, reject) => {
        const {
          sortBy,
          descending,
          page,
          rowsPerPage,
        } = this.logsTablePagination;

        let payload = {
          page,
        };
        payload.query = 'type:Inventory Management';
        if (rowsPerPage === -1) {
          payload.paginate = 0;
        } else {
          payload.rpp = rowsPerPage ? rowsPerPage : 5;
        }
        if (sortBy) {
          payload.sort = `${sortBy}:${descending ? "desc" : "asc"}`;
        }
        let _self = this;
        this.$axios
          .get(this.$queryBuilder("/admin/logs/downloadables", payload))
          .then((res) => {
            let items = res.data.data;

            if (rowsPerPage === -1) {
              items = res.data;
            }
            resolve({
              items: items,
              totalItems: res.data.total,
            });
          })
          .catch((err) => {
            reject(err.response);
          })
          .finally(() => {
            this.logsTable.isLoading = false;
          });
      });
    },
    generateCsv() {
      if (this.isDownloading) return;
      this.isDownloading = true;
      this.$axios
        .get(`${this.currentDownloadExcelURL}&download=1`)
        .then((res) => {
          this.getDownloadableLogs().then((res) => {
            this.downloadableLogs = res.items;
            this.logsTable.totalItems = res.totalItems;
          });
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message);
        })
        .finally(() => {
          this.isDownloading = false;
        });
    },
    removeMeta(idx) {
      this.editedItem.meta.splice(idx, 1);
    },
    onCategoryChange(categories) {
      categories.forEach((c, idx) => {
        if (typeof c === "string") {
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
        .post("/admin/categories", payload)
        .then(res => {
          const newCategory = {
            ...res.data,
            deleted_at: null
          };

          this.categories.push(newCategory);
          this.editedItem.categories.pop();
          this.editedItem.categories.push(newCategory);
        })
        .finally(() => {
          this.isCategoryLoading = false;
        });
    },
    getCategories() {
      const payload = { paginate: 0 };

      this.$axios
        .get(this.$queryBuilder("/admin/categories", payload))
        .then(res => {
          this.categories = res.data;
        })
        .catch(error => {
          for (let k in error.response.data) {
            const errorType = error.response.data[k];

            errorType.forEach(e => {
              this.$toast.error(e);
            });
          }
        });
    },
    downloadExcel() {

      if (this.isDownloading) return;

      this.isDownloading = true;
      this.$axios
          .get(`${this.currentDownloadExcelURL}&download=1`, { responseType: 'blob' })
          .then((res) => {
             fileDownload(res.data, 'inventory.xlsx');
          })
          .catch((err) => {
            this.$toast.error(err.response.data.message);
          })
          .finally(() => {
            this.isDownloading = false;
          });
    },
    getDataFromApi() {
      this.table.isLoading = true;

      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;

        let payload = {
          page
        };

        if (rowsPerPage === -1) {
          payload.paginate = 0;
        } else {
          payload.rpp = rowsPerPage ? rowsPerPage : 5;
        }
        if (sortBy) {
          payload.sort = `${sortBy}:${descending ? "desc" : "asc"}`;
        }
        this.currentDownloadExcelURL = this.$queryBuilder('/admin/rewards', payload);
        this.$axios
          .get(this.$queryBuilder("/admin/rewards", payload))
          .then(res => {
            let items = res.data.data;

            if (rowsPerPage === -1) {
              items = res.data;
            }

            items.map(i => {
              return {
                ...i,
                isDeleting: false,
              }
            })

            resolve({
              items,
              totalItems: res.data.total,
            });
          })
          .catch(err => {
            reject(err.response);
          })
          .finally(() => {
            this.table.isLoading = false;
          });
      });
    },
    getItemPhoto(primaryPhoto) {
      return primaryPhoto ? primaryPhoto.file : "";
    },
    editItem(itemID) {
      this.editedIndex = this.rewards.findIndex(d => d.id === itemID);
      const item = Object.assign(
        {},
        JSON.parse(JSON.stringify(this.rewards[this.editedIndex]))
      );

      this.editedItem = Object.assign(
        { photo: "" },
        {
          ...item,
          // Sort inventory photos to primary photo first
          inventory_photos: item.inventory_photos
            // Sort by order value first
            .sort((a, b) => a.order - b.order)
        }
      );

      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.stockDialog = false;
      this.sortMode = false;
      this.editedItem.meta = null;
      this.editedIndex = -1;
      this.toDeletePhoto = [];
      this.categories = [];
      this.newPrimaryPhotoID = null;
      // this.$refs.primaryPhotoDropzone.removeAllFiles(true);
      this.$refs.otherPhotoDropzone.removeAllFiles(true);
      this.resetForm();
    },
    resetForm() {
      this.editedItem = Object.assign({}, this.defaultItem);

      if (this.$refs.photo) {
        this.$refs.photo.value = "";
      }
      if (this.$refs.otherPhoto) {
        this.$refs.otherPhoto.value = "";
      }
    },
    create() {
      let payload = new FormData();

      // const primaryPhoto = this.$refs.primaryPhotoDropzone.dropzone.files;
      const otherPhotos = this.$refs.otherPhotoDropzone.dropzone.files;

      otherPhotos.forEach((file, idx) => {
        payload.append(`photos[${idx}][file]`, file);
      });

      payload.append("name", this.editedItem.name);
      payload.append("description", this.editedItem.description);
      payload.append("short_desc", this.editedItem.short_desc);
      // payload.append('photo', primaryPhoto[0]);
      payload.append("unit_price", this.editedItem.unit_price);
      payload.append("is_visible", this.editedItem.is_visible);
      payload.append("is_preorder", this.editedItem.is_preorder);
      payload.append("stock", this.editedItem.stock);

      this.editedItem.categories.forEach((c, idx) => {
        payload.append(`categories[${idx}]`, c.id);
      });

      if (this.editedItem.meta) {
        this.editedItem.meta.forEach((m, idx) => {
          payload.append(`meta[${idx}][key]`, m.key);
          payload.append(`meta[${idx}][val]`, m.val);
        });
      }

      this.isSaving = true;
      this.$axios
        .post(`/admin/rewards`, payload)
        .then(() => {
          this.$toast.success("Item added to inventory.");
          this.fetchItems();
          this.close();
        })
        .catch(error => {
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
    async update() {
      let payload = new FormData();

      // const primaryPhoto = this.$refs.primaryPhotoDropzone.dropzone.files;

      payload.append("name", this.editedItem.name);
      payload.append("description", this.editedItem.description);
      payload.append("short_desc", this.editedItem.short_desc);
      payload.append("unit_price", this.editedItem.unit_price);
      payload.append("is_visible", this.editedItem.is_visible);
      payload.append("is_preorder", this.editedItem.is_preorder);
      payload.append("_method", "PUT");

      this.editedItem.categories.forEach((c, idx) => {
        payload.append(`categories[${idx}]`, c.id);
      });
      // if (primaryPhoto.length > 0) {
      //   payload.append('photo', primaryPhoto[0]);
      // }

      if (this.editedItem.meta) {
        this.editedItem.meta.forEach((m, idx) => {
          payload.append(`meta[${idx}][key]`, m.key);
          payload.append(`meta[${idx}][val]`, m.val);
        });
      }

      if (this.newPrimaryPhotoID !== null) {
        const photoID = this.newPrimaryPhotoID;
        const req = await this.$axios.post(
          `/admin/rewards/${this.editedItem.id}/photo/${photoID}/set-primary`,
          payload
        );
      }

      this.isSaving = true;

      if (this.toDeletePhoto.length > 0) {
        let promises = [];

        this.toDeletePhoto.forEach(photoID => {
          promises.push(
            this.$axios.delete(
              `/admin/rewards/${this.editedItem.id}/photo/${photoID}`
            )
          );
        });

        Promise
          .all(promises)
          .then(() => {
            this.isSaving = false;
            this.$axios
                .post(`/admin/rewards/${this.editedItem.id}`, payload)
                .then(() => {
                  this.$toast.success("Updated the item successfully.");
                  this.fetchItems(true);
                })
                .catch(error => {
                  this.$toast.error("An error has occured.");
                });
          })
          .catch(error => {
            this.isSaving = false;
            this.$toast.error("An error has occured.");
          });
      } else {
        this.$axios
          .post(`/admin/rewards/${this.editedItem.id}`, payload)
          .then(() => {
            this.fetchItems(true);
          })
          .catch(error => {
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
      }
    },
    uploadOtherPhotos() {
      const otherPhotos = this.$refs.otherPhotoDropzone.dropzone.files;

      if (otherPhotos.length === 0) return;

      let payload = new FormData();

      otherPhotos.forEach((file, idx) => {
        payload.append(`photos[${idx}][file]`, file);
      });

      // payload.append('photo', otherPhotos[0]);

      this.$axios
        .post(`/admin/rewards/${this.editedItem.id}/photo`, payload)
        .then(() => {
          this.getDataFromApi().then(res => {
            this.rewards = res.items;
            this.table.totalItems = res.totalItems;
          });
          this.close();
        })
        .catch(error => {
          for (let k in error.response.data) {
            const errorType = error.response.data[k];

            errorType.forEach(e => {
              this.$toast.error(e);
            });
          }
        });
    },
    deleteOtherPhoto(photoID, idx) {
      this.toDeletePhoto.push(photoID);
      this.editedItem.inventory_photos.splice(idx, 1);
    },
    setPrimaryPhoto(photoID, idx) {
      this.newPrimaryPhotoID = photoID;

      for (
        let i = 0, limit = this.editedItem.inventory_photos.length;
        i < limit;
        ++i
      ) {
        if (this.editedItem.inventory_photos[i].id !== photoID) {
          this.editedItem.inventory_photos[i].is_primary = 0;
        } else {
          this.editedItem.inventory_photos[i].is_primary = 1;
        }
      }
    },
    async updateSort() {
      const sortPayload = {
        photos: this.editedItem.inventory_photos.map((photo, idx) => {
          return {
            id: photo.id,
            order: idx + 1
          };
        })
      };

      // let payload = new FormData();

      // payload.append('_method', 'PUT');

      // const newPrimaryPhotoID = sortPayload.photos[0].id;

      // const r1 = await this.$axios
      //                      .post(`/admin/rewards/${this.editedItem.id}/photo/${newPrimaryPhotoID}/set-primary`, payload);
      this.isSaving = true;

      const r2 = await this.$axios.post(
        `/admin/rewards/${this.editedItem.id}/photo/sort`,
        sortPayload
      );

      this.isSaving = false;

      if (r2) {
        this.update();
      } else {
        this.$toast.error("An error has occured");
      }
    },
    submit() {
      if (this.editedIndex === -1) {
        this.create();
      } else {
        this.updateSort();
        this.uploadOtherPhotos();
      }
    },
    async deleteItem(itemID) {
      const confirmPopupOpts = {
        title: 'Delete confirmation',
        buttonTrueText: 'Confirm delete',
        buttonFalseText: 'Cancel',
        buttonFalseColor: 'red',
        buttonTrueColor: 'light-green lighten-1',
        color: 'black',
        icon: '',
      };

      let isConfirm = await this.$confirm('<div class="center">You are about to delete an item!<br>Click on "Confirm delete" to proceed.</div>', confirmPopupOpts);

      if (isConfirm) {
        this.table.isLoading = true;

        const idx = this.rewards.findIndex(d => d.id === itemID);

        this.rewards[idx].isDeleting = true;
        this.$axios
            .delete(`/admin/rewards/${itemID}`)
            .then(() => {
              this.$toast.success('Item successfully deleted.')
              this.fetchItems()
            })
            .catch((err) => {
              if (err.response) {
                this.$toast.error(err.response.message);
              } else {
                this.$toast.error(err);
              }
            })
            .finally(() => {
              this.rewards[idx].isDeleting = false;
            });
      }
    },
    editStock(itemID, isEditStockModeCredit) {
      this.editStockModeCredit = isEditStockModeCredit;
      this.editStockIndex = this.rewards.findIndex(d => d.id === itemID);
      this.editStockItem = Object.assign({}, this.rewards[this.editStockIndex]);
      this.stockDialog = true;
      setTimeout(() => {
        this.$refs.txtEditStock.focus();
      }, 100);
    },
    closeStockDialog() {
      this.dialog = false;
      this.stockDialog = false;
      this.editStockAmount = null;

      setTimeout(() => {
        this.editStockItem = Object.assign(
          {},
          {
            amount: 0
          }
        );
        this.editStockIndex = -1;
      }, 300);
    },
    submitEditStock() {
      if (this.editStockModeCredit) {
        this.credit();
      } else {
        this.debit();
      }
    },
    credit() {
      this.$axios
        .put(`/admin/rewards/${this.editStockItem.id}/credit`, {
          amount: this.editStockAmount ? this.editStockAmount : 0
        })
        .then(res => {
          this.editStockAmount = null;
          this.editStockIndex = -1;
          this.$toast.success("Item stock updated.");
          this.stockDialog = false;
          this.getDataFromApi().then(res => {
            this.rewards = res.items;
            this.table.totalItems = res.totalItems;
          });
        })
        .catch(err => {
          this.$toast.error(err.response.data);
        });
    },
    debit() {
      this.$axios
        .put(`/admin/rewards/${this.editStockItem.id}/debit`, {
          amount: this.editStockAmount ? this.editStockAmount : 0
        })
        .then(res => {
          this.editStockAmount = null;
          this.editStockIndex = -1;
          this.$toast.success("Item stock updated.");
          this.stockDialog = false;
          this.fetchItems();
        })
        .catch(err => {
          this.$toast.error(err.response.data);
        });
    },
    onFileChange(event) {
      this.editedItem.photo = event.target.files[0];
    },
    addItemMeta() {
      if (!this.editedItem.meta) {
        this.editedItem.meta = [{ key: "", val: "" }];
      } else {
        this.editedItem.meta.push({ key: "", val: "" });
      }
    },
    fetchItems(shouldClose = false) {
      this.getDataFromApi().then(res => {
        this.rewards = res.items;
        this.table.totalItems = res.totalItems;

        if (shouldClose) {
          this.close();
        }
      });
    },
  },
  data() {
    return {
      downloadableLogs: [],
      logsTable: {
        headers: [
          { text: "Date Generated", value: "created_at", sortable: true },
          { text: "Status", value: "status", sortable: true },
          { text: "", value: "", sortable: false },
        ],
        page: 1,
        totalItems: 0,
        isLoading: false,
      },
      logsTablePagination: {
        sortBy: "created_at",
        descending: true,
      },
      table: {
        headers: [
          { text: "Preview image", value: "photo", sortable: false },
          { text: "Product name", value: "name", sortable: true },
          // { text: 'Category', value: 'category', sortable: true },
          { text: "Updated", value: "updated_at", sortable: true },
          { text: "Quantity", value: "stock", sortable: true },
          { text: "Item value", value: "unit_price", sortable: true },
          { text: "Action", value: "name", sortable: false }
        ],
        page: 1,
        totalItems: 0,
        isLoading: false
      },
      pagination: {},

      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        primary_photo: "",
        description: "",
        short_desc: "",
        unit_price: 0,
        stock: 0,
        is_visible: 1,
        is_preorder: 0,
        photo: "",
        meta: [],
        categories: []
      },
      defaultItem: {
        name: "",
        description: "",
        short_desc: "",
        primary_photo: "",
        unit_price: 0,
        stock: 0,
        is_visible: 1,
        is_preorder: 0,
        photo: "",
        meta: [],
        inventory_photos: [],
        categories: []
      },
      stockDialog: false,
      editStockAmount: null,
      editStockModeCredit: null,
      editStockIndex: -1,
      editStockItem: {
        name: "",
        unit_price: 0,
        stock: 0,
        is_visible: 0,
        is_preorder: 0
      },

      rewards: [],
      categories: [],
      isCategoryLoading: false,

      primaryPhotoDropzone: null,
      otherPhotoDropzone: null,
      dropzoneOpts: {
        primaryOptions: {
          url: "/",
          acceptedFiles: "image/*",
          uploadMultiple: false,
          addRemoveLinks: true,
          parallelUploads: 1,
          maxFiles: 1
        },
        otherOptions: {
          url: "/",
          acceptedFiles: "image/*",
          uploadMultiple: true,
          addRemoveLinks: true
        },
        destroyDropzone: true,
        duplicateCheck: true
      },

      sortMode: false,
      drag: false,

      toDeletePhoto: [],
      newPrimaryPhotoID: null,

      isSaving: false,

      currentDownloadExcelURL: '',
      isDownloading: false,
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Add new item"
        : `Edit ${this.editedItem.name}`;
    },
    stockFormTitle() {
      return this.editStockModeCredit ? "Add Stock" : "Reduce Stock";
    }
  },
  watch: {
    logsTablePagination: {
      handler(val) {
        let _self = this;
        this.getDownloadableLogs().then((res) => {
          this.downloadableLogs = res.items;
          this.logsTable.totalItems = res.totalItems;
        });
      },
      deep: true,
    },
    pagination: {
      handler() {
        this.fetchItems();
      },
      deep: true
    },
    dialog() {
      if (this.dialog) {
        this.getCategories();
      }
    }
  }
};
