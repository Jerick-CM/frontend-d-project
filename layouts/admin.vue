<template>
  <div class="layout--admin">
    <header>
      <div class="container container--flex container--flex-align-item-center no-padding">
        <h2 class="site-title title no-margin flex-1 clickable">
          <nuxt-link :to="{ name: 'index' }">
            <img src="~/assets/img/ace-logo.jpg" alt="ACE" width="55" />
            <span class="krypton-green">A</span>PPRECIATE<span class="krypton-green">.</span> <span class="krypton-green">C</span>ELEBRATE<span class="krypton-green">.</span> <span class="krypton-green">E</span>LEVATE<span class="krypton-green">.</span>
          </nuxt-link>
        </h2>
        <nuxt-link class="btn admin-btn m-lg-horizontal" :to="{ name: 'index' }">
          Back
        </nuxt-link>
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
import Navbar from '~/components/NavbarAdmin.vue';


export default {
  components: {
    Searchbar,
    Navbar,
  },
  computed: {
    ...mapGetters({
      isAdmin: 'session/IS_ADMIN',
    }),
  },
}
</script>


<style lang="scss" scoped>
@import "~/assets/scss/vue/layouts/admin.scss";
</style>
