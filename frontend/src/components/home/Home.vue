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
        <router-link class="navbar-brand text-primary mb-1" to="/">Zulgrad <small class="text-muted">The News Bringer</small></router-link>
          <div class="d-flex flex-row collapse show" id="navbarColor02">
            <ul class="navbar-nav flex-row ml-auto">
              <!-- <li class="nav-item px-2">
                <router-link class="nav-link link-hover-primary" :to="{name: 'modules'}"><font-awesome-icon class="hover-primary" icon="home"/></router-link>
              </li> -->
              <li class="nav-item px-2">
                <router-link class="nav-link link-hover-primary" :to="{name: 'profile'}"><font-awesome-icon class="hover-primary" icon="portrait"/></router-link>
              </li>
              <li class="nav-item px-2">
                <router-link class="nav-link link-hover-primary" :to="{name: 'about'}"><font-awesome-icon class="hover-primary" icon="info-circle"/></router-link>
              </li>
              <li class="nav-item px-2">
                <a class="nav-link link-hover-primary cursor-pointer" v-on:click.prevent="logout"><font-awesome-icon class="hover-primary" icon="door-open"/></a>
              </li>
            </ul>
          </div>
      </div>
    </nav>
    <main class="sidebar-wrapper container d-flex my-3 align-items-start navbar-expand-md">
      <side-bar :mods="groups"></side-bar>
      <div class="news-container-inner d-flex flex-row align-items-start justify-content-around w-100 mx-auto">
        <!-- <nav class="collapse navbar-collapse mr-3 mb-3" id="sidemenu">
          <ul class="news-side-menu nav flex-column">
            <li class="nav-item bg-secondary border">
              <router-link class="nav-link text-white link-hover-primary" :to="{name: 'news.manage', params: { groups: mods }}"><font-awesome-icon icon="cubes"/> News Modules <span class="float-right"><font-awesome-icon class="hover-primary" icon="plus-circle"/></span></router-link>
              <div>
                <ul class="nav flex-column">
                  <li v-for="(obj, index) in mods" :key="index" class="nav-item bg-primary">
                    <a class="nav-link text-white border cursor-pointer" data-toggle="collapse" :data-target="'#' + index">{{obj.name}}</a>
                    <div :id="index" class="collapse show">
                      <ul class="nav flex-column bg-white pl-3">
                        <li v-for="item in obj.modules" :key="item._id" class="nav-item">
                          <router-link class="nav-link active" :to="{name: 'modules', params: { mod: { name: item.name, label: item.label, args: item.args } }, query: { id: item._id}}">
                            {{item.name}}
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item bg-white text-dark p-2">
                    <button class="btn btn-block btn-outline-primary" @click="toModulesManage()">Add a module</button>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item bg-secondary border">
              <router-link class="nav-link text-white" :to="{name: 'favs'}"><font-awesome-icon icon="star"/> Favs</router-link>
            </li>
            <li class="nav-item bg-secondary border">
              <router-link class="nav-link text-white" :to="{name: 'history'}"><font-awesome-icon icon="clock"/> History</router-link>
            </li>
          </ul>
        </nav> -->
        
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
          let firstList = this.groups[0]
          let firstModule = firstList.modules[0]
          if (firstModule) {
            this.$router.replace({name: 'modules', params: { mod: { name: firstModule.name, label: firstModule.label, args: firstModule.args } }, query: {id: firstModule._id}})
          } else {
            this.$router.push({name: 'news.manage'})
          }
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