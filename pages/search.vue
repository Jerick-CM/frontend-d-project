<template>
  <div id="search" class="page">
    <div class="container">

      <h3 v-if="searchUser">Results for "{{ $route.query.name }}"</h3>
      <br>
      <p><strong>All results</strong>: {{ $pluralize('Result', results.length) }} found</p>
      <hr />
      <br>

      <v-list two-line v-if="results.length">
        <template v-for="(item, index) in results">
          <v-subheader
            v-if="item.header"
            :key="item.header">
            {{ item.header }}
          </v-subheader>

          <v-divider
            v-else-if="item.divider"
            :inset="item.inset"
            :key="index">
          </v-divider>

          <v-list-tile
            v-else
            :key="item.title"
            avatar
            @click="gotoUserProfile(item)">
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.position_name"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>

      <br>

      <infinite-loading @infinite="infiniteHandler" :identifier="infiniteIdentifier">
        <div slot="spinner">Fetching...</div>
        <div slot="no-more">All users have been loaded</div>
        <div slot="no-results">No Search Results Found</div>
      </infinite-loading>
    </div>
  </div>
</template>


<script>
import InfiniteLoading from 'vue-infinite-loading';

import { mapGetters } from 'vuex';

import authenticatedPage from '~/mixins/authenticated-page.js';

const SEARCH_DELAY = 300;


export default {
  components: {
    InfiniteLoading,
  },
  mixins: [
    authenticatedPage,
  ],
  methods: {
    async infiniteHandler($state) {
      try {
        let payload = {
          page: this.page++,
          search: this.searchUser,
        };

        const res = await this.$axios
                              .get(this.$queryBuilder('/users', payload));
        const results = res.data.data;

        // Check if need to append on array or a new one
        if (this.results.length > 0) {
          this.results.concat(results);
        } else {
          this.results = results;
        }

        // infinite-loader load finish checking
        if (results.length > 0) {
          $state.loaded();
        } else {
          $state.complete();
        }

      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    resetInfiniteScroll() {
      this.infiniteIdentifier += 1;
      this.page = 1;
      this.results = [];
    },
    gotoUserProfile(user) {
      this.$router
          .push(`/profile/${user.id}`);
    },
  },
  data() {
    return {
      infiniteIdentifier: new Date(),

      searchUser: this.$route.query.name || '',
      searchTimeout: null,

      items: [],

      results: [],

      page: 1,
    };
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/redeem.scss";
</style>
