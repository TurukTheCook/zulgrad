<template>
  <div class="auth d-flex flex-column align-items-center bg-secondary">
    <loading v-if="loading"></loading>
    <div v-if="!loading" class="form-auth text-white m-auto p-3">
      <form @submit.prevent="signIn">
        <img class="img-fluid mb-4" v-lazy="loginBrand">
        <h1 class="h3 mb-3 font-weight-normal cursor-default text-center"><font-awesome-icon icon="user-ninja"/> Please sign in</h1>
        <div class="form-group mb-2">
          <label for="inputEmail"><span><font-awesome-icon icon="envelope"/> Email</span></label>
          <input v-model="logAttempt.email" type="email" id="inputEmail" class="form-control" required autofocus>
        </div>
        <div class="form-group">
          <label for="inputPassword"><font-awesome-icon icon="unlock-alt"/> Password</label>
          <input v-model="logAttempt.password" type="password" id="inputPassword" class="form-control" required>
        </div>
        <div v-if="!success" class="alert alert-danger m-0 mb-2 w-100">{{message}}</div>
        <button class="btn btn-lg btn-outline-primary btn-block mb-2" type="submit" :disabled="calling">Sign in</button>
        <p class="text-center text-muted">Don't have an account ? <router-link :to="{name: 'register'}">Register</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import http from './../../helpers/http.js'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'Login',
  components: {
    FontAwesomeIcon
  },
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
          localStorage.setItem('X-Token', 'this is a token')
          this.$router.push({ name: 'modules' })
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
