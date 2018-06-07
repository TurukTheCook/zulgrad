<template>
<div>
  <div v-if="!success" class="alert alert-danger m-0 mb-2 w-100">{{message}}</div>
  <loading v-if="loading"></loading>
  <div v-else class="news-container d-flex flex-column">
    <nav class="navbar sticky-top navbar-expand-md navbar-dark bg-dark mb-2">
      <div class="container border-bottom">
          <button class="navbar-toggler mb-1" type="button" data-toggle="collapse" data-target="#sidemenu" aria-controls="sidemenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        <router-link class="navbar-brand text-primary mb-1" :to="{name: 'home'}">Zulgrad <small class="text-muted">The News Bringer</small></router-link>
          <div class="d-flex flex-row collapse show" id="navbarColor02">
            <ul class="navbar-nav flex-row ml-auto">
              <li class="nav-item px-2">
                <router-link class="nav-link link-hover-primary" :to="{name: 'profile'}" data-toggle="tooltip" data-placement="auto" title="Profile"><font-awesome-icon class="hover-primary" icon="portrait"/></router-link>
              </li>
              <li class="nav-item px-2">
                <router-link class="nav-link link-hover-primary" :to="{name: 'about'}" data-toggle="tooltip" data-placement="auto" title="About"><font-awesome-icon class="hover-primary" icon="info-circle"/></router-link>
              </li>
              <li class="nav-item px-2">
                <a class="nav-link link-hover-primary cursor-pointer" v-on:click.prevent="logout" data-toggle="tooltip" data-placement="auto" title="Logout"><font-awesome-icon class="hover-primary" icon="door-open"/></a>
              </li>
            </ul>
          </div>
      </div>
    </nav>
    <main class="sidebar-wrapper container d-flex my-3 align-items-start navbar-expand-md">
      <side-bar :mods="groups"></side-bar>
      <div class="news-container-inner d-flex flex-row align-items-start justify-content-center w-100 mx-auto">
        <!-- IF NEEDED, reload watch fullpath ->  :key="$route.fullPath" -->
        <router-view class="news-main-content flex-grow" :key="$route.fullPath"></router-view>
      </div>
    </main>
    <footer class="text-white bg-dark mt-auto">
      <div class="container d-flex flex-column flex-sm-row justify-content-between p-2">
        <p class="p-2 mb-0">Zulgrad "The News Bringer" - <font-awesome-icon icon="copyright"/> 2018</p>
        <p class="p-2 mb-0">
          - News delivered by <a href="https://newsapi.org/" target="_blank">NewsAPI</a><br>
          - Cryptocurrencies prices delivered by <a href="https://coinmarketcap.com/" target="_blank">CoinMarketCap</a>
        </p>
      </div>
    </footer>
  </div>
</div>
</template>

<script>
import LoadingComponent from './../LoadingComponent'
import ErrorComponent from './../ErrorComponent'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import http from '@/helpers/http'
import { mapGetters } from 'vuex'

export default {
  name: "Home",
  components: {
    'side-bar' : () => ({
      component: import('./Sidebar'),
      loading: LoadingComponent,
      error: ErrorComponent,
      delay: 10,
      timeout: 15000
    }),
    FontAwesomeIcon
  },
  data() {
    return {
      loading: true,
      success: true,
      message: null
    }
  },
  computed: {
    ...mapGetters(['groups'])
  },
  methods: {
    logout() {
      localStorage.removeItem('X-Token');
      this.$router.push({name: 'welcome'})
    },
    fetchData() {
      this.$store.dispatch('asyncGetGroups')
        .then(res => {
          // let firstList = this.groups[0]
          // let firstModule = firstList.modules[0]
          // if (firstModule) {
          //   this.$router.replace({name: 'modules', params: { mod: { name: firstModule.name, label: firstModule.label, args: firstModule.args } }, query: {id: firstModule._id}})
          // } else {
          //   this.$router.push({name: 'news.manage'})
          // }
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.success = false
          this.message = err.message
        })
    }
  },
  created() {
    this.fetchData()
  }
};
</script>