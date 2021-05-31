<template>
  <div id="admin">
    <div class="container no-padding">
      <h1 class="no-margin-top capitalize">Admin Page</h1>
    </div>
  </div>
</template>

<script>
import adminPage from '~/mixins/admin-page.js';


export default {
  mixins: [
    adminPage,
  ],
data() {
    return {
      table: {
        headers: [
          { text: 'Tables', value: 'name', align: 'left', sortable: true },
        ],
      },
    };
  },
  methods: {
    gotoModelPage(url) {
      this.$router.push(url);
    },
  },
}
</script>

