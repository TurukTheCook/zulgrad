<template>
<div>
  <div v-if="!success" class="alert alert-warning m-0 mb-2 w-100">{{message}}</div>
  <loading v-if="loading"></loading>
  <div v-else class="d-flex flex-column w-100">
    <div class="bg-secondary text-white p-3"><h5 class="mb-0">News Modules Management</h5></div>
    <div class="d-flex flex-wrap justify-content-center p-3 border shadow">
      <div class="modules-add d-flex flex-column justify-content-center align-items-center p-2 m-2 mb-3">
        <h6 class="cursor-default"><strong>Add Module</strong></h6>
        <router-link :to="{name: 'newsmodule.add'}"><font-awesome-icon class="h1 text-primary" icon="plus-circle"/></router-link>
      </div>
      <div class="w-100 text-center mb-3">Or to add a module to a group, simply click on manage.</div>
      <div v-for="group in groups" :key="group._id" class="modules-groups d-flex flex-column justify-content-center align-items-center p-2 m-2">
        <h6><strong>{{group.name}}</strong></h6>
        <!-- <p class="h1 text-primary"><font-awesome-icon icon="plus-circle"/></p> -->
        <button class="btn btn-block btn-outline-primary" disabled>Manage</button>
      </div>
      <div class="modules-add d-flex flex-column justify-content-center align-items-center p-2 m-2">
        <h6 class="cursor-default"><strong>Add Group</strong></h6>
        <router-link :to="{name: 'newsgroups.add'}"><font-awesome-icon class="h1 text-primary" icon="plus-circle"/></router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'modulesManage',
  props: ['groups'],
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      success: true,
      loading: true,
      message: 'An error occurred..',
    }
  },
  methods: {
    fetchData() {
      http.get('groups')
        .then(res => {
          this.groups = res.data.content
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.success = err.response.data.success
          this.message = err.response.data.message
        })
    }
  },
  created() {
    if (!this.groups) {
      this.fetchData()
    } else this.loading = false
  }
}
</script>
