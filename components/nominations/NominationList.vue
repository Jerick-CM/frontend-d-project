<template>
  <div id="nomination-list" class="container">
    <div class="container--flex filters-control" v-if="showSearch">
      <div class="flex-1 container--flex filter-1 px-0">
        <v-select
          id="filter"
          name="filter"
          v-model="filter"
          :items="filterItems"
          hide-details
          item-text="text"
          item-value="value"
          color="light-green lighten-1"
          label="Sort by"
          outline
          v-if="showSort"
          style="width: 35px;">
        </v-select>
        <div class="flex-1 container--flex px-0 align-center">
          <div class="container--flex align-center" v-if="!showSort">
            <v-select
              v-model="filterDepartment"
              :items="departments"
              :loading="isFetchingDepartment"
              :menu-props="menuProps"
              clearable
              label="Filter by department"
              color="light-green lighten-1"
              hide-details
              multiple
              outline>
              <template v-slot:item="{ item, index }">
                <span class="capitalize">{{ doCaptializeWord(item.short_name || item.name) }}</span>
              </template>
              <template v-slot:selection="{ item, index }">
                {{ index > 0 ? ', ' : '' }}{{ item.short_name || item.name }}
              </template>
            </v-select>
          </div>
        </div>
      </div>
      <v-spacer></v-spacer>
      <div class="container--flex align-center flex-1 px-0">
        <v-text-field
          v-model="search"
          class="px-0"
          label="Search"
          color="light-green lighten-1"
          single-line
          hide-details
          @keyup="doSearch"
        ></v-text-field>
        <v-btn class="mt-3" icon flat @click.prevent="doSearch(null)">
          <v-icon>search</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="container--flex align-center mb-2" v-if="isSearching">
      <v-btn color="light-green lighten-1"
              class="white--text"
              @click="clearSearch()">
        Exit search
      </v-btn>
      <span v-if="searchResult">Search result for "{{ searchResult }}"</span>
    </div>

    <no-ssr>
      <div class="container"
           v-masonry
           transition-duration="0.3s"
           :horizontal-order="true"
           :gutter="8"
           stagger="0.03s"
           style="padding: 0 0 24px;">
        <nomination-item v-for="(r, idx) in nominations"
                         class="grid-item"
                         v-on:welcome="editNomination"
                         :key="idx"
                         :nomination="r"
                         :is-user-nominations="isUserNominations"
                         v-masonry-tile />
      </div>
    </no-ssr>

    <a href="#" class="back-to-top" @click.prevent="backToTop">
      <v-tooltip top>
        <i class="material-icons" slot="activator">arrow_upward</i>
        <span class="uppercase">BACK TO TOP</span>
      </v-tooltip>
    </a>

    <infinite-loading @infinite="infiniteHandler" :identifier="infiniteIdentifier">
      <div slot="spinner">Fetching...</div>
      <div slot="no-more">All messages have been loaded</div>
      <div slot="no-results">No Search Results Found</div>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import { capitalize } from 'lodash';
import { mapGetters } from 'vuex';

import { FILTER_TYPES } from '~/store/nominations';

import NominationItem from './NominationItem';


const SEARCH_DELAY = 300;
const MASONRY_DRAW_DELAY = 500;


