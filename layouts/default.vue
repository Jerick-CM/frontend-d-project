<template>
  <div class="layout--default">
    <header>
      <div class="container container--flex container--flex-align-item-center no-padding">
        <h2 class="site-title title no-margin flex-1 clickable">
          <nuxt-link :to="{ name: 'index' }">
            <img src="~/assets/img/ace-logo.jpg" alt="ACE" width="55" />
            <span class="krypton-green">A</span>PPRECIATE<span class="krypton-green">.</span> <span class="krypton-green">C</span>ELEBRATE<span class="krypton-green">.</span> <span class="krypton-green">E</span>LEVATE<span class="krypton-green">.</span>
          </nuxt-link>
        </h2>
        <nuxt-link class="btn admin-btn m-lg-horizontal" :to="{ name: 'a-ace-store-inventory-management' }" v-if="isAdmin">
          Admin
        </nuxt-link>
        <a @click.prevent="doLogout"
           class="btn admin-btn mr-2"
           href="#">
          Logout
        </a>
        <v-toolbar-side-icon dark @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
        <v-navigation-drawer
          fixed
          v-model="drawerRight"
          right
          clipped
          app
          disable-resize-watcher>
          <v-list dense>
            <v-list-tile
              v-for="(i, idx) in navItems"
              v-bind:key="idx"
              v-bind:class="{ 'active': isActive(i.name) }"
              @click="goto(i.name)">
              <v-list-tile-action>
                <div class="icon" :class="getClass(i.name)"></div>
              </v-list-tile-action>
              <v-list-tile-content>
                {{ i.title }}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-bind:class="{ 'active': isActive('faq') }"
              @click="goto('faq')">
              <v-list-tile-action>
                <div class="icon faq"></div>
              </v-list-tile-action>
              <v-list-tile-content>
                FAQ
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-if="!isPartnerProfile"
              v-bind:class="{ 'active': isActive('cart') }"
              @click="goto('cart')">
              <v-list-tile-action>
                <div class="icon cart"></div>
              </v-list-tile-action>
              <v-list-tile-content>
                <div class="item-count" v-if="itemCount > 0">{{ itemCount }}</div>
                Cart
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <div class="remaining-tokens m-sm-horizontal">
                  {{ profile.black_token || 0 }}<br>
                  <span>Rewards</span>
                </div>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="mt-3">
              <v-list-tile-content>
                <div class="remaining-credits m-sm-horizontal">
                  {{ profile.credits || 0 }}<br>
                  <span>Recognised</span>
                </div>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </div>
    </header>

    <navbar />

    <v-app>
      <nuxt/>
    </v-app>

    <footer class="center">
      <small>&copy; 2020 Deloitte Southeast Asia</small>
    </footer>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

import Searchbar from '~/components/Searchbar.vue';
import Navbar from '~/components/Navbar.vue';


export default {
  components: {
    Searchbar,
    Navbar,
  },
  computed: {
    ...mapGetters({
      isAdmin: 'session/IS_ADMIN',
      itemCount: 'cart/GET_ITEM_COUNT',
      isPartnerProfile: 'session/IS_PARTNER',
      profile: 'session/GET_PROFILE',
    }),
  },
  data() {
    return {
      drawerRight: false,
      navItems: [
        { name: 'index', icon: '/img/icons/home-ico.svg', title: 'Home' },
        { name: 'profile', icon: '/img/icons/person-ico.svg', title: 'Profile' },
        { name: 'redeem', icon: '/img/icons/gift-ico.svg', title: 'Redeem' },
      ],
    };
  },
  methods: {
    goto(name) {
      this.drawerRight = !this.drawerRight;
      this.$router.push({ name });
    },
    getClass(name) {
      switch(name) {
        case 'index':
        case 'Home':
          return { 'index': true };
        case 'admin':
          return { 'admin': true };
        case 'profile':
        case 'Profile':
          return { 'profile': true };
        case 'redeem':
        case 'Redeem':
          return { 'redeem': true };
        case 'faq':
        case 'FAQ':
          return { 'faq': true };
      }
    },
    isActive(name) {
      return this.$route.name === name;
    },
    doLogout(evt) {
      evt.preventDefault();

      this.$store.commit('organizations/CLEAR');
      this.$store.commit('nominations/CLEAR');
      this.$store.commit('session/CLEAR');
      this.$store.commit('rewards/CLEAR');
      this.$store.commit('badges/CLEAR');
      this.$store.commit('cart/CLEAR');

      const baseURL     = process.env.GRAPH_URL;
      const redirectURL = process.env.GRAPH_LOGOUT_URL;

      window.location.href = `${baseURL}/common/oauth2/logout?post_logout_redirect_uri=${redirectURL}`;
    },
  },
}
</script>


<style lang="scss" scoped>
@import "~/assets/scss/vue/layouts/default.scss";
</style>
