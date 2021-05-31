<template>
  <div id="received-messages">
    <nomination-list :is-user-nominations="true"
                     :nominations="nominations" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Nominations from '~/components/nominations';


export default {
  mixins: [
    Nominations,
  ],
  computed: {
    ...mapGetters({
      nominations: 'nominations/GET_USER_NOMINATIONS',
    }),
  },
}
</script>


<style lang="scss" scoped>
@import "~/assets/scss/vue/components/received-messages.scss";
</style>
