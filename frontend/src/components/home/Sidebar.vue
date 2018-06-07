<template>
<nav class="collapse navbar-collapse mr-3 mb-3" id="sidemenu">
  <ul class="news-side-menu nav flex-column">
    <li class="nav-item bg-secondary border">
      <router-link class="nav-link text-white link-hover-primary" :to="{name: 'news.manage', params: { groups: mods }}" data-toggle="tooltip" data-placement="auto" title="Manage modules"><font-awesome-icon icon="cubes"/> News Modules <span class="float-right"><font-awesome-icon class="hover-primary" icon="plus-circle"/></span></router-link>
      <div class="max-50">
        <ul class="nav flex-column nowrap">
          <li v-for="(obj, index) in mods" :key="index" class="nav-item bg-primary">
            <a class="nav-link text-white border cursor-pointer" data-toggle="collapse" :data-target="'#' + index"><span data-toggle="tooltip" data-placement="auto" title="Click to collapse">{{obj.name}}</span></a>
            <div :id="index" class="collapse show">
              <ul class="nav flex-column wrap bg-white">
                <li v-for="item in obj.modules" :key="item._id" class="nav-item wrap border-bottom">
                  <router-link class="nav-link text-dark" :to="{name: 'modules', params: { mod: { name: item.name, label: item.label, args: item.args } }, query: { id: item._id}}">
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
      <router-link class="nav-link text-white" :to="{name: 'history'}"><font-awesome-icon icon="clock"/> History</router-link>
    </li>
    <li class="nav-item bg-secondary border">
      <router-link class="nav-link text-white" :to="{name: 'favs'}"><font-awesome-icon icon="star"/> Favorites</router-link>
    </li>
  </ul>
</nav>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: "sidebar",
  props: ['mods'],
  components: {
    FontAwesomeIcon
  },
  methods: {
    toModulesManage() {
      this.$router.push({name: 'news.manage', params: { groups: this.mods }})
    }
  }
};
</script>
