<template>
  <div class="login d-flex flex-column align-items-center justify-content-center">
    <form class="form-signin border shadow bg-dark" @submit.prevent="register">
      <img class="img-fluid mb-4" v-lazy="registerBrand">
      <h1 class="h3 mb-3 font-weight-normal cursor-default text-center">New user</h1>
      <div class="form-group mb-2">
        <label for="inputEmail">Email address</label>
        <input type="email" id="inputEmail" class="form-control" required autofocus>
        <small class="text-primary">Will be used to log you in</small>
      </div>
      <div class="form-group mb-2">
        <label for="inputPassword">Password</label>
        <input type="password" id="inputPassword" class="form-control" required>
        <small class="text-primary">Must be longer than 8 characters</small>
      </div>
      <div class="form-group mb-5">
        <label for="inputPasswordCheck">Confirm Password</label>
        <input type="password" id="inputPasswordCheck" class="form-control" required>
        <small class="text-primary">Type your password again</small>
      </div>
      <button class="btn btn-lg btn-outline-primary btn-block" type="submit" :disabled="calling">Register</button>
      <p class="mt-4 mb-3 text-center text-muted">Already have an account ? <router-link :to="{name: 'login'}">Sign in</router-link></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      registerBrand: 'static/img/zulgrad-news-small-2.jpg',
      calling: false
    }
  },
  methods: {
    register() {
      this.calling = true
      // axios.get('https://jsonip.com')
      // axios.get('https://api.ipify.org?format=json')
      axios.get('http://api.ipstack.com/check?access_key=' + process.env.API_KEY + '&fields=country_code,country_name,continent_code,continent_name&language=en')
        .then(res => {
          console.log(res)
          let test = {
            countryCode: res.data.country_code,
            countryName: res.data.country_name,
            continentCode: res.data.continent_code,
            continentName: res.data.continent_name
          };
          console.log(test)
          this.calling = false
        })
        .catch(err => {
          console.log(err)
          this.calling = false
        })
      console.log('test register')
    }
  }
}
</script>
