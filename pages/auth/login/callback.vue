<template>
  <section id="callback" class="page center-align">
    <h1 class="ma-0 pt-5" v-if="!hasError">Signing in...</h1>
    <h1 class="ma-0 pt-5" v-else>You cannot access the site. Please contact the administrator</h1>
  </section>
</template>

<script>
import anonymousPage from '~/mixins/anonymous-page.js';


export default {
  mixins: [anonymousPage],
  mounted() {
    this.authenticateUser();
  },
  asyncData(params) {
    let query = {};

    for (let key in params.query) {
      query[key] = params.query[key]
    }

    return {
      query: query,
    }
  },
  methods: {
    async authenticateUser() {
      
    try {
        const auth = await this.$store.dispatch('session/authenticate', this.query);
        const profile = await this.$store.dispatch('session/fetchUserProfile');

        if (auth && profile) {
          this.$router.replace('/');
        } else {
          this.hasError = true;
          this.$store
              .dispatch('session/logout')
              .then((res) => {
                console.log(res);
              });
        }
      } catch(error) {
        this.hasError = true;
        this.$toast.error(error);
      }
    },
  },
  data() {
    return {
      hasError: false,
    };
  },
}
</script>
