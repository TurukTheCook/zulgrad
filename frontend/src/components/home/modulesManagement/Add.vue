<template>
  <div class="d-flex flex-column w-100">
    <div class="bg-secondary text-white p-3"><h5 class="mb-0">New Module</h5></div>
    <div class="border shadow p-3">
      <!-- TODO -->
      <form @submit.prevent="addModule">
        <div class="form-group mb-2">
          <label for="inputName">Name</label>
          <input v-model="newModule.name" type="text" id="inputName" class="form-control" required autofocus>
        </div>
        <div class="form-group mb-2">
          <label for="inputLabel">Label</label>
          <select v-model="newModule.label" class="form-control" id="inputLabel" required>
            <option value="source">Source</option>
            <option value="countcat">Country and Category</option>
          </select>
          <small class="text-primary">Source calls for only one source</small>
        </div>
        <div v-if="newModule.label == 'source'" class="form-group mb-2">
          <label for="inputSource">Source</label>
          <input v-model="newModule.args.source" type="text" id="inputSource" class="form-control" :placeholder="value">
          <small class="text-primary">Enter this ID of the source (see list to select one directly)</small><br>
          <a class="btn btn-sm btn-outline-primary cursor-pointer my-2" data-toggle="collapse" :data-target="'#sources'">Show Sources List</a>
          <div class="collapse" id="sources">
            <div class="sources-wrapper d-flex flex-wrap justify-content-center">
              <div class="w-100 m-1">
                <div class="form-group">
                  <label for="inputSearch">Search</label>
                  <input v-model="search" type="text" id="inputSearch" class="form-control">
                </div>
              </div>
              <div v-for="source in filteredSources" :key="source.label" class="source-card d-flex flex-column border shadow p-1 m-1">
                <div><span class="text-primary">Id:</span> {{source.label}}</div>
                <div><span class="text-primary">Name:</span> {{source.name}}</div>
                <a class="border border-primary cursor-pointer shadow text-center text-primary m-1" data-toggle="collapse" :data-target="'#sources'" @click="selectSource(source)">Select</a>
                <a class="border border-primary cursor-pointer shadow text-center text-primary m-1" data-toggle="collapse" :data-target="'#moreinfo' + source.label">More Info</a>
                <div class="collapse" :id="'moreinfo' + source.label">
                  <div><span class="text-primary">Description:</span><br>{{source.description}}</div>
                  <div><span class="text-primary">Url:</span> <a class="text-secondary" :href="source.url" target="_blank" rel="noopener">{{source.url}}</a></div>
                  <div><span class="text-primary">Language:</span> {{source.language}}</div>
                  <div><span class="text-primary">Country:</span> {{source.country}}</div>
                  <div><span class="text-primary">Category:</span> {{source.category}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="newModule.label == 'countcat'" class="form-group mb-2">
          <label for="inputCountry">Country</label>
          <input v-model="newModule.args.country" type="text" id="inputCountry" class="form-control">
        </div>
        <div v-if="newModule.label == 'countcat'" class="form-group mb-2">
          <label for="inputCategory">Category</label>
          <input v-model="newModule.args.category" type="text" id="inputCategory" class="form-control">
        </div>
        <div v-if="!success" class="alert alert-warning m-0 mb-2 w-100">{{message}}</div>
        <button class="btn btn-lg btn-outline-primary btn-block mt-3 mb-2" type="submit" :disabled="calling">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import http from '../../../helpers/http.js'

export default {
  name: 'moduleAdd',
  data() {
    return {
      success: true,
      message: null,
      calling: false,
      loading: true,
      search: '',
      value: '',
      newModule: {
        args: {}
      },
      sources: []
    }
  },
  computed: {
    filteredSources: function () {
      return this.sources.filter((source) => {
        return source.label.match(this.search) || source.label.match(this.search) || source.language.match(this.search)
        || source.country.match(this.search) || source.category.match(this.search)
      });
    }
  },
  methods: {
    addModule() {
      // todo
    },
    selectSource(source) {
      this.newModule.args.source = source.label;
      this.value = source.label;
      console.log('source: ', this.newModule.args.source)
    },
    fetchData() {
      http.get('sources')
        .then(res => {
          this.loading = false
          this.sources = res.data.content
        })
        .catch(err => {
          this.loading = false
          this.success = err.response.data.success
          this.message = err.response.data.message
        })
    }
  },
  created() {
    this.fetchData()
  }
}
</script>