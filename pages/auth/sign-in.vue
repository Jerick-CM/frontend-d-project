<template>
  <section id="sign-in" class="page">
    <div class="page-header">
      <div class="container">
        <p>REWARDS PORTAL</p>
      </div>
    </div>
    <div class="container">
      <div class="logo">
        <img src="~/assets/img/logo.svg" class="responsive-img" alt="Deloitte" />
      </div>
      <form class="form" @submit.prevent="doLogin()">
        <p class="form-title">REWARD PORTAL LOGIN</p><br>
        <div class="input-group">
          <label for="username">Username</label>
          <input v-model="form.username" id="username" class="form-input" type="text" required>
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input v-model="form.password" id="password" class="form-input" type="password" required>
        </div>
        <div class="controls center-align">
          <button class="btn" type="submit">LOGIN</button><br>
          <a href="#">FORGOT PASSWORD?</a>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import anonymousPage from '~/mixins/anonymous-page.js';


export default {
  mixins: [anonymousPage],
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    // @todo implement API request on login
    doLogin() {
      this.$router.replace({ name: 'auth-signed-in' });
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/auth/sign-in.scss";
</style>

