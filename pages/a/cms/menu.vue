<template>
  <div id="cms-page">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>MENU</v-toolbar-title>

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
            <nuxt-link color="success" :to="{ name: 'a-cms-menucreate' }">
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
                :items="page"
                item-key="id"
                class="elevation-1"
                :pagination.sync="pagination"
              >
                <!-- select-all -->
                <template slot="items" slot-scope="props">
                  <td
                    v-if="props.item.id === 1"
                    class="handle"
                    style="max-width: 28px"
                  >
                    ::
                  </td>
                  <td
                    v-else-if="props.item.id === 2"
                    class="handle"
                    style="max-width: 28px"
                  >
                    ::
                  </td>

                  <td
                    v-else-if="props.item.id === 3"
                    class="handle"
                    style="max-width: 28px"
                  >
                    ::
                  </td>

                  <td
                    v-else-if="props.item.id == 4"
                    class="handle"
                    style="max-width: 28px"
                  >
                    ::
                  </td>
                  <td
                    v-else-if="props.item.id === 5"
                    class="handle"
                    style="max-width: 28px"
                  >
                    ::
                  </td>
                  <td v-else>
                    <v-checkbox
                      v-model="props.selected"
                      primary
                      hide-details
                    ></v-checkbox>
                  </td>

                  <td class="handle" style="max-width: 28px">::</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.title }}</td>
                  <td>{{ props.item.publish }}</td>

                  <td
                    v-if="props.item.id == 1"
                    class="text-sm-center text-center"
                  >
                    Reserved
                  </td>
                  <td
                    v-else-if="props.item.id == 2"
                    class="text-sm-center text-center"
                  >
                    Reserved
                  </td>
                  <td
                    v-else-if="props.item.id == 3"
                    class="text-sm-center text-center"
                  >
                    Reserved
                  </td>
                  <td
                    v-else-if="props.item.id == 4"
                    class="text-sm-center text-center"
                  >
                    Reserved
                  </td>
                  <td
                    v-else-if="props.item.id == 5"
                    class="text-sm-center text-center"
                  >
                    Reserved
                  </td>

                  <td v-else class="text-sm-center text-center">
                    <nuxt-link
                      color="#000"
                      :to="{
                        path: '/a/cms/pageedit',
                        query: { edit: props.item.id },
                      }"
                    >
                      <v-btn color="blue">
                        <label class="white-font">Edit</label>
                      </v-btn>
                    </nuxt-link>
                  </td>

                  <td
                    v-if="props.item.id == 1"
                    class="text-sm-center text-center"
                  >
                    Reserved
                  </td>
                  <td
                    v-else-if="props.item.id == 2"
                    class="text-sm-center text-center"
                  >
                    Reserved
                  </td>
                  <td
                    v-else-if="props.item.id == 3"
                    class="text-sm-center text-center"
                  >
                    Reserved
                  </td>
                  <td
                    v-else-if="props.item.id == 4"
                    class="text-sm-center text-center"
                  >
                    Reserved
                  </td>
                  <td
                    v-else-if="props.item.id == 5"
                    class="text-sm-center text-center"
                  >
                    Reserved
                  </td>
                  <td v-else class="text-sm-center text-center">
                    <v-btn
                      color="red"
                      v-on:click="
                        fireDelete(props.index, props.item.id, props.item.name)
                      "
                    >
                      <label class="white-font">Delete</label>
                    </v-btn>
                  </td>

                  <td
                    v-if="props.item.id == 1"
                    class="text-sm-center text-center"
                  >
                    <nuxt-link
                      target="_blank"
                      :to="{ path: '/' + props.item.url }"
                      >Link</nuxt-link
                    >
                  </td>
                  <td
                    v-else-if="props.item.id == 2"
                    class="text-sm-center text-center"
                  >
                    <nuxt-link
                      target="_blank"
                      :to="{ path: '/' + props.item.url }"
                      >Link</nuxt-link
                    >
                  </td>
                  <td
                    v-else-if="props.item.id == 3"
                    class="text-sm-center text-center"
                  >
                    <nuxt-link
                      target="_blank"
                      :to="{ path: '/' + props.item.url }"
                      >Link</nuxt-link
                    >
                  </td>
                  <td
                    v-else-if="props.item.id == 4"
                    class="text-sm-center text-center"
                  >
                    <nuxt-link
                      target="_blank"
                      :to="{ path: '/' + props.item.url }"
                      >Link</nuxt-link
                    >
                  </td>
                  <td
                    v-else-if="props.item.id == 5"
                    class="text-sm-center text-center"
                  >
                    <nuxt-link
                      target="_blank"
                      :to="{ path: '/' + props.item.url }"
                      >Link</nuxt-link
                    >
                  </td>
                  <td v-else class="text-sm-center text-center">
                    <nuxt-link :to="{ path: '/p/' + props.item.url }"
                      >Link</nuxt-link
                    >
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
  data() {
    return {
      progressBar: false,
      progressBarvalue: 0,
      dialog: false,
      selected: [],
      pagination: {
        rowsPerPage: 10,
      },
      headers: [
        {
          text: "",
          align: "left",
          sortable: false,
        },
        { text: "", value: "Spacer", sortable: false, align: "left" },
        {
          text: "Menu Name",
          value: "Category",
          sortable: false,
          align: "left",
        },
        { text: "Page title", value: "Title", sortable: false, align: "left" },
        { text: "Publish", value: "Publish", sortable: false, align: "left" },
        { text: "Edit", value: "Edit", sortable: false, align: "center" },
        { text: "Delete", value: "Delete", sortable: false, align: "center" },
        { text: "Preview", value: "Preview", sortable: false, align: "center" },
        {
          text: "Date / Time",
          value: "Date / Time",
          sortable: false,
          align: "center",
        },
      ],
      page: [],
    };
  },
  computed: {
    ...mapGetters({
      profile: "session/GET_PROFILE",
    }),
  },
  async created() {
    try {
      this.progressBar = true;
      const response = await axios.get(url + "/api/fetch-page", config);
      var data = [];
      console.log(response.data["data"]["pages"]);
      for (const [key, value] of Object.entries(
        response.data["data"]["pages"]
      )) {
        data.push({
          id: value.id,
          name: value.name,
          title: value.title,
          priority: value.priority,
          publish: value.publish ? "published" : "draft",
          created_at: value.created_at,
          updated_at: value.updated_at,
          url: value.pageurl,
        });
      }

      this.page = data;
      this.progressBarvalue = 100;
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
        const rowSelected = _self.page.splice(oldIndex, 1)[0];
        console.log(rowSelected);
        _self.page.splice(newIndex, 0, rowSelected);
        var data = [];
        for (const [key, value] of Object.entries(_self.page)) {
          data.push(value.id);
        }
        _self.fireSort(
          data,
          newIndex,
          oldIndex,
          rowSelected.id,
          rowSelected.name
        );
      },
    });
  },

  methods: {
    deleteItem() {
      if (confirm("Are you sure you want to delete this item?")) {
        var ids = [];
        var menuname = [];
        var profile_id = this.profile.id;
        var name = this.profile.name;

        for (var i = 0; i < this.selected.length; i++) {
          const index = this.page.indexOf(this.selected[i]);
          ids.push(this.page[index]["id"]);
          menuname.push(this.page[index]["name"]);
          this.page.splice(index, 1);
        }

        if (ids.length) {
          var selected_ids = ids.join(",");
          var selected_menus = menuname.join(",");
          this.$axios
            .post("/delete-page-selectmultiple", {
              ids: selected_ids,
              menu: selected_menus,
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
    fireSort(data, new_index, old_index, data_id, data_name) {
      var profile_id = this.profile.id;
      var name = this.profile.name;
      this.$axios
        .post("/sort-page", {
          value: data,
          name,
          profile_id,
          old_index: old_index,
          new_index: new_index,
          data_id: data_id,
          data_name,
        })
        .then((res) => {
          this.$toast.success("Sorting is updated");
        })
        .catch((error) => {})
        .finally(() => {});
    },
    fireDelete(id, faqid, menu_name) {
      if (confirm(`Are you sure you want to delete this row?`)) {
        var profile_id = this.profile.id;
        var name = this.profile.name;
        this.page.splice(id, 1);
        let payload = new FormData();
        payload.append("id", faqid);
        payload.append("profile_id", profile_id);
        payload.append("name", name);
        payload.append("menu_name", menu_name);

        this.$axios
          .post("/delete-page-item", payload)
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
