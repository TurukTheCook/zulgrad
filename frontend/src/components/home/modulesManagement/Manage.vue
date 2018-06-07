<template>
<div>
  <div v-if="!success" class="alert alert-warning m-0 mb-2 w-100">{{message}}</div>
  <loading v-if="loading"></loading>
  <div v-else class="d-flex flex-column w-100">
    <div class="bg-secondary text-white p-3"><h5 class="mb-0">News Modules Management</h5></div>
    <div class="d-flex flex-wrap justify-content-center border shadow">
      <div class="modules-add d-flex flex-column justify-content-center align-items-center p-2 m-2 mb-3">
        <h6 class="cursor-default"><strong>Add Module</strong></h6>
        <router-link :to="{name: 'newsmodule.add'}"><font-awesome-icon class="h1 text-primary" icon="plus-circle"/></router-link>
      </div>
      <div class="bg-secondary text-white p-3 w-100"><h5 class="mb-0">Groups Management</h5></div>
      <div class="w-100 text-center mb-3 mt-1">To remove a group or a module from a group, simply click on "edit".</div>
      <div v-for="group in groups" :key="group._id" class="modules-groups d-flex flex-column justify-content-center align-items-center p-2 m-2">
        <h6 class="my-auto"><strong>{{group.name}}</strong></h6>
        <button class="btn btn-block btn-outline-primary" @click="editGroup(group._id)">Edit</button>
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
import { mapGetters } from 'vuex'

export default {
  name: 'modulesManage',
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
  computed: {
    ...mapGetters(['groups'])
  },
  methods: {
    fetchData() {
      this.$store.dispatch('asyncGetGroups')
      .then(res => {
        this.loading = false
      })
      .catch(err => {
        this.loading = false
        this.success = false
        this.message = err.message
        if (err.response.data.message) this.message = err.response.data.message
      })
    },
    editGroup(groupId) {
      this.$router.push({name: 'newsgroups.edit', params: {id: groupId}})
    }
  },
  created() {
    this.fetchData()
  }
}
</script>
