// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { SSL_OP_COOKIE_EXCHANGE } from 'constants'

// CSS
import '@/assets/css/bootstrap-superhero-custom.min.css'
import '@/assets/scss/styles.scss'

// JS
import '../node_modules/jquery/dist/jquery'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

// PROGRESS BAR
import VueProgressBar from 'vue-progressbar'
const options = {
  color: '#23f0ff',
  failedColor: '#ff3030',
  thickness: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options)

// LAZY-LOAD IMG
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: 'static/img/image_not_found.jpg',
  loading: 'static/img/loading_icon.gif',
  attempt: 1
})

// CONFIG
// Vue.config.productionTip = false
// Vue.config.productionTip = process.env.NODE_ENV === 'production'

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
