<template>
  <nav id="navbar">
    <div class="desktop-menu container container--flex container--flex-align-item-center no-padding">
      <ul class="list list--inline flex-1 no-padding">
        <li v-for="(menu, idx) in menus" :key="idx"
          @mouseover="iconOnHover(idx)"
          @mouseleave="iconOnHoverStop(idx)">
          <nuxt-link @click.native="activeIcon(idx)" v-if="is_admin || menu.publish" :to="{ path: '/' + menu.pageurl_segment, query: menu.params, hash: menu.hash }" exact>
            <div
              v-bind:style="{ 'background-image': 'url(' + menu.active_icon + ')'}" class="icon"></div>
            <div>{{ menu.menu_name }}</div>
          </nuxt-link>
        </li>
      </ul>
      <ul class="list list--inline container--flex container--flex-align-item-center">
        <li v-if="!isPartnerProfile" class="m-sm-horizontal m-l-0">
          <cart-modal />
        </li>
        <li class="remaining-tokens m-sm-horizontal">
          {{ profile.black_token || 0 }}<br>
          <span>Recognise Others</span>
        </li>
        <li
          v-if="!isPartnerProfile"
          @click="gotoProfile"
          class="remaining-credits m-sm-horizontal clickable">
          {{ profile.credits || 0 }}<br>
          <span>My Rewards</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import NavbarMixin from '~/mixins/navbar';

export default {
  data() {
    return {
      menus: [],
      lastActiveLink: 0
    }
  },
  computed: {
    ...mapGetters({
      isPartnerProfile: 'session/IS_PARTNER',
      is_admin: 'session/IS_ADMIN',
    }),
  },
  mixins: [
    NavbarMixin,
  ],
  created() {
    var menus = [];
    this.$axios.get('/api/page').then(
      function(response){
        var menus = response.data.data.page;
        for (const i in menus) {
          var menu = menus[i];
          menu.reserved = parseInt(menu.reserved);
          menu.params = {};
          if (
            '/' + menu.pageurl_segment == window.location.pathname ||
            '/' + menu.pageurl_segment + '/' == window.location.pathname ||
            menu.pageurl_segment + '/' == window.location.pathname ||
            menu.pageurl_segment == window.location.pathname
          ) {
            this.lastActiveLink = i;
          }
          if (!menu.reserved) {
            /*
            menu.params = {page: menu.pageurl_segment};
            menu.pageurl_segment = 'page';
            if (this.$route.query && this.$route.query.page == menu.params.page) {
             this.lastActiveLink = i;
            }
            */

            menu.pageurl_segment = 'p/' + menu.pageurl_segment;
            if (
              '/' + menu.pageurl_segment == window.location.pathname ||
              '/' + menu.pageurl_segment + '/' == window.location.pathname ||
              menu.pageurl_segment + '/' == window.location.pathname ||
              menu.pageurl_segment == window.location.pathname
            ) {
              this.lastActiveLink = i;
            }
          }
          if (menu.menu_title == "ContactUs") {
            menu.reserved = 0;
            menu.icon = 'phone';
            menu.pageurl_segment = 'faq';
            menu.hash = '#contact-us';
            if (this.$route.hash == menu.hash) {
              this.lastActiveLink = id;
            }
          }
          menu.active_icon = menu.menu_icon;
          menus[i] = menu;
        }
        this.menus = menus;
        this.menus[this.lastActiveLink].active_icon = this.menus[this.lastActiveLink].menu_icon_hover
      }.bind(this)
    );
  },
  methods: {
    gotoProfile() {
      this.$router.push('/profile')
    },
    iconOnHover(id) {
      this.menus[id].active_icon = this.menus[id].menu_icon_hover;
    },
    iconOnHoverStop(id) {
      if (this.lastActiveLink != id) {
        this.menus[id].active_icon = this.menus[id].menu_icon;
      }
    },
    activeIcon(id) {
      this.menus[this.lastActiveLink].active_icon = this.menus[this.lastActiveLink].menu_icon;
      this.lastActiveLink = id;
      this.menus[id].active_icon = this.menus[id].menu_icon_hover;
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/components/navbar.scss";
</style>
