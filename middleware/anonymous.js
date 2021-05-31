export default function ({ store, redirect }) {
  store.commit('session/CHECK_AND_SET');
  if (store.getters['session/IS_AUTHENTICATED']) {
    return redirect('/');
  }
}
