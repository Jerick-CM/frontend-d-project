<template>
  <section id="signed-in" class="page center-align">
    <h1 class="no-margin">Signing in...</h1>
  </section>
</template>

<script>
import anonymousPage from '~/mixins/anonymous-page.js';


export default {
  mixins: [anonymousPage],
  mounted() {
    // Dummy emulation on redirecting user...
    // @todo replace with actual login request

    this.$store.commit('badges/SET_FIXTURE');
    this.$store.commit('rewards/SET_FIXTURE');
    this.$store.commit('ranking/SET_FIXTURE');

    this.$store.dispatch('nominations/fetchAll');
    this.$store.dispatch('nominations/fetchUserNominations');
    this.$store.dispatch('badges/fetchUserBadges');
    this.$store.dispatch('session/fetchUserProfile');
    this.$store.dispatch('organization/fetchUsers');

    this.$axios.defaults.withCredentials = true;
    this.$axios
        .$get(`${process.env.API_URL}/user`)
        .then((res) => {
          console.log(res);
        }).catch((err) => {
          console.error(err);
        })
        .finally(() => {
          // this.$router.replace({ name: 'index' });
        });

    // setTimeout(() => {
    //   this.$router.replace({ name: 'index' });
    // }, 3000);
  },
}
</script>