export default {
  components: {
    NominationItem,
    InfiniteLoading
  },
  props: {
    nominations: {
      type: Array,
      required: true
    },
    isUserNominations: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    showSort: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      infiniteIdentifier: new Date(),

      shouldFetch: false,
      isSearching: false,
      isSorted: false,
      isFetchingDepartment: false,

      page: 1,

      searchTimeout: null,
      searchResult: '',
      search: '',

      filter: FILTER_TYPES.RECEIVED,
      filterItems: [
        // { text: 'Latest', value: FILTER_TYPES.LATEST },
        { text: 'Outgoing messages', value: FILTER_TYPES.SENT },
        { text: 'Incoming messages', value: FILTER_TYPES.RECEIVED },
        // { text: 'Badge', value: FILTER_TYPES.BADGE },
      ],

      filterDepartment: [],
      departments: [],
      delaySearch: null,
      menuProps: {
        closeOnContentClick: true,
      },
    };
  },
  computed: {
    ...mapGetters({
      filterType: 'nominations/GET_FILTER_TYPE',
    }),
  },
  watch: {
    filterDepartment() {
      if (this.delaySearch !== null) {
        clearTimeout(this.delaySearch);
      }
      if (!this.isSorted) {
        this.filterDepartment = this.filterDepartment
                                    .sort((a, b) => a.name.localeCompare(b.name));
        this.isSorted = true;
      } else {
        this.delaySearch = setTimeout(() => {
          this.resetInfiniteScroll();
          this.delaySearch = null;
          this.isSorted = false;
        }, 500);
      }
    },
    filterType(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.resetInfiniteScroll();
      }
    },
    filter(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$store.commit('nominations/SET_FILTER', newVal);
        this.resetInfiniteScroll();
      }
    },
  },
  methods: {
    editNomination(nomination) {
      this.$emit('welcome', nomination);
    },
    async infiniteHandler($state) {
      let response = null;

      try {
        let payload = {
          page: this.page++,
          rpp: 8,
        };

        if (this.showSort) {
          // These are special kind of filter that cannot be passed on the query:
          // SENT & RECEIVED
          if (this.filter !== FILTER_TYPES.SENT &&
              this.filter !== FILTER_TYPES.RECEIVED) {
            payload.sort = this.filter;
          } else {
            payload.type = this.filterType;
          }
        }

        // Append search query
        if (this.search) {
          payload.search = this.search;
          this.searchResult = this.search;
          this.isSearching = true;
        } else {
          this.searchResult = '';
        }
        // Append position query
        if (this.filterDepartment.length > 0) {
          this.filterDepartment.forEach((p, i) => {
            payload[`departments[${i}]`] = p.id;
          });
        }

        if (this.isUserNominations) {
          if (this.$route.params.id) {
            payload.user_id = this.$route.params.id;
          }

          response = await this.$store
                               .dispatch('nominations/fetchNextUserPageNominations', payload);
        } else {
          response = await this.$store
                               .dispatch('nominations/fetchNextPage', payload);
        }

        this.searchTimeout = null;

        if (response !== undefined) {
          if (response.length === 0) {
            $state.complete();
          } else {
            $state.loaded();
          }
        }

      } catch (error) {
        console.error(error);
      }

      setTimeout(() => {
        this.$redrawVueMasonry();
      }, MASONRY_DRAW_DELAY);
    },
    fetchDepartment() {
      this.isFetchingDepartment = true;

      const payload = {
        paginate: 0,
        sort: 'name:asc',
      };

      this.$axios
          .get(this.$queryBuilder('/departments', payload))
          .then((res) => {
            this.departments = res.data;
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            this.isFetchingDepartment = false;
          });
    },
    handleScroll() {
      if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        document.querySelector('.back-to-top').style.display = 'block';
      } else {
        document.querySelector('.back-to-top').style.display = 'none';
      }
    },
    backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    resetInfiniteScroll() {
      this.infiniteIdentifier += 1;
      this.page = 1;
      this.$store.commit('nominations/CLEAR_USER_NOMINATIONS');
      this.$store.commit('nominations/CLEAR_NOMINATIONS');
    },
    clearSearch() {
      this.isSearching = false;
      this.searchResult = '';
      this.search = '';
      this.resetInfiniteScroll();
    },
    doSearch(e) {
      if (e !== null) {
        // Keycode 13 == 'Enter' key
        if (e.keyCode === 13) {
          this.resetInfiniteScroll();
        }
      } else {
        this.resetInfiniteScroll();
      }
    },
    doCaptializeWord(w) {
      return capitalize(w);
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    this.resetInfiniteScroll();
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted() {
    this.fetchDepartment();
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/components/nomination-list.scss";
</style>
