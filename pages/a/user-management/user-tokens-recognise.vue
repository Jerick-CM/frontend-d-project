<template>
  <div id="users-page" v-if="selected">
    <div class="container no-padding">
      <v-toolbar flat color="white">
        <v-toolbar-title>User Recognise Others Token</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="pt-0"
          v-model="searchFilter"
          append-icon="search"
          label="Search"
          color="light-green lighten-1"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>

      <v-data-table
        v-bind:headers="table.headers"
        v-bind:items="users"
        v-bind:search="search"
        v-bind:loading="table.isLoading"
        v-bind:pagination.sync="pagination"
        v-bind:total-items="table.totalItems"
        item-key="id"
      >
        <template slot="items" slot-scope="props">
          <tr
            :class="{ 'grey--text': currentEditedUser !== null && currentEditedUser.id !== props.item.id }"
            @click="clickRow(props.item.id)"
          >
            <td>
              <h3>{{ props.item.name }}</h3>
              <p>{{ props.item.email }}</p>
            </td>
            <td>
              <h3>{{ props.item.department_name }}</h3>
            </td>
            <td>
              <h3>{{ props.item.position_name }}</h3>
            </td>
            <td>
              <h3>{{ props.item.career_level }}</h3>
            </td>
            <td>
              <div class="credit-wrapper container--flex container--flex-align-item-center">
                <span style="width: 30px;">{{ props.item.black_token }}</span>
                <input
                  type="number"
                  name="ken"
                  min="0"
                  v-model="props.item.black_token_add"
                  placeholder="0"
                  class="gren-token-input"
                  :disabled="isDisabled(props.item.id)"
                />
                <v-tooltip top>
                  <v-icon
                    slot="activator"
                    class="m-sm-horizontal"
                    :class="{
                      'grey--text': props.item.black_token_option === 0 || isDisabled(props.item.id),
                      'black--text': props.item.black_token_option !== TOKEN_OPTIONS.ADD && !isDisabled(props.item.id),
                      'green--text': props.item.black_token_option === TOKEN_OPTIONS.ADD && !isDisabled(props.item.id),
                    }"
                    @click="setTokenOption(props.index)"
                  >add_circle</v-icon>
                  <span class="uppercase">Add Token</span>
                </v-tooltip>
                <v-tooltip top>
                  <v-icon
                    slot="activator"
                    :class="{
                      'grey--text': props.item.black_token_option === 0 || isDisabled(props.item.id),
                      'black--text': props.item.black_token_option !== TOKEN_OPTIONS.MINUS && !isDisabled(props.item.id),
                      'red--text': props.item.black_token_option === TOKEN_OPTIONS.MINUS && !isDisabled(props.item.id),
                    }"
                    @click="setTokenOption(props.index, TOKEN_OPTIONS.MINUS)"
                  >remove_circle</v-icon>
                  <span class="uppercase">Reduce Token</span>
                </v-tooltip>
              </div>
            </td>
            <td class="container--flex container--flex-align-item-center">
              <v-text-field
                class="mr-3"
                color="light-green lighten-1"
                v-model="props.item.remarks"
                placeholder="Required"
                :disabled="isDisabled(props.item.id)"
              ></v-text-field>
              <div style="width: 77.250px;">
                <v-tooltip top>
                  <v-icon
                    slot="activator"
                    class="m-sm-horizontal black--text"
                    @click="undoEdit(props.item.id)"
                    v-show="isCurrentEdited(props.item.id)"
                  >cancel</v-icon>
                  <span class="uppercase">Undo</span>
                </v-tooltip>
              </div>
            </td>
          </tr>
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>

      <v-dialog v-model="dialog" max-width="500px" width="500px">
        <v-toolbar dark dense>
          <v-toolbar-title dark style="text-align: left;">Save confirmation</v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text style="padding: 25px;">
            <p class="mb-0">
              <strong>You are about to save changes of the following:</strong>
            </p>
            <ul>
              <li
                v-for="(i, idx) in updateSelection"
                :key="idx"
              >{{ i.name }} ({{ i.black_token_option === TOKEN_OPTIONS.ADD ? '+' : '-' }}{{ $pluralize('token', i.black_token_add) }})</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="button" color="grey" dark @click.prevent="closeDialog()">Back</v-btn>
            <v-btn
              v-bind:loading="isSaving"
              v-on:click.prevent="doUpdate()"
              type="button"
              color="light-green lighten-1"
              dark
            >Proceed</v-btn>&nbsp;
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="editDialog" max-width="500px" width="500px">
        <v-toolbar dark dense>
          <v-toolbar-title dark style="text-align: left;">OOPS!</v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text style="padding: 25px;">
            <p class="mb-0">
              <strong>
                Looks like you've left some necessary field(s) empty. Please complete all the necessary
                field(s) before moving on the next item.
              </strong>
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="grey" dark @click.prevent="editDialog = false">Back</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div
        class="controls m-lg-vertical right"
        v-if="updateSelection.length > 0 && currentEditedUser === null"
      >
        <v-btn dark :disabled="updateSelection.length === 0" @click="showConfirmation()">Review</v-btn>
        <v-btn dark :disabled="updateSelection.length === 0" @click="resetSelection()">Cancel</v-btn>
      </div>
    </div>
  </div>
