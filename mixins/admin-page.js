export default {
  middleware: 'authenticated',
  layout: 'admin',
  async asyncData({ store, error }) {
    await store.dispatch('session/fetchUserProfile');
    const isAdmin = await store.getters['session/IS_ADMIN'];

    if (!isAdmin) {
      error({ statusCode: 404, message: 'Page not found' });
    }
  },
}
