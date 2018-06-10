<template>
  <div class="auth d-flex flex-column align-items-center bg-secondary">
    <loading v-if="loading"></loading>
    <div v-else class="form-auth text-white m-auto p-3">
      <form @submit.prevent="register">
        <img class="img-fluid mb-4" v-lazy="registerBrand">
        <h1 class="h3 mb-3 font-weight-normal cursor-default text-center"><font-awesome-icon icon="user-astronaut"/> New user</h1>
        <div class="form-group mb-2">
          <label for="inputEmail"><font-awesome-icon icon="envelope"/> Email address</label>
          <input v-model="newUser.email" type="email" id="inputEmail" class="form-control" required autofocus>
          <small class="text-primary">Will be used to log you in</small>
        </div>
        <div class="form-group mb-2">
          <label for="inputPassword"><font-awesome-icon icon="unlock-alt"/> Password</label>
          <input v-model="newUser.password" type="password" id="inputPassword" class="form-control" required>
          <small class="text-primary">Must be at least 6 characters</small>
        </div>
        <div class="form-group mb-5">
          <label for="inputPasswordCheck"><font-awesome-icon icon="unlock-alt"/> Confirm Password</label>
          <input v-model="passwordCheck" type="password" id="inputPasswordCheck" class="form-control" required>
          <small class="text-primary">Type your password again</small>
        </div>
        <div class="form-check mb-5">
            <label class="form-check-label" for="inputTOSCheck"><input v-model="tosPrivacy" type="checkbox" id="inputTOSCheck" class="form-check-input" required> By continuing, you agree to the <a href="static/tos-privacy.html" target="_blank" rel="noopener">Terms of Service and Privacy Policy.</a></label>
        </div>
        <div v-if="success == false" class="alert alert-warning m-0 mb-2 w-100">{{message}}</div>
        <div v-if="success == true" class="alert alert-success m-0 mb-2 w-100">{{message}}</div>
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
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'Register',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      registerBrand: 'static/img/zulgrad-register-compressed.jpg',
      calling: false,
      loading: true,
      success: null,
      message: 'An error occured..',
      passwordCheck: null,
      tosPrivacy: null,
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
        return
      } else if (this.newUser.password.length < 6) {
        this.calling = false
        this.success = false
        this.message = "Password is not long enough, minimum 6 characters."
        return
      }
      if (!this.tosPrivacy) {
        this.calling = false
        this.success = false
        this.message = "You must accept the Terms of Service and Privacy Policy before continuing."
        return
      }
      
      this.loading = true
      // axios.get('https://api.ipstack.com/check?access_key=' + process.env.API_KEY + '&fields=country_code,country_name,continent_code,continent_name&language=en')
      http.post('signup', this.newUser)
      .then(res => {
        this.success = res.data.success
        this.message = res.data.message
        setTimeout(() => {
          this.$router.push({ name: 'login' })
          this.calling = false
        }, 1500);
      })
      .catch(err => {
        this.calling = false
        this.loading = false
        this.success = false
        this.message = err.message
        if (err.response.data.message) this.message = err.response.data.message
      })
    }
  },
  created() {
    this.loading = false
  }
}
</script>
