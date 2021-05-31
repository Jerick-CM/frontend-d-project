export default {
  middleware: 'authenticated',
  layout: 'default',
  async mounted() {
    this.$store.commit('ranking/SET_FIXTURE');
    this.$store.commit('badges/SET_FIXTURE');

    try {
      await this.$store.dispatch('session/fetchUserProfile');
      await this.$store.dispatch('organization/fetchUsers');
      await this.$store.dispatch('badges/fetchUserBadges');
      await this.$store.dispatch('cart/fetch');
    } catch (error) {
      error({ statusCode: 404, message: 'Page not found' });
      this.$toast.error(error);
    }
  },
}
