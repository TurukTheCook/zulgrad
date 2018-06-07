<template>
  <div class="d-flex flex-column w-100">
    <div v-if="!success" class="alert alert-warning m-0 mb-2 w-100">{{message}}</div>
    <loading v-if="loading"></loading>
    <div v-if="!loading" class="bg-secondary text-white p-3 mb-3"><h5 class="mb-0">History</h5></div>
    <news-articles v-if="!loading" :articles="history" mode="history"></news-articles>
  </div>
</template>

<script>
import LoadingComponent from './../LoadingComponent'
import ErrorComponent from './../ErrorComponent'
import http from '../../helpers/http.js'
import { mapGetters } from 'vuex'

export default {
  name: 'history',
  components: {
    'news-articles' : () => ({
      component: import('./../modules/NewsArticles'),
      loading: LoadingComponent,
      error: ErrorComponent,
      delay: 10,
      timeout: 15000
    })
  },
  data() {
    return {
      success: true,
      loading: true,
      message: 'An error occurred..'
    }
  },
  computed: {
    ...mapGetters(['history'])
  },
  methods: {
    fetchData() {
      this.$store.dispatch('asyncGetHistory')
      .then(res => {
        this.loading = false
      })
      .catch(err => {
        this.loading = false
        this.success = false
        this.message = err.message
        if (err.response.data.message) this.message = err.response.data.message
      })
    }
  },
  created() {
    this.fetchData()
  }
}
</script>
