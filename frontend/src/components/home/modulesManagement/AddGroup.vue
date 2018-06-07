<template>
  <div class="d-flex flex-column w-100">
    <loading v-if="loading"></loading>
    <div v-else>
      <div class="bg-secondary text-white p-3"><h5 class="mb-0">New Group</h5></div>
      <div class="border shadow p-3">
        <form @submit.prevent="addGroup">
          <div class="text-center">
            <small>All fields are required</small>
          </div>
          <div class="form-group mb-3">
            <label for="inputName">Name</label>
            <input v-model="newGroup.name" type="text" id="inputName" class="form-control" required autofocus>
          </div>
          <div v-if="success == false" class="alert alert-warning m-0 mb-2 w-100">{{message}}</div>
          <div v-if="success == true" class="alert alert-success m-0 mb-2 w-100">{{message}}</div>
          <button class="btn btn-lg btn-outline-primary btn-block mt-5 mb-2" type="submit" :disabled="calling">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'groupAdd',
  data() {
    return {
      success: null,
      message: null,
      calling: false,
      loading: true,
      newGroup: {}
    }
  },
  methods: {
    addGroup() {
      this.calling = true
      /**
       * --- ERROR VALIDATION
       */
      if (!this.newGroup.name) {
        this.calling = false
        this.success = false
        this.message = "Missing fields, please don't forget any field.."
        return
      }
      // if (this.newGroup.name == "No Group") {
      //   this.calling = false
      //   this.success = false
      //   this.message = "You can't add a group name 'No Group' because this is the default group.."
      //   return
      // }

      /**
       * --- VALIDATION OK
       */
      let data = {
        name: this.newGroup.name
      }
      this.$store.dispatch('asyncAddGroup', data)
      .then(res => {
        this.success = true
        this.message = res.data.message
        setTimeout(() => {
          this.$router.push({name: 'news.manage'})
          this.calling = false
        }, 1500);
      })
      .catch(err => {
        this.calling = false
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