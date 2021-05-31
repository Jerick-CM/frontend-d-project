<template>
  <div id="reward-selection-list">
    <div class="title container--flex container--flex-align-item-center pb-3">
      <div class="flex-1 px-0">
        <v-select
          id="sort"
          class="px-0"
          name="sort"
          v-model="sort"
          :items="sortOptions"
          item-text="text"
          item-value="value"
          label="Sort by"
          color="light-green lighten-1"
          :hide-details="true"
          outline
        ></v-select>
      </div>
      <div class="flex-1" v-if="sort === SORT_TYPES.CATEGORY">
        <v-select
          id="categoryFilter"
          name="categoryFilter"
          v-model="categoryFilter"
          :items="categories"
          item-text="name"
          class="px-0"
          item-value="id"
          label="Filter by"
          placeholder="Select category"
          color="light-green lighten-1"
          :hide-details="true"
          outline
        ></v-select>
      </div>
      <div class="flex-2 hidden-sm-and-down">
        <div v-if="isSearching">
          <v-btn color="light-green lighten-1"
                 class="white--text"
                 @click="clearSearch()">
            Exit search
          </v-btn>
          <span>Search result for "{{ searchResult }}"</span>
        </div>
      </div>
      <div class="flex-1 container--flex ">
        <v-text-field
          class="pt-0"
          v-model="search"
          label="Search"
          color="light-green lighten-1"
          single-line
          hide-details
          @keyup="doSearch"
        ></v-text-field>
        <v-btn icon flat @click.prevent="doSearch(null)">
          <v-icon>search</v-icon>
        </v-btn>
      </div>
    </div>

    <no-ssr>
      <div class="container"
           v-masonry
           transition-duration="0.3s"
           v-bind:horizontal-order="true"
           v-bind:gutter="8"
           stagger="0.03s"
           style="padding: 0 0 24px;">
        <reward-selection-item
          v-for="(i, idx) in filteredRewards"
          class="grid-item"
          v-bind:key="idx"
          v-bind:item="i"
          v-bind:is-addable="!isPartnerProfile"
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
      <div slot="no-more">All items have been loaded</div>
      <div slot="no-results">No Search Results Found</div>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import { mapGetters } from 'vuex';

import RewardSelectionItem from './RewardSelectionItem';

const MASONRY_DRAW_DELAY = 300;
const SEARCH_DELAY = 300;
const SORT_TYPES = {
  LATEST: 'created_at:desc',
  TOKEN_LOW_TO_HIGH: 'unit_price:asc',
  TOKEN_HIGH_TO_LOW: 'unit_price:desc',
  CATEGORY: 0,
};

export default {
  data() {
    return {
      SORT_TYPES,

      page: 1,
      sort: SORT_TYPES.TOKEN,

      infiniteIdentifier: new Date(),

      searchResult: '',
      search: '',
      categoryFilter: null,
      timeoutID: null,

      isSearching: false,
      categories: [],

      sortOptions: [
        { text: 'Tokens (Low to high)', value: SORT_TYPES.TOKEN_LOW_TO_HIGH },
        { text: 'Tokens (High to low)', value: SORT_TYPES.TOKEN_HIGH_TO_LOW },
        { text: 'Latest items', value: SORT_TYPES.LATEST },
        { text: 'Category', value: SORT_TYPES.CATEGORY },
      ],
    };
  },
  mounted() {
    this.getCategories();
  },
  components: {
    RewardSelectionItem,
    InfiniteLoading,
  },
  computed: {
    ...mapGetters({
      rewards: 'rewards/GET',
      cartItems: 'cart/GET_ITEMS',
      isPartnerProfile: 'session/IS_PARTNER',
    }),
    rewardItems() {
      return this.rewards
                 .map(r => {
                  return {
                    ...r,
                    cartCount: this.cartItems
                                   .filter(i => i.id === r.id)
                                   .map(i => i.quantity)
                                   .reduce((acc, cur) => cur, 0)
                  };
                 })
    },
    filteredRewards() {
      switch(this.sort) {
        case SORT_TYPES.TOKEN:
          return this.rewardItems
                     .filter(r => r.is_visible === 1);
        default:
          return this.rewardItems
                     .filter(r => r.is_visible === 1);
      }
    },
  },
  watch: {
    sort(newVal, oldVal) {
      if (this.sort !== SORT_TYPES.CATEGORY) {
        this.categoryFilter = null;
      }
      this.resetInfiniteScroll();
    },
    categoryFilter() {
      if (this.categoryFilter !== null) {
        this.resetInfiniteScroll();
      }
    },
  },
  methods: {
    getCategories() {
      const payload = { paginate: 0 };

      this.$axios
          .get(this.$queryBuilder('/categories', payload))
          .then((res) => {
            this.categories = res.data;
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
    async infiniteHandler($state) {
      try {
        const payload = {
          page: this.page++,
          search: (this.search) ? this.search : null,
          category: (this.categoryFilter) ? this.categoryFilter : null,
          sort: this.sort,
        };

        const result = await this.$store.dispatch('rewards/fetch', payload);
        this.searchResult = this.search;

        if (result.data.length === 0) {
          $state.complete();
        } else {
          $state.loaded();
        }
      } catch (error) {
        console.error(error);
      }

      setTimeout(() => {
        this.$redrawVueMasonry();
      }, MASONRY_DRAW_DELAY);
    },
    resetInfiniteScroll() {
      if (this.search.length > 0 ) {
        this.isSearching = true;
      } else {
        this.isSearching = false;
      }

      this.infiniteIdentifier += 1;
      this.page = 1;
      this.$store.commit('rewards/CLEAR');
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
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    this.resetInfiniteScroll();
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/components/reward-selection-list.scss";
</style>
