<template>
  <div class="welcome d-flex align-items-center justify-content-center">
    <div class="welcome-inner d-flex flex-column align-items-center justify-content-center shadow">
      <h1 class="text-center cursor-default mb-5">Zulgrad<br><small class="text-muted"><em>The news bringer</em></small></h1>
      <button @click="goToLogin" class="btn btn-lg btn-outline-primary">Get Started !</button>
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
