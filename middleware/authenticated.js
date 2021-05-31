export default function ({ store, route, redirect }) {
  store.commit('session/CHECK_AND_SET');

  if (!store.getters['session/IS_AUTHENTICATED']) {
    return redirect('/auth/login');
  }
  if (route.name === 'cart') {
    if (store.getters['session/IS_PARTNER']) {
      return redirect('/')
    }
  }
}