</template>


<script>
import adminPage from "~/mixins/admin-page.js";

const MINIMUM_SEARCH_TEXT = 3;
const TOKEN_INCREMENT = 5;
const TOKEN_MINIMUM = 0;
const TOKEN_OPTIONS = {
  ADD: 1,
  MINUS: 2,
};

export default {
  mixins: [adminPage],
  mounted() {
    this.getDataFromApi().then((res) => {
      this.users = res.items;
      this.usersCopy = JSON.parse(JSON.stringify(res.items));
      this.table.totalItems = res.totalItems;
    });
  },
  data() {
    return {
      // Constants
      TOKEN_OPTIONS,
      // Vuetify Data table Docs
      // https://vuetifyjs.com/en/components/data-tables
      table: {
        headers: [
          { text: "Name", value: "name", sortable: true },
          { text: "Department", value: "department_name", sortable: true },
          { text: "Designation", value: "position_name", sortable: true },
          { text: "Career level", value: "career_level", sortable: true },
          {
            text: "Recognise Others Token",
            value: "black_token",
            align: "center",
            width: "20px",
            sortable: true,
          },
          { text: "*Remarks", value: "remarks", sortable: false },
        ],
        page: 1,
        totalItems: 0,
        isLoading: false,
      },
      pagination: {},

      users: [],
      usersCopy: [],

      updateSelection: [],
      currentEditedUser: null,

      searchTimeOut: null,
      searchFilter: "",
      search: null,

      dialog: false,
      editDialog: false,

      isSaving: false,
    };
  },
  methods: {
    showConfirmation() {
      this.dialog = true;
    },
    async doUpdate() {
      const confirmPopupOpts = {
        title: "Save confirmation",
        buttonTrueText: "Submit",
        buttonFalseText: "Cancel",
        buttonFalseColor: "red",
        buttonTrueColor: "light-green lighten-1",
        color: "black",
        icon: "",
      };

      const payload = {
        users: this.updateSelection.map((s) => {
          let black_token = s.black_token;

          if (s.black_token_option === TOKEN_OPTIONS.ADD) {
            black_token += Number(s.black_token_add);
          } else {
            black_token -= Number(s.black_token_add);
          }

          return {
            id: s.id,
            black_token,
            remarks: s.remarks,
          };
        }),
      };

      this.isSaving = true;
      this.$axios
        .put("/admin/users/recognise", payload)
        .then((response) => {
          const messages = response.data;

          for (const k in messages) {
            this.$toast.success(messages[k]);
          }

          this.closeDialog();
          this.resetSelection();
        })
        .finally(() => {
          this.isSaving = false;
          this.getDataFromApi().then((res) => {
            this.users = res.items;
            this.usersCopy = JSON.parse(JSON.stringify(res.items));
          });
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
          payload.rpp = rowsPerPage ? rowsPerPage : 5;
        }
        if (sortBy) {
          payload.sort = `${sortBy}:${descending ? "desc" : "asc"}`;
        }
        if (this.search) {
          payload.search = this.search;
        }

        this.$axios
          .get(this.$queryBuilder("/admin/users", payload))
          .then((res) => {
            let items = res.data.data;

            if (rowsPerPage === -1) {
              items = res.data;
            }

            resolve({
              items: items.map((i) => {
                const existing = this.getFromSelection(i.id);

                return {
                  ...i,
                  remarks: existing ? existing.remarks : "",
                  black_token: existing
                    ? existing.black_token
                    : Number(i.black_token),
                  black_token_add: existing ? existing.black_token_add : null,
                  black_token_option: existing
                    ? existing.black_token_option
                    : 0,
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
      this.users = JSON.parse(JSON.stringify(this.usersCopy));
      this.updateSelection = [];
    },
    updateToken(id, isAdd = true) {
      const idx = this.users.findIndex((u) => u.id === id);

      if (idx >= 0) {
        if (isAdd) {
          this.users[idx].black_token_add += TOKEN_INCREMENT;
        } else {
          if (
            this.users[idx].black_token_add - TOKEN_INCREMENT <
            TOKEN_MINIMUM
          ) {
            this.users[idx].black_token_add = TOKEN_MINIMUM;
          } else {
            this.users[idx].black_token_add -= TOKEN_INCREMENT;
          }
        }
      }
    },
    isExistingOnSelection(id) {
      return this.updateSelection.findIndex((u) => u.id === id) !== -1;
    },
    addOrUpdateToSelection(item) {
      if (this.isExistingOnSelection(item.id)) {
        const idx = this.updateSelection.findIndex((u) => u.id === item.id);

        this.updateSelection[idx] = Object.assign({}, item);
      } else {
        this.updateSelection.push(item);
      }
    },
    removeFromSelection(id) {
      const idx = this.updateSelection.findIndex((u) => u.id === id);

      if (idx >= 0) {
        this.updateSelection.splice(idx, 1);
      }
    },
    getFromSelection(id) {
      return this.updateSelection.find((u) => u.id === id);
    },
    hasFieldChanges(index) {
      return (
        this.usersCopy[index].black_token_add !==
          this.users[index].black_token_add ||
        this.usersCopy[index].black_token_option !==
          this.users[index].black_token_option ||
        this.usersCopy[index].remarks !== this.users[index].remarks
      );
    },
    isFieldChangesCompleted(index) {
      return (
        this.users[index].black_token_add != 0 &&
        this.users[index].black_token_add !== null &&
        this.users[index].black_token_option !== 0 &&
        this.users[index].remarks.length > 0
      );
    },
    setTokenOption(index, value = TOKEN_OPTIONS.ADD) {
      const user = this.users[index];

      if (!this.isDisabled(user.id)) {
        this.users[index].black_token_option = value;
      }
    },
    isCurrentEdited(userID) {
      return (
        this.currentEditedUser !== null && this.currentEditedUser.id === userID
      );
    },
    isDisabled(userID) {
      let result = false;

      if (
        this.currentEditedUser !== null &&
        this.currentEditedUser.id !== userID
      ) {
        result = true;
      }

      return result;
    },
    closeDialog() {
      this.dialog = false;
    },
    undoEdit(userID) {
      const idx = this.users.findIndex((u) => u.id === userID);
      const copyIdx = this.usersCopy.findIndex((u) => u.id === userID);

      this.currentEditedUser = null;
      this.users[idx].remarks = this.usersCopy[copyIdx].remarks;
      this.users[idx].black_token_add = this.usersCopy[copyIdx].black_token_add;
      this.users[idx].black_token_option = this.usersCopy[
        copyIdx
      ].black_token_option;
    },
    clickRow(userID = 0) {
      if (this.currentEditedUser !== null) {
        if (!this.isCurrentEdited(userID)) {
          this.editDialog = true;
        }
      }
    },
  },
  computed: {
    selected() {
      for (let i = 0, length = this.users.length; i < length; ++i) {
        const userID = this.users[i].id;

        // Check if there are changes
        if (this.hasFieldChanges(i)) {
          if (this.isFieldChangesCompleted(i)) {
            this.addOrUpdateToSelection(this.users[i]);
            this.currentEditedUser = null;
          } else {
            if (this.isExistingOnSelection(userID)) {
              this.removeFromSelection(userID);
            }
            this.currentEditedUser = Object.assign({}, this.users[i]);
          }
        }
      }

      return true;
    },
  },
  watch: {
    pagination: {
      handler(newVal, oldVal) {
        if (this.currentEditedUser !== null) {
          this.$toast.error(
            "You have unsaved changes. Please save or discard them."
          );
          return;
        }

        this.getDataFromApi().then((res) => {
          this.users = res.items;
          this.usersCopy = JSON.parse(JSON.stringify(res.items));
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
        if (this.currentEditedUser !== null) {
          this.$toast.error(
            "You have unsaved changes. Please save or discard them."
          );
          return;
        }

        if (this.searchFilter.length >= MINIMUM_SEARCH_TEXT) {
          this.search = this.searchFilter;
        } else {
          this.search = null;
        }
      }, 300);
    },
  },
};
</script>


<style scoped>
.controls {
  position: fixed;
  bottom: 0;
  right: 21px;
}
.gren-token-input {
  width: 60px;
  border: 1px solid #9e9e9e;
  margin-left: 10px;
  font-size: 15px;
  padding: 5px;
  height: 40px;
}
</style>
