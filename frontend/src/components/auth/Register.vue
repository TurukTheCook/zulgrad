<template>
  <div class="auth d-flex flex-column align-items-center bg-secondary">
    <loading v-if="loading"></loading>
    <div v-else class="form-auth text-white m-auto p-3">
      <form @submit.prevent="register">
        <img class="img-fluid mb-4" v-lazy="registerBrand">
        <h1 class="h3 mb-3 font-weight-normal cursor-default text-center">New user</h1>
        <div class="form-group mb-2">
          <label for="inputEmail">Email address</label>
          <input v-model="newUser.email" type="email" id="inputEmail" class="form-control" required autofocus>
          <small class="text-primary">Will be used to log you in</small>
        </div>
        <div class="form-group mb-2">
          <label for="inputPassword">Password</label>
          <input v-model="newUser.password" type="password" id="inputPassword" class="form-control" required>
          <small class="text-primary">Must be longer than 8 characters</small>
        </div>
        <div class="form-group mb-5">
          <label for="inputPasswordCheck">Confirm Password</label>
          <input v-model="passwordCheck" type="password" id="inputPasswordCheck" class="form-control" required>
          <small class="text-primary">Type your password again</small>
        </div>
        <div v-if="!success" class="alert alert-warning m-0 mb-2 w-100">{{message}}</div>
        <button class="btn btn-lg btn-outline-primary btn-block mb-2" type="submit" :disabled="calling">Register</button>
        <p class="text-center text-muted">Already have an account ? <router-link :to="{name: 'login'}">Sign in</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import http from '../../helpers/http'
// import adapter from 'axios/lib/adapters/xhr';

export default {
  name: 'Register',
  data() {
    return {
      registerBrand: 'static/img/zulgrad-register-compressed.jpg',
      calling: false,
      loading: false,
      success: true,
      message: null,
      passwordCheck: null,
      newUser: {}
    }
  },
  methods: {
    register() {
      this.calling = true
      if (this.newUser.password != this.passwordCheck) {
        this.calling = false
        this.success = false
        this.message = "Passwords don't match.. please try again."
      }
      else {
        this.loading = true
        // axios.get('https://jsonip.com')
        // axios.get('https://api.ipify.org?format=json')
        axios.get('http://api.ipstack.com/check?access_key=' + process.env.API_KEY + '&fields=country_code,country_name,continent_code,continent_name&language=en')
          .then(res => {
            let newUser = this.newUser
            let data = {
              countryContinent: {
                countryCode: res.data.country_code,
                countryName: res.data.country_name,
                continentCode: res.data.continent_code,
                continentName: res.data.continent_name
              },
              newUser
            };
            console.log('data', data.countryContinent)
            http.post('signup', data)
              .then(res => {
                this.$router.push({ name: 'login' })
              })
              .catch(err => {
                this.calling = false
                this.loading = false
                this.success = false
                this.message = err.response.data.message
              })
          })
          .catch(err => {
            console.log(err)
            this.calling = false
            this.loading = false
          })
      }
    }
  }
}
</script>
