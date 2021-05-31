<template>
  <div id="model-page">
    <div class="container no-padding">
      <v-toolbar flat color="white">
        <v-toolbar-title>EDM Templates</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="uploadDialog" max-width="500px" width="500px">
          <v-btn
            type="button"
            slot="activator"
            dark
            @click="closeUploadDialog()"
            >Upload Template</v-btn
          >

          <v-card>
            <v-card-title>
              <h3>Upload template</h3>
            </v-card-title>

            <v-form>
              <v-card-text>
                <span>Select .html file</span>
                <br />
                <input type="file" ref="file" id="file" name="file" required />
                <br />
                <br />
                <v-select
                  v-model="filterSelected"
                  v-bind:items="filterItems"
                  label="Template type"
                  item-text="text"
                  item-value="value"
                  required
                  solo
                ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="button" dark @click="closeUploadDialog()"
                  >Close</v-btn
                >
                <v-btn
                  v-bind:loading="isUploading"
                  v-on:click="upload()"
                  type="button"
                  dark
                  >Upload</v-btn
                >&nbsp;
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-data-table
        v-bind:headers="table.headers"
        v-bind:items="edms"
        v-bind:loading="table.isLoading"
        v-bind:pagination.sync="pagination"
        :items-per-page="10"
        v-bind:total-items="table.totalItems"
        item-key="id"
      >
        <template slot="items" slot-scope="props">
          <td>
            <h3>{{ props.item.edm_id }}</h3>
          </td>
          <td>
            <h3>{{ props.item.edm.name }}</h3>
          </td>
        </template>
      </v-data-table>

      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark>
            <v-btn icon dark @click="close()">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Preview</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div class="container--flex">
              <div class="flex-3" style="border: 2px solid #eee">
                <p class="center" v-if="isFetching">
                  <v-progress-circular
                    indeterminate
                    color="green"
                  ></v-progress-circular
                  >Fetching content...
                </p>
                <div v-html="previewTemplate" v-else></div>
                <p v-if="!isFetching && !previewTemplate">No template set.</p>
              </div>
              <div class="flex-2" style="padding: 0 16px">
                <v-card>
                  <v-card-title>
                    <h4>Test preview</h4>
                  </v-card-title>
                  <v-card-text style="padding-top: 0 !important">
                    <v-autocomplete
                      v-model="testForm.user_id"
                      v-bind:items="users"
                      v-bind:filter="searchUserFilter"
                      color="light-green lighten-1"
                      item-text="name"
                      item-value="id"
                      label="Sender"
                      v-if="selectedEDMID === TEMPLATE_TYPE.MESSAGE_RECEIVE"
                    ></v-autocomplete>
                    <v-autocomplete
                      v-model="testForm.user_id"
                      v-bind:items="users"
                      v-bind:filter="searchUserFilter"
                      color="light-green lighten-1"
                      item-text="name"
                      item-value="id"
                      label="Receiver"
                      v-if="selectedEDMID === TEMPLATE_TYPE.MESSAGE_SEND"
                    ></v-autocomplete>
                    <v-autocomplete
                      v-model="testForm.badge_id"
                      v-bind:items="badges"
                      v-bind:filter="searchBadgeFilter"
                      color="light-green lighten-1"
                      item-text="title"
                      item-value="id"
                      label="Badge"
                      v-if="selectedEDMID !== TEMPLATE_TYPE.REDEMPTION"
                    ></v-autocomplete>
                    <v-text-field
                      v-model="testForm.token"
                      label="Token"
                      type="number"
                      required
                      min="0"
                      placeholder="0"
                      color="light-green lighten-1"
                      v-if="selectedEDMID !== TEMPLATE_TYPE.REDEMPTION"
                    ></v-text-field>
                    <v-textarea
                      v-model="testForm.message"
                      color="light-green lighten-1"
                      label="Message"
                      v-if="selectedEDMID !== TEMPLATE_TYPE.REDEMPTION"
                    ></v-textarea>

                    <div
                      class="cart-items"
                      v-if="selectedEDMID === TEMPLATE_TYPE.REDEMPTION"
                    >
                      <v-list subheader three-line>
                        <v-subheader class="p-0-horizontal"
                          >Cart Items</v-subheader
                        >

                        <v-list-tile class="p-0-horizontal" no-action>
                          <v-list-tile-content>
                            <div class="container--flex" style="width: 100%">
                              <div class="flex-3 pt-0 pb-0">
                                <strong>Name</strong>
                              </div>
                              <div class="flex-1 pt-0 pb-0">
                                <strong>Quantity</strong>
                              </div>
                              <div class="flex-1 pt-0 pb-0">
                                <strong>Action</strong>
                              </div>
                            </div>
                          </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile
                          class="p-0-horizontal"
                          no-action
                          v-if="testForm.items.length === 0"
                        >
                          <v-list-tile-content>
                            <div class="container--flex" style="width: 100%">
                              <div class="center flex-3 pt-0 pb-0">
                                Cart it empty
                              </div>
                            </div>
                          </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile
                          class="p-0-horizontal"
                          v-for="(i, idx) in testForm.items"
                          :key="idx"
                          no-action
                        >
                          <v-list-tile-content>
                            <div
                              class="container--flex container--flex-align-item-center"
                              style="width: 100%"
                            >
                              <div class="flex-3 pt-0">{{ i.name }}</div>
                              <div class="flex-1 pt-0">{{ i.quantity }}</div>
                              <div class="flex-1 pt-0">
                                <v-btn @click.prevent="removeItem(idx)" icon>
                                  <v-icon>remove_circle_outline</v-icon>
                                </v-btn>
                              </div>
                            </div>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>

                      <!-- Add Item -->
                      <div
                        class="add-item container--flex"
                        style="border-top: 1px solid #eee; padding-top: 10px"
                      >
                        <v-autocomplete
                          v-model="testForm.newItem.item"
                          :items="items"
                          :filter="searchItemFilter"
                          color="light-green lighten-1"
                          item-text="name"
                          label="Add item"
                          class="flex-3 pl-0"
                          return-object
                        ></v-autocomplete>
                        <v-text-field
                          v-model="testForm.newItem.quantity"
                          label="Quantity"
                          type="number"
                          required
                          min="0"
                          placeholder="0"
                          color="light-green lighten-1"
                          class="flex-1"
                        ></v-text-field>
                        <v-btn @click.prevent="addItem()" icon>
                          <v-icon>add_circle_outline</v-icon>
                        </v-btn>
                      </div>
                    </div>

                    <v-combobox
                      v-model="testForm.emails"
                      label="Send test emails"
                      color="light-green lighten-1"
                      multiple
                      small-chips
                    >
                      <template slot="no-data">
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>
                              Press
                              <kbd>enter</kbd> to add.
                            </v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </template>
                    </v-combobox>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click.prevent="updatePreview()" dark
                      >Update preview</v-btn
                    >
                    <v-btn @click.prevent="sendPreview()" dark
                      >Send test email</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="sendDialog" max-width="500px" width="500px">
        <v-card>
          <v-card-title>
            <h3>Send test email</h3>
          </v-card-title>
          <form @submit.prevent="sendTestEmail">
            <v-card-text>
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                color="light-green lighten-1"
                ref="txtEmail"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark @click="close()">Close</v-btn>
              <v-btn dark type="submit">Send</v-btn>&nbsp;
            </v-card-actions>
          </form>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import $ from "jquery";

