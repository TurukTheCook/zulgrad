<template>
  <div class="login d-flex flex-column align-items-center justify-content-center">
    <form class="form-signin border shadow bg-dark" @submit.prevent="signIn">
      <img class="img-fluid mb-4" v-lazy="loginBrand">
      <h1 class="h3 mb-3 font-weight-normal cursor-default text-center">Please sign in</h1>
      <label for="inputEmail"><span>Email address</span></label>
      <input type="email" id="inputEmail" class="form-control" required autofocus>
      <label for="inputPassword">Password</label>
      <input type="password" id="inputPassword" class="form-control" required>
      <button class="mt-3 btn btn-lg btn-outline-primary btn-block" type="submit">Sign in</button>
      <p class="mt-4 mb-3 text-center text-muted">Don't have an account ? <router-link :to="{name: 'register'}">Register</router-link></p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginBrand: 'static/img/zulgrad-news-small.jpg'
    }
  },
  methods: {
    signIn() {
      console.log('test signin')
    }
  }
}
</script>
