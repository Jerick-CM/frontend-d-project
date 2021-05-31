<template>
  <section></section>
</template>

<script>
import anonymousPage from '~/mixins/anonymous-page.js';


export default {
  mixins: [anonymousPage],
  mounted() {
    const tenant       = process.env.GRAPH_TENANT;
    const base_url     = process.env.GRAPH_URL;
    const client_id    = process.env.GRAPH_APP_KEY;
    const redirect_url = process.env.GRAPH_REDIRECT_URL;

    window.location.href = `/auth/login/callback`;
  }
}
</script>
