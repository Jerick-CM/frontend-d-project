<template>
  <div id="cms-page">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>FAQ</v-toolbar-title>

        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <div class="container--flex container--flex-align-item-center"></div>
      </v-toolbar>

      <div class="container no-padding" style="background-color: white">
        <v-container class="grey lighten-5">
          <v-card-actions>
            <v-btn color="red" @click="deleteItem">
              <label class="white-font">Delete All Selected</label>
            </v-btn>
            <v-spacer></v-spacer>
            <nuxt-link
              color="success"
              :to="{ name: 'a-cms-faqcategoriescreate' }"
            >
              <v-btn color="success">
                <label class="white-font">Create</label>
              </v-btn>
            </nuxt-link>
          </v-card-actions>
        </v-container>

        <div class="container">
          <div class="row">
            <div class="faq col-md-12">
              <v-progress-linear
                height="1"
                v-show="progressBar"
                slot="progress"
                color="blue"
                indeterminate
              ></v-progress-linear>
              <v-data-table
                v-show="!progressBar"
                v-model="selected"
                :headers="headers"
                :items="faqscategories"
                item-key="id"
                :loading="loading"
                select-all
                class="elevation-1"
                :pagination.sync="pagination"
              >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-checkbox
                      v-model="props.selected"
                      primary
                      hide-details
                    ></v-checkbox>
                  </td>
                  <td class="handle" style="max-width: 28px">::</td>
                  <td>{{ props.item.value }}</td>

                  <td class="text-sm-center text-center">
                    <nuxt-link
                      color="#000"
                      :to="{
                        path: '/a/cms/faqcategoriesedit',
                        query: { edit: props.item.id },
                      }"
                    >
                      <v-btn color="blue">
                        <label class="white-font">Edit</label>
                      </v-btn>
                    </nuxt-link>
                  </td>
                  <td class="text-sm-center text-center">
                    <v-btn
                      color="red"
                      v-on:click="
                        fireDelete(props.index, props.item.id, props.item.value)
                      "
                    >
                      <label class="white-font">Delete</label>
                    </v-btn>
                  </td>

                  <td class="text-sm-center text-center">
                    {{ props.item.created_at }}
                  </td>
                </template>
              </v-data-table>
            </div>
          </div>
        </div>
      </div>

      <div class="controls m-lg-vertical"></div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import adminPage from "~/mixins/admin-page.js";
import dateToFromPicker from "~/mixins/dateToFromPicker.js";
import downloadExcel from "~/mixins/downloadExcel.js";
import Sorttable from "sortablejs";
import { mapGetters } from "vuex";

var url = process.env.API_URL;
export default {
  head() {
    return {
      script: [],
      link: [],
    };
  },
  components: {},
  data() {
    return {
      progressBar: false,
      dialog: false,
      selected: [],
      sortdata: [],
      pagination: {
        rowsPerPage: 10,
      },
      loading: null,
      headers: [
        {
          text: "",
          align: "left",
          sortable: false,
        },
        { text: "Category", value: "Category", sortable: false, align: "left" },
        { text: "Edit", value: "Edit", sortable: false, align: "center" },
        { text: "Delete", value: "Delete", sortable: false, align: "center" },
        {
          text: "Date / Time",
          value: "Date / Time",
          sortable: false,
          align: "center",
        },
      ],
      faqscategories: [],
    };
  },
  computed: {
    ...mapGetters({
      profile: "session/GET_PROFILE",
    }),
  },
  async created() {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      this.progressBar = true;

      const response = await axios.get(
        url + "/api/fetch-faq-categories",
        config
      );

      var data = [];

      for (const [key, value] of Object.entries(response.data["data"])) {
        data.push({
          created_at: value.created_at,
          id: value.id,
          priority: value.priority,
          updated_at: value.updated_at,
          value: value.value,
        });
      }

      this.faqscategories = data;
      this.progressBar = false;
    } catch (error) {
      this.progressBar = false;
    }
  },
  mixins: [adminPage],
  methods: {
    deleteItem() {
      if (confirm("Are you sure you want to delete this item?")) {
        var ids = [];
        var category = [];
        var profile_id = this.profile.id;
        var name = this.profile.name;

        for (var i = 0; i < this.selected.length; i++) {
          const index = this.faqscategories.indexOf(this.selected[i]);
          ids.push(this.faqscategories[index]["id"]);
          category.push(this.faqscategories[index]["value"]);
          this.faqscategories.splice(index, 1);
        }

        if (ids.length) {
          var selected_ids = ids.join(",");
          var category_names = category.join(",");
          this.$axios
            .post("/delete-faqcategories-selectmultiple", {
              ids: selected_ids,
              category: category_names,
              name,
              profile_id,
            })
            .then((res) => {
              this.$toast.success("Delete is successful");
            })
            .catch((error) => {})
            .finally(() => {});
        }
      }
    },
    fireSort(data, new_index, old_index, data_id, category_name) {
      var profile_id = this.profile.id;
      var name = this.profile.name;
      this.$axios
        .post("/sort-faqcategories", {
          value: data,
          name,
          profile_id,
          old_index: old_index,
          new_index: new_index,
          data_id: data_id,
          category_name: category_name,
        })
        .then((res) => {
          this.$toast.success("Sorting is updated");
        })
        .catch((error) => {})
        .finally(() => {});
    },
    fireDelete(id, faqcategoryid, value) {
      if (confirm(`Are you sure you want to delete this row?`)) {
        var profile_id = this.profile.id;
        var name = this.profile.name;

        this.faqscategories.splice(id, 1);
        let payload = new FormData();
        payload.append("id", faqcategoryid);
        payload.append("value", value); //categoryname .
        payload.append("profile_id", profile_id);
        payload.append("name", name);

        this.$axios
          .post("/delete-faqcategories-item", payload)
          .then((res) => {
            this.$toast.success("Delete item is successful");
          })
          .catch((error) => {})
          .finally(() => {});
      }
    },
  },
  mounted() {
    let table = document.querySelector(".v-datatable tbody");
    const _self = this;
    Sorttable.create(table, {
      onEnd({ newIndex, oldIndex }) {
        const rowSelected = _self.faqscategories.splice(oldIndex, 1)[0];
        // console.log(rowSelected);
        _self.faqscategories.splice(newIndex, 0, rowSelected);
        var data = [];
        for (const [key, value] of Object.entries(_self.faqscategories)) {
          data.push(value.id);
        }
        _self.fireSort(
          data,
          newIndex,
          oldIndex,
          rowSelected.id,
          rowSelected.value
        );
      },
    });
  },

  watch: {},
};
</script>

<style scoped>
.white-font {
  color: white;
}
</style>


<style lang="css" scoped>
.handle {
  cursor: move !important;
  cursor: -webkit-grabbing !important;
}
</style>
<style lang="scss" scoped>
.page--table {
  .page {
    &__table {
      margin-top: 20px;
    }
    &__grab-icon {
      cursor: move;
    }
  }
}

@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
