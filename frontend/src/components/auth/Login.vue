<template>
  <div class="login d-flex flex-column align-items-center justify-content-center">
    <loading v-if="loading"></loading>
    <form v-else class="form-signin border shadow bg-dark" @submit.prevent="signIn">
      <img class="img-fluid mb-4" v-lazy="loginBrand">
      <h1 class="h3 mb-3 font-weight-normal cursor-default text-center">Please sign in</h1>
      <div class="form-group mb-2">
        <label for="inputEmail"><span>Email</span></label>
        <input v-model="logAttempt.email" type="email" id="inputEmail" class="form-control" required autofocus>
      </div>
      <div class="form-group mb-5">
        <label for="inputPassword">Password</label>
        <input v-model="logAttempt.password" type="password" id="inputPassword" class="form-control" required>
      </div>
      <div v-if="!success" class="alert alert-warning">{{message}}</div>
      <button class="btn btn-lg btn-outline-primary btn-block" type="submit" :disabled="calling">Sign in</button>
      <p class="mt-4 mb-3 text-center text-muted">Don't have an account ? <router-link :to="{name: 'register'}">Register</router-link></p>
    </form>
  </div>
</template>

<script>
import http from './../../helpers/http.js'
export default {
  name: 'Login',
  data() {
    return {
      loginBrand: 'static/img/zulgrad-login-compressed.jpg',
      calling: false,
      loading: false,
      success: true,
      message: null,
      passwordCheck: null,
      logAttempt: {}
    }
  },
  methods: {
    signIn() {
      this.loading = true
      http.post('login', this.logAttempt)
        .then(res => {
          this.$router.push({ name: 'hello' })
        })
        .catch(err => {
          this.calling = false
          this.loading = false
          this.success = false
          this.message = err.response.data.message
        })
    }
  }
}
</script>
