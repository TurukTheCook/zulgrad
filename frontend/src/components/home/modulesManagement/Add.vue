<template>
  <div class="d-flex flex-column w-100">
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
              <div v-for="source in filtered" :key="source.label" class="source-card d-flex flex-column border shadow p-1 m-1">
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
              <div v-for="country in countries" :key="country.name" class="source-card d-flex flex-column border shadow p-1 m-1">
                <div><span class="text-primary">Code:</span> {{country.code}}</div>
                <div><span class="text-primary">Name:</span> {{country.name}}</div>
                <a class="border border-primary cursor-pointer shadow text-center text-primary m-1" data-toggle="collapse" :data-target="'#countries'" @click="selectCountry(country)">Select</a>
              </div>
            </div>
          </div>
        </div>
        <div v-if="newModule.label == 'countcat'" class="form-group mb-3">
          <label for="inputCategory">Category</label>
          <select v-model="newModule.args.category" class="form-control">
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
      countries: [
        { code: 'ae', name: 'United Arab Emirates' },
        { code: 'ar', name: 'Argentina' },
        { code: 'at', name: 'Austria' },
        { code: 'au', name: 'Australia' },
        { code: 'be', name: 'Belgium' },
        { code: 'bg', name: 'Bulgaria' },
        { code: 'br', name: 'Brazil' },
        { code: 'ca', name: 'Canada' },
        { code: 'ch', name: 'Switzerland' },
        { code: 'cn', name: 'China' },
        { code: 'co', name: 'Colombia' },
        { code: 'cu', name: 'Cuba' },
        { code: 'cz', name: 'Czechia' },
        { code: 'de', name: 'Germany' },
        { code: 'eg', name: 'Egypt' },
        { code: 'fr', name: 'France' },
        { code: 'gb', name: 'Great Britain' },
        { code: 'gr', name: 'Greece' },
        { code: 'hk', name: 'Hong Kong' },
        { code: 'hu', name: 'Hungary' },
        { code: 'id', name: 'Indonesia' },
        { code: 'ie', name: 'Ireland' },
        { code: 'il', name: 'Israel' },
        { code: 'in', name: 'India' },
        { code: 'it', name: 'Italy' },
        { code: 'jp', name: 'Japan' },
        { code: 'kr', name: 'Korea' },
        { code: 'lt', name: 'Lithuania' },
        { code: 'lv', name: 'Latvia' },
        { code: 'ma', name: 'Moroco' },
        { code: 'mx', name: 'Mexico' },
        { code: 'my', name: 'Malaysia' },
        { code: 'ng', name: 'Nigeria' },
        { code: 'nl', name: 'Netherlands' },
        { code: 'no', name: 'Norway' },
        { code: 'nz', name: 'New Zealand' },
        { code: 'ph', name: 'Philippines' },
        { code: 'pl', name: 'Poland' },
        { code: 'pt', name: 'Portugal' },
        { code: 'ro', name: 'Romania' },
        { code: 'rs', name: 'Serbia' },
        { code: 'ru', name: 'Russian Federation' },
        { code: 'sa', name: 'Saudi Arabia' },
        { code: 'se', name: 'Sweden' },
        { code: 'sg', name: 'Singapore' },
        { code: 'si', name: 'Slovania' },
        { code: 'sk', name: 'Slovakia' },
        { code: 'th', name: 'Thailand' },
        { code: 'tr', name: 'Turkey' },
        { code: 'tw', name: 'Taiwan' },
        { code: 'ua', name: 'Ukraine' },
        { code: 'us', name: 'United States of America' },
        { code: 've', name: 'Venezuela' },
        { code: 'za', name: 'South Africa' } 
      ],
      newModule: {
        args: {}
      }
    }
  },
  computed: {
    filtered() {
      return this.$store.getters.filteredSources(this.search)
    }
  },
  methods: {
    addModule() {
      this.calling = true
      let data = {
        module: {
          args: {}
        }
      }
      if (this.newModule.label == 'source') {
        data.module.label = 'source'
        data.module.args.source = this.newModule.args.source
      } else {
        data.module.label = 'countcat'
        data.module.args.country = this.newModule.args.country
        data.module.args.category = this.newModule.args.category
      }
      data.module.name = this.newModule.name
      http.post('modules', data)
        .then(res => {
          this.success = res.data.success
          this.message = res.data.message
          this.calling = false
        })
        .catch(err => {
          this.calling = false
          this.success = err.response.data.success
          this.message = err.response.data.message
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
      this.$store.dispatch('getSources')
        .then(res => {
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
    this.fetchData()
  }
}
</script>