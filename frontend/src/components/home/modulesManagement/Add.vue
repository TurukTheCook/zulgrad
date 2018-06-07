<template>
  <div class="d-flex flex-column w-100">
    <loading v-if="loading"></loading>
    <div v-else>
      <div class="bg-secondary text-white p-3"><h5 class="mb-0">New Module</h5></div>
      <div class="border shadow p-3">
        <!-- TODO -->
        <form @submit.prevent="addModule">
          <div class="text-center">
            <small>All fields are required</small>
          </div>
          <div class="form-group mb-3">
            <label for="inputName">Name</label>
            <input v-model="newModule.name" type="text" id="inputName" class="form-control" required autofocus>
          </div>
          <div class="form-group mb-3">
            <label for="inputLabel">Label</label>
            <select v-model="newModule.label" class="form-control" id="inputLabel" required>
              <option value="source">Source</option>
              <option value="countcat">Country and Category</option>
            </select>
            <small v-if="newModule.label == 'source'" class="text-primary">Source calls for only one source</small>
            <small v-if="newModule.label == 'countcat'" class="text-primary">You have to select one country and one category</small>
          </div>
          <div v-if="newModule.label == 'source'" class="form-group mb-3">
            <label for="inputSource">Source</label>
            <input v-model="newModule.args.source" type="text" id="inputSource" class="form-control" :placeholder="sourceValue" disabled>
            <small class="text-primary">Select one in the list below</small><br>
            <a class="btn btn-sm btn-outline-primary cursor-pointer my-2" data-toggle="collapse" :data-target="'#sources'">Show Sources List</a>
            <div class="collapse" id="sources">
              <div class="sources-wrapper d-flex flex-wrap justify-content-center">
                <div class="w-100 m-1">
                  <div class="form-group">
                    <label for="inputSearch"><strong class="pl-3">Search</strong> <small class="text-primary">(by label, name, language [e.g.:  en], country [e.g.:  us], category)</small></label>
                    <input v-model="search" type="text" id="inputSearch" class="form-control">
                  </div>
                </div>
                <div v-for="source in filtered" :key="source._id" class="source-card d-flex flex-column border shadow p-1 m-1">
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
          <div v-if="newModule.label == 'countcat'" class="form-group mb-3">
            <label for="inputCountry">Country</label>
            <input v-model="newModule.args.country" type="text" id="inputCountry" class="form-control" :placeholder="countryValue" disabled>
            <small class="text-primary">Select one in the list below</small><br>
            <a class="btn btn-sm btn-outline-primary cursor-pointer my-2" data-toggle="collapse" :data-target="'#countries'">Show Countries List</a>
            <div class="collapse" id="countries">
              <div class="sources-wrapper d-flex flex-wrap justify-content-center">
                <div v-for="country in countries" :key="country._id" class="source-card d-flex flex-column border shadow p-1 m-1">
                  <div><span class="text-primary">Code:</span> {{country.code}}</div>
                  <div><span class="text-primary">Name:</span> {{country.name}}</div>
                  <a class="border border-primary cursor-pointer shadow text-center text-primary m-1" data-toggle="collapse" :data-target="'#countries'" @click="selectCountry(country)">Select</a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="newModule.label == 'countcat'" class="form-group mb-3">
            <label for="inputCategory">Category</label>
            <select v-model="newModule.args.category" class="form-control" required>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
              <option value="general" selected>General</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
            </select>
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
import http from '../../../helpers/http.js'
import store from '../../../store/index.js'

export default {
  name: 'moduleAdd',
  data() {
    return {
      success: null,
      message: null,
      calling: false,
      loading: true,
      search: '',
      sourceValue: '',
      countryValue: '',
      newModule: {
        args: {}
      }
    }
  },
  computed: {
    filtered() {
      return this.$store.getters.filteredSources(this.search)
    },
    countries() {
      return this.$store.getters.countries
    }
  },
  methods: {
    addModule() {
      this.calling = true
      /**
       * --- ERROR VALIDATION
       */
      if (this.newModule.label == "source" && !this.newModule.args.source) {
        this.calling = false
        this.success = false
        this.message = "Missing fields, please forget any field.."
        return
      }
      if (this.newModule.label == "countcat" && (!this.newModule.args.country || !this.newModule.args.category)) {
        this.calling = false
        this.success = false
        this.message = "Missing fields, please forget any field.."
        return
      }

      /**
       * --- VALIDATION OK
       */
      let data = {
        module: {
          args: {}
        }
      }
      let mod = data.module

      if (this.newModule.label == 'source') {
        mod.label = 'source'
        mod.args.source = this.newModule.args.source
      } else {
        mod.label = 'countcat'
        mod.args.country = this.newModule.args.country
        mod.args.category = this.newModule.args.category
      }
      mod.name = this.newModule.name

      this.$store.dispatch('asyncAddModule', data)
        .then(res => {
          this.success = res.data.success
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
        })
    },
    selectSource(source) {
      this.newModule.args.source = source.label
      this.sourceValue = source.label
    },
    selectCountry(country) {
      this.newModule.args.country = country.code
      this.countryValue = country.name
    },
    fetchData() {
      this.$store.dispatch('asyncGetSources')
        .then(res => {
          return this.$store.dispatch('asyncGetCountries')
        })
        .then(res => {
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
}
</script>