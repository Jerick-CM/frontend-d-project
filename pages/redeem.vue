<template>
  <div id="redeem" class="page">
    <div class="container no-padding">
      <div class="center-align" v-if="isFetching">
        <v-progress-circular
          class="center-block"
          :size="50"
          color="primary"
          indeterminate>
        </v-progress-circular>
      </div>
      <div v-if="banners.length > 0 && !isFetching">
        <carousel>
          <carousel-item v-for="(banner, idx) in banners" :key="idx" :action="banner.action">
            <a :href="banner.action"
               :target="banner.is_open_in_new_tab ? '_blank' : '_self'"
               v-if="banner.action && banner.action !== '#'">
              <div :style="getBannerStyle(banner.file_url)">
              </div>
            </a>
            <div :style="getBannerStyle(banner.file_url)" v-else></div>
          </carousel-item>
        </carousel>
      </div>

      <div class="p-lg-vertical">
        <reward-selection-list />
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import authenticatedPage from '~/mixins/authenticated-page.js';

import Carousel from '~/components/carousel';
import RewardSelectionList from '~/components/reward-selection';


export default {
  mixins: [
    authenticatedPage,

    // Components
    RewardSelectionList,
    Carousel,
  ],
  data() {
    return {
      isFetching: false,
      banners: [],
    };
  },
  mounted() {
    this.isFetching = true;
    this.$axios
        .get(this.$queryBuilder('/banners', { rpp: 0, type: 1 }))
        .then((res) => {
          const filteredData = res.data.data.map(b => {
            return {
              ...b,
              action: this.updateURL(b.action)
            }
          });

          this.banners = filteredData;
        })
        .catch((err) => {
          this.$toast.error(err.response.message);
        })
        .finally(() => {
          this.isFetching = false;
        });
  },
  methods: {
    getBannerStyle(imgURL) {
      return {
        backgroundImage: `url(${imgURL})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#000',
        backgroundSize: '100%',
        width: '100%',
        height: '100%',
      };
    },
    updateURL(url) {
      if (url) {
        const regex = /(http:\/\/|www\.)/;
        return url.replace(regex, 'https://')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/redeem.scss";
</style>
