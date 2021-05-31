<template>
  <section id="sign-off" class="page center-align">
    <h1 class="no-margin">Signing off...</h1>
  </section>
</template>

<script>
import anonymousPage from '~/mixins/anonymous-page.js';


export default {
  mixins: [anonymousPage],
  mounted() {
    this.$store
        .dispatch('session/logout')
        .then(() => {
          this.$router.replace({ name: 'auth-login' });
        })
        .catch(() => {
          this.$router.replace({ name: 'auth-login' });
        });
  },
}
</script>
