<template>
<div>
  <!-- <div v-if="!success" class="alert alert-warning m-0 mb-2 w-100">{{message}}</div> -->
  <div v-if="success == false" class="alert alert-warning m-0 mb-2 w-100">{{message}}</div>
  <div v-if="success == true" class="alert alert-success m-0 mb-2 w-100">{{message}}</div>
  <loading v-if="loading"></loading>
  <div v-else class="d-flex flex-column w-100">
    <div class="bg-secondary text-white p-3"><h5 class="mb-0">Edit Group: <span class="text-primary">{{group.name}}</span></h5></div>
    <div class="d-flex flex-wrap justify-content-center border shadow">
      <div class="modules-add d-flex flex-column justify-content-center align-items-center p-2 m-2 mb-3">
        <h6 class="cursor-default text-center my-auto" v-if="group.name == 'No Group'"><strong>You can't delete<br><span class="text-primary">{{group.name}}</span></strong></h6>
        <h6 class="cursor-default text-center my-auto" v-else><strong>Delete<br><span class="text-primary">{{group.name}}</span></strong></h6>
        <button class="btn btn-block btn-outline-primary" @click="deleteGroup(group._id)" :disabled="disabled">Delete</button>
      </div>
      <div class="bg-secondary text-white p-3 w-100"><h5 class="mb-0">Modules management</h5></div>
      <div v-for="item in group.modules" :key="item._id" class="modules-groups d-flex flex-column justify-content-center align-items-center p-2 m-2">
        <h6 class="my-auto"><strong>{{item.name}}</strong></h6>
        <button class="btn btn-block btn-outline-primary" @click="deleteModule(group._id, item._id, item.name)" :disabled="calling">Delete</button>
      </div>
      <div class="modules-add d-flex flex-column justify-content-center align-items-center p-2 m-2">
        <h6 class="cursor-default"><strong>Add Module</strong></h6>
        <router-link :to="{name: 'newsmodule.add'}"><font-awesome-icon class="h1 text-primary" icon="plus-circle"/></router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { mapGetters } from 'vuex'

export default {
  name: 'groupEdit',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      success: null,
      loading: true,
      calling: false,
      message: 'An error occurred..',
    }
  },
  computed: {
    ...mapGetters(['group']),
    disabled() {
      return this.$store.getters.group.name == "No Group"
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch('asyncGetOneGroup', this.$route.params.id)
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
    deleteGroup(groupId) {
      if (this.group.name == 'No Group') return

      let confRes = confirm('Are you sure you want to delete the group: ' + this.group.name + ' ?')
      if (!confRes) return
      else {
        this.$store.dispatch('asyncRemoveGroup', groupId)
        .then(res => {
          this.success = true
          this.message = res.data.message
          setTimeout(() => {
            this.$router.push({name: 'news.manage'})
          }, 1500);
        })
        .catch(err => {
          this.success = false
          this.message = err.message
          if (err.response.data.message) this.message = err.response.data.message
        })
      }
    },
    deleteModule(groupId, moduleId, moduleName) {
      let confRes = confirm('Are you sure you want to delete the module: ' + moduleName + ' ?')
      if (!confRes) return
      else {
        this.calling = true
        let data = {
          moduleId: moduleId,
          groupId: groupId
        };
        this.$store.dispatch('asyncRemoveModule', data)
        .then(res => {
          this.calling = false
          this.success = true
          this.message = res.data.message
        })
        .catch(err => {
          this.calling = false
          this.success = false
          this.message = err.message
          if (err.response.data.message) this.message = err.response.data.message
        })
      }
    }
  },
  created() {
    if (!this.$route.params.id) {
      this.$router.push({name: 'news.manage'})
    }
    else this.fetchData()
  }
}
</script>
