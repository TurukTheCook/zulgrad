<template>
  <div class="login d-flex flex-column align-items-center justify-content-center">
    <form class="form-signin border shadow bg-dark" @submit.prevent="register">
      <img class="img-fluid mb-4" v-lazy="registerBrand">
      <h1 class="h3 mb-3 font-weight-normal cursor-default text-center">New account</h1>
      <label for="inputUsername">Username</label>
      <input type="text" id="inputUsername" class="form-control" required autofocus>
      <label for="inputEmail">Email address</label>
      <input type="email" id="inputEmail" class="form-control" required>
      <label for="inputPassword">Password</label>
      <input type="password" id="inputPassword" class="form-control" required>
      <button class="mt-3 btn btn-lg btn-outline-primary btn-block" type="submit">Register</button>
      <p class="mt-4 mb-3 text-center text-muted">Already have an account ? <router-link :to="{name: 'login'}">Sign in</router-link></p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      registerBrand: 'static/img/zulgrad-news-small-2.jpg'
    }
  },
  methods: {
    register() {
      console.log('test register')
    }
  }
}
</script>
