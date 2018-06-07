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
  created() {
    this.loading = false
  }
}
</script>