import adminPage from "~/mixins/admin-page.js";

const TEMPLATE_TYPE = {
  MESSAGE_SEND: 1,
  MESSAGE_RECEIVE: 2,
  REDEMPTION: 3,
  WELCOME: 4,
  TOKEN_SEND: 5,
  TOKEN_RECEIVE: 6,
  MONTHLY_SUMMARY: 7,
};

export default {
  mixins: [adminPage],
  mounted() {
    this.getDataFromApi().then((res) => {
      this.edms = res.items;
      this.table.totalItems = res.totalItems;
    });
  },
  computed: {
    ...mapGetters({
      badges: "badges/GET",
      sessionToken: "session/GET_TOKEN",
    }),
  },
  data() {
    return {
      // Constants
      TEMPLATE_TYPE,

      // Component data
      table: {
        headers: [
          { text: "EDM ID", value: "edm_id", sortable: true },
          { text: "Template type", value: "edm_name", sortable: true },
          // { text: 'Action', value: 'id', sortable: false },
        ],
        page: 1,
        totalItems: 0,
        isLoading: false,
      },
      pagination: {},

      edms: [],
      users: [],
      items: [],

      filterItems: [
        { text: "Message send", value: TEMPLATE_TYPE.MESSAGE_SEND },
        { text: "Message send token", value: TEMPLATE_TYPE.TOKEN_SEND },
        { text: "Message received", value: TEMPLATE_TYPE.MESSAGE_RECEIVE },
        { text: "Message received token", value: TEMPLATE_TYPE.TOKEN_RECEIVE },
        { text: "Monthly summary", value: TEMPLATE_TYPE.MONTHLY_SUMMARY },
        { text: "Redemption", value: TEMPLATE_TYPE.REDEMPTION },
        { text: "Welcome", value: TEMPLATE_TYPE.WELCOME },
      ],

      filterSelected: null,

      dialog: false,
      sendDialog: false,
      uploadDialog: false,
      previewTemplate: "",
      isFetching: false,

      selectedEDMID: -1,
      email: "",

      isUserFetching: false,

      testForm: {
        user_id: 0,
        message: "",
        email: "",
        badge_id: 0,
        token: null,
        isItemActive: false,
        items: [],
        newItem: {
          item: null,
          quantity: 1,
        },
      },

      isUploading: false,
    };
  },
  methods: {
    getDataFromApi() {
      this.table.isLoading = true;

      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        console.log(rowsPerPage);
        let payload = {
          page,
        };

        if (rowsPerPage === -1) {
          payload.paginate = 0;
        } else {
          payload.rpp = rowsPerPage ? rowsPerPage : 10;
          // payload.rpp = 10;
        }
        if (sortBy) {
          payload.sort = `${sortBy}:${descending ? "desc" : "asc"}`;
        }

        this.$axios
          .get(this.$queryBuilder("/admin/edm", payload))
          .then((res) => {
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
    addItem() {
      if (
        this.testForm.newItem.item !== null &&
        this.testForm.newItem.quantity > 0
      ) {
        const newItem = {
          inventory_id: this.testForm.newItem.item.id,
          name: this.testForm.newItem.item.name,
          quantity: this.testForm.newItem.quantity,
        };

        this.testForm.items.push(newItem);

        // Reset new item
        this.testForm.newItem.item = null;
        this.testForm.newItem.quantity = 1;
      } else {
        this.$toast.error("Please enter an item and/or quantity.");
      }
    },
    removeItem(idx) {
      this.testForm.items.splice(idx, 1);
    },
    fetchUsers() {
      const payload = {
        paginate: 0,
      };

      this.$axios
        .get(this.$queryBuilder("/admin/users", payload))
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          reject(err.response);
        });
    },
    fetchItems() {
      const payload = {
        paginate: 0,
      };

      this.$axios
        .get(this.$queryBuilder("/admin/rewards", payload))
        .then((res) => {
          this.items = res.data;
        })
        .catch((err) => {
          reject(err.response);
        });
    },
    preview(edmID) {
      this.isFetching = true;
      this.dialog = true;
      this.selectedEDMID = edmID;

      this.$axios
        .post(`/admin/edm/${edmID}`)
        .then((res) => {
          this.previewTemplate = res.data;
        })
        .catch((err) => {
          this.$toast.error(err.response.message);
        })
        .finally(() => {
          this.isFetching = false;
        });

      this.fetchUsers();
      this.fetchItems();
      this.$store.commit("badges/SET_FIXTURE");
    },
    hasMissingData() {
      let errors = [];

      if (this.selectedEDMID !== TEMPLATE_TYPE.REDEMPTION) {
        if (!this.testForm.user_id) {
          errors.push("Please select a user");
        }
        if (!this.testForm.badge_id) {
          errors.push("Please select a badge");
        }
        if (!this.testForm.message) {
          errors.push("Please enter a message");
        }
      } else {
        if (this.testForm.items.length === 0) {
          errors.push("Please add an item");
        }
      }

      errors.forEach((e) => {
        this.$toast.error(e);
      });

      if (errors.length > 0) {
        return true;
      }
      return false;
    },
    updatePreview() {
      if (this.hasMissingData()) return;

      let payload = {};

      if (this.selectedEDMID !== TEMPLATE_TYPE.REDEMPTION) {
        payload = {
          user_id: this.testForm.user_id,
          badge_id: this.testForm.badge_id,
          message: this.testForm.message,
          token: this.testForm.token || 0,
        };
      } else {
        payload = {
          orderItems: this.testForm.items,
        };
      }

      this.isFetching = true;

      this.$axios
        .post(`/admin/edm/${this.selectedEDMID}`, payload)
        .then((res) => {
          this.previewTemplate = res.data;
        })
        .catch((err) => {
          this.$toast.error(err.response.message);
        })
        .finally(() => {
          this.isFetching = false;
        });
    },
    sendPreview() {
      if (this.hasMissingData()) return;

      let payload = {};

      if (this.selectedEDMID !== TEMPLATE_TYPE.REDEMPTION) {
        payload = {
          user_id: this.testForm.user_id,
          badge_id: this.testForm.badge_id,
          message: this.testForm.message,
          token: this.testForm.token || 0,
        };
      } else {
        payload = {
          orderItems: this.testForm.items.map((i) => {
            return {
              inventory_id: i.inventory_id,
              quantity: i.quantity,
            };
          }),
        };
      }

      if (this.testForm.emails.length === 0) {
        this.$toast.error("Please enter an email address");
        return;
      }

      payload.send = this.testForm.emails;

      this.$axios
        .post(`/admin/edm/${this.selectedEDMID}`, payload)
        .then((res) => {
          this.$toast.success(
            `Successfully sent test email to ${this.testForm.emails}`
          );
        })
        .catch((err) => {
          this.$toast.error(err.response.message);
        });
    },
    setTestEDM(edmID) {
      this.selectedEDMID = edmID;
      this.sendDialog = true;

      setTimeout(() => {
        this.$refs.txtEmail.focus();
      }, 100);
    },
    sendTestEmail() {
      const payload = {
        send: this.email,
      };

      this.$axios
        .get(this.$queryBuilder(`/admin/edm/${this.selectedEDMID}`, payload))
        .then((res) => {
          this.$toast.success(`Successfully sent test email to ${this.email}`);
          this.close();
        })
        .catch((err) => {
          this.$toast.error(err.response.message);
        })
        .finally(() => {
          this.isFetching = false;
        });
    },
    close() {
      this.dialog = false;
      this.sendDialog = false;
      this.email = "";
      this.selectedEDMID = -1;
      this.previewTemplate = "";
      this.testForm.message = "";
      this.testForm.user_id = 0;
      this.testForm.emails = [];
      this.testForm.badge_id = 0;
      this.testForm.token = null;
      this.testForm.items = [];
      this.testForm.isItemActive = false;
      this.testForm.newItem.item = null;
      this.testForm.newItem.quantity = 1;
      this.users = [];
      this.items = [];
    },
    closeUploadDialog() {
      this.uploadDialog = false;
      this.filterSelected = null;
      this.$refs.file.value = "";
    },
    upload() {
      let payload = new FormData();

      payload.append("id", this.filterSelected);
      payload.append("file", this.$refs.file.files[0]);

      this.isUploading = true;

      $.ajax({
        url: `${process.env.API_URL}/admin/edm`,
        data: payload,
        processData: false,
        contentType: false,
        crossDomain: false,
        dataType: "json",
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.sessionToken}`,
        },
        success: (res) => {
          this.isUploading = false;
          this.$toast.success("Successfully uploaded email template.");
          this.getDataFromApi().then((res) => {
            this.edms = res.items;
            this.table.totalItems = res.totalItems;
          });
          this.closeUploadDialog();
        },
        error: (error) => {
          for (let k in error.response.data) {
            const errorType = error.response.data[k];

            errorType.forEach((e) => {
              this.$toast.error(e);
            });
          }
          this.isUploading = false;
        },
      });
    },
    getTemplateType(edmID) {
      switch (edmID) {
        case TEMPLATE_TYPE.MESSAGE_SEND:
          return "Send";
          break;
        case TEMPLATE_TYPE.MESSAGE_RECEIVE:
          return "Receive";
          break;
        case TEMPLATE_TYPE.REDEMPTION:
          return "Check Out";
          break;
      }
    },
    searchUserFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1;
    },
    searchBadgeFilter(item, queryText) {
      const textOne = item.title.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1;
    },
    searchItemFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1;
    },
  },
  watch: {
    pagination: {
      handler(val) {
        this.getDataFromApi().then((res) => {
          console.log("res");
          console.log(res);
          this.edms = res.items;
          this.table.totalItems = res.totalItems;
        });
      },
      deep: true,
    },
  },
};
</script>

<style>
.v-list--three-line .v-list__tile {
  height: 50px;
}
</style>
