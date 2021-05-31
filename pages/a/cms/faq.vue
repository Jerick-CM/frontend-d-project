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
            <nuxt-link color="success" :to="{ name: 'a-cms-faqcreate' }">
              <v-btn color="success">
                <label class="white-font">Create</label>
              </v-btn>
            </nuxt-link>
          </v-card-actions>
        </v-container>

        <v-container>
          <div class="row">
            <div class="faq col-md-12">
              <v-progress-linear
                v-show="progressBar"
                height="1"
                slot="progress"
                color="blue"
                indeterminate
              ></v-progress-linear>
              <v-data-table
                v-show="!progressBar"
                v-model="selected"
                :headers="headers"
                :items="faqs"
                :items-per-page="10"
                item-key="id"
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
                  <td>{{ props.item.categoryname }}</td>
                  <td>{{ props.item.value }}</td>

                  <td class="text-sm-center text-center">
                    <nuxt-link
                      color="#000"
                      :to="{
                        path: '/a/cms/faqedit',
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
                        fireDelete(
                          props.index,
                          props.item.id,
                          props.item.value,
                          props.item.categoryname
                        )
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
        </v-container>
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

const url = process.env.API_URL;
import { mapGetters } from "vuex";
const config = {
  headers: {
    Accept: "application/json",
  },
};

export default {
  head() {
    return {
      script: [],
      link: [],
    };
  },
  components: {},
  watch: {},
  data() {
    return {
      progressBar: false,
      pagination: {
        rowsPerPage: 10,
      },
      dialog: false,
      selected: [],
      headers: [
        {
          text: "",
          align: "left",
          sortable: false,
        },
        {
          text: "Category",
          value: "Category",
          sortable: false,
          align: "left",
        },
        { text: "Title", value: "Title", sortable: false, align: "center" },
        { text: "Edit", value: "Edit", sortable: false, align: "center" },
        { text: "Delete", value: "Delete", sortable: false, align: "center" },
        {
          text: "Date / Time",
          value: "Date / Time",
          sortable: false,
          align: "center",
        },
      ],
      faqs: [],
    };
  },
  computed: {
    ...mapGetters({
      profile: "session/GET_PROFILE",
    }),
  },
  async created() {
    this.progressBar = true;
    try {
      const response = await axios.get(url + "/api/fetch-faq", config);
      var data = [];

      for (const [key, value] of Object.entries(response.data["data"]["faq"])) {
        data.push({
          category_id: value.category_id,
          category_priority: value.category_priority,
          categoryname: value.categoryname,
          created_at: value.created_at,
          id: value.id,
          updated_at: value.updated_at,
          value: value.value,
        });
      }
      this.faqs = data;
      this.progressBar = false;
    } catch (error) {
      this.progressBar = false;
    }
  },
  mixins: [adminPage],
  mounted() {
    let table = document.querySelector(".v-datatable tbody");
    const _self = this;
    Sorttable.create(table, {
      onEnd({ newIndex, oldIndex }) {
        const rowSelected = _self.faqs.splice(oldIndex, 1)[0];
        console.log(rowSelected);
        var dataid = _self.faqs.splice(newIndex, 0, rowSelected);
        var data = [];
        for (const [key, value] of Object.entries(_self.faqs)) {
          data.push(value.id);
        }
        _self.fireSort(
          data,
          newIndex,
          oldIndex,
          rowSelected.id,
          rowSelected.categoryname,
          rowSelected.value
        );
      },
    });
  },

  methods: {
    deleteItem() {
      if (confirm("Are you sure you want to delete this item?")) {
        var ids = [];
        var title = [];
        var categories = [];
        var profile_id = this.profile.id;
        var name = this.profile.name;

        for (var i = 0; i < this.selected.length; i++) {
          const index = this.faqs.indexOf(this.selected[i]);
          ids.push(this.faqs[index]["id"]);
          title.push(this.faqs[index]["value"]);
          categories.push(this.faqs[index]["categoryname"]);
          this.faqs.splice(index, 1);
        }

        if (ids.length) {
          var selected_ids = ids.join(",");
          var title_ids = title.join(",");
          var categories_names = categories.join(",");
          this.$axios
            .post("/delete-faq-selectmultiple", {
              ids: selected_ids,
              title: title_ids,
              categoryname: categories_names,
              name,
              profile_id: profile_id,
            })
            .then((res) => {
              this.$toast.success("Delete is successful");
            })
            .catch((error) => {})
            .finally(() => {});
        }
      }
    },

    fireSort(data, new_index, old_index, data_id, category_name, title) {
      var profile_id = this.profile.id;
      var name = this.profile.name;
      this.$axios
        .post("/sort-faqs", {
          value: data,
          name,
          profile_id,
          old_index: old_index,
          new_index: new_index,
          data_id: data_id,
          category_name: category_name,
          title: title,
        })
        .then((res) => {
          this.$toast.success("Sorting is updated");
        })
        .catch((error) => {})
        .finally(() => {});
    },
    fireDelete(id, faqid, value, category_name) {
      if (confirm(`Are you sure you want to delete this row?`)) {
        var profile_id = this.profile.id;
        var name = this.profile.name;
        this.faqs.splice(id, 1);

        let payload = new FormData();

        payload.append("id", faqid);
        payload.append("value", value); //title

        payload.append("profile_id", profile_id);
        payload.append("name", name);
        payload.append("category_name", category_name);

        this.$axios
          .post("/delete-faq-item", payload)
          .then((res) => {
            this.$toast.success("Delete item is successful");
          })
          .catch((error) => {})
          .finally(() => {});
      }
    },
  },
  watch: {},
};
</script>

<style scoped>
.white-font {
  color: white;
}
</style>
<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
