<template>
  <div class="news-container d-flex flex-column">
    <nav class="navbar sticky-top navbar-expand-md navbar-dark bg-dark mb-2">
      <div class="container border-bottom">
          <button class="navbar-toggler mb-1" type="button" data-toggle="collapse" data-target="#sidemenu" aria-controls="sidemenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        <router-link class="navbar-brand text-primary mb-1" to="/">Zulgrad <small class="text-muted">The News Bringer</small></router-link>
          <div class="d-flex flex-row collapse show" id="navbarColor02">
            <ul class="navbar-nav flex-row ml-auto">
              <li class="nav-item active px-2">
                <router-link class="nav-link" :to="{name: 'modules'}"><font-awesome-icon icon="home"/></router-link>
              </li>
              <li class="nav-item px-2">
                <router-link class="nav-link" :to="{name: 'profile'}"><font-awesome-icon icon="portrait"/></router-link>
              </li>
              <li class="nav-item px-2">
                <a class="nav-link" href="" v-on:click.prevent="logout"><font-awesome-icon icon="door-open"/></a>
              </li>
            </ul>
          </div>
      </div>
    </nav>
    <main class="container d-flex my-3">
      <div class="news-container-inner navbar-expand-md d-flex flex-row align-items-start justify-content-around w-100 mx-auto">
        <div class="collapse navbar-collapse mr-3 mb-3" id="sidemenu">
          <ul class="news-side-menu nav flex-column">
            <li class="nav-item bg-secondary border">
              <div class="d-flex justify-content-between">
                <a class="p-3 cursor-pointer text-white modules-link" data-toggle="collapse" data-target="#modules"><font-awesome-icon icon="cubes"/> Modules</a>
                <a class="p-3 cursor-pointer text-white modules-add"><font-awesome-icon icon="plus-circle"/></a>
              </div>
              <div id="modules" class="collapse show">
                <ul class="nav flex-column bg-white pl-3">
                  <li class="nav-item">
                    <a class="nav-link active" href="#">mod 1</a>
                  </li>
                  <li class="nav-item ">
                    <a class="nav-link" href="#">mod 2</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">mod 3</a>
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
        </div>
        <router-view class="news-main-content flex-grow"></router-view>
      </div>
    </main>
    <footer class="text-white bg-dark mt-auto">
      <div class="container d-flex flex-column flex-sm-row justify-content-between p-2">
        <p>Zulgrad "The News Bringer" - <font-awesome-icon icon="copyright"/> 2018</p>
        <p>
          - News delivered by <a href="https://newsapi.org/" target="_blank">NewsAPI</a><br>
          - Cryptocurrencies prices delivered by <a href="https://coinmarketcap.com/" target="_blank">CoinMarketCap</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: "Home",
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      modules: []
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('X-Token');
      this.$router.push({name: 'welcome'})
    }
  }
};
</script>