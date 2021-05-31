<template>
  <div id="user-levels-page">
    <div class="container no-padding">
      <v-toolbar flat color="white">
        <v-toolbar-title>Badge Promotion Level Rewards Token</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-progress-linear v-show="progressBar" height="1" slot="progress" color="blue" indeterminate></v-progress-linear>
      <v-data-table
        v-show="!progressBar"
        :headers="table.headers"
        :items="badgerewardtoken"
        :items-per-page="10"
        item-key="id"
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template slot="items" slot-scope="props">
          <tr>
            <td>
              <h3>{{ props.item.id }}</h3>
            </td>

            <td>
              <h3>{{ props.item.description }}</h3>
            </td>

            <td>
              <v-text-field
                v-model="props.item.rewardstoken"
                color="light-green lighten-1"
                type="number"
                min="0"
              ></v-text-field>
            </td>
            <td>
              <v-btn
                color="success"
                v-on:click="fireUpdate(props.item.id,props.item.description,props.item.rewardstoken)"
              >
                <label class="white-font">Update</label>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>


<script>
import adminPage from "~/mixins/admin-page.js";
import { mapGetters } from "vuex";

const url = process.env.API_URL;
const axios = require("axios");
const config = {
  headers: {
    Accept: "application/json",
  },
};
export default {
  mixins: [adminPage],
  data() {
    return {
      progressBar: false,
      progressBarvalue: 0,
      table: {
        headers: [
          { text: "Id", value: "career_level", sortable: true },
          { text: "Description", value: "Desciption", sortable: false },
          {
            text: "My Rewards Token",
            value: "token",
            sortable: true,
          },
          {
            text: "Action",
          },
        ],
        page: 1,
        totalItems: 0,
        isLoading: false,
      },

      positions: [],
      positionsCopy: [],
      updateSelection: [],
      searchTimeOut: null,
      searchFilter: "",
      search: null,
      dialog: false,
      isSaving: false,

      badgerewardtoken: [],
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  async created() {
    try {
      this.progressBar = true;
      const response = await this.$axios.get("/api/fetch-myrewards", {});
      console.log(response);

      var data = [];
      console.log(response);
      for (const [key, value] of Object.entries(
        response.data["data"]["badge_rewards_token"]
      )) {
        data.push({
          id: value.id,
          description: value.description,
          rewardstoken: value.rewardstoken,
          created_at: value.created_at,
          updated_at: value.updated_at,
        });
      }
      this.progressBarvalue = 100;
      this.progressBar = false;
      this.badgerewardtoken = data;
    } catch (error) {
      this.progressBar = false;
    }
  },
  methods: {
    fireUpdate(id, description, rewardstoken) {
      if (confirm(`Are you sure you want to update this row?`)) {
        var profile_id = this.profile.id;
        var name = this.profile.name;

        let payload = new FormData();

        payload.append("id", id);
        payload.append("description", description);
        payload.append("rewardstoken", rewardstoken);

        payload.append("profile_id", profile_id);
        payload.append("profile_name", name);

        this.$axios
          .post("/api/update-badge-level-rewardtoken", payload)
          .then((res) => {
            if (res.data.error) {
              console.log(res.data);
              this.$toast.error(res.data.error["message"]);
            }
            if (res.data.success) {
              this.$toast.success("Update item is successful");
              this.submitted = false;
            }
          })
          .catch((error) => {
            if (error.message) {
              this.$toast.error(error.message);
            }
          })
          .finally(() => {});
      }
    },
  },
  computed: {
    ...mapGetters({
      profile: "session/GET_PROFILE",
    }),
  },
  mounted() {},
  watch: {},
};
</script>
<style scoped>
.white-font {
  color: white;
}
</style>