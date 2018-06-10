<template>
  <div class="welcome d-flex justify-content-center bg-secondary">
    <div class="welcome-inner text-white d-flex flex-column align-items-center justify-content-center">
      <h1 class="text-center cursor-default mb-5">Zulgrad<br><small class="text-muted"><em>The news bringer</em></small></h1>
      <button @click="goToLogin" class="btn btn-lg btn-outline-primary mb-5">Get Started !</button>
      <p>This app allows you to stay up-to-date with the world and select news from various sources,<br>
      or directly view the top-headlines for your country within a category (Business, Sports, etc..)<br><br>
      Create an account to get started, it's free !</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  methods: {
    goToLogin() {
      this.$router.push({name: 'login'})
    }
  }
}
</script>
