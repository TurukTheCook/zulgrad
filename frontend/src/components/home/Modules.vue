<template>
  <div class="d-flex flex-column w-100">
    <div v-if="!success" class="alert alert-warning m-0 mb-2 w-100">{{message}}</div>
    <loading v-if="loading"></loading>
    <div v-if="!loading" class="bg-secondary text-white p-3 mb-3 shadow"><h5 class="mb-0">{{moduleHeader}}</h5></div>
    <news-articles v-if="!loading" :articles="articles" mode="news"></news-articles>
  </div>
</template>

<script>
import LoadingComponent from './../LoadingComponent'
import ErrorComponent from './../ErrorComponent'
import http from '../../helpers/http.js'
import { mapGetters } from 'vuex'

export default {
  name: 'Modules',
  components: {
    'news-articles' : () => ({
      component: import('./../modules/NewsArticles'),
      loading: LoadingComponent,
      error: ErrorComponent,
      delay: 10,
      timeout: 15000
    })
  },
  props: ['mod'],
  data() {
    return {
      success: true,
      loading: true,
      moduleHeader: null,
      message: 'An error occurred..'
    }
  },
  computed: {
    ...mapGetters(['articles'])
  },
  methods: {
    fetchData() {
      if (this.$route.query.id && !this.mod) {
        /**
         * --- NO PROPS >> GET THE MODULE VIA ID
         */
        console.log('--- via query')
          this.$store.dispatch('asyncGetModule', this.$route.query.id)
          .then(res => {
             return this.$store.dispatch('asyncNewsRequest', this.$store.getters.module)
          })
          .then(res => {
            this.moduleHeader = this.$store.getters.module.name
            this.loading = false
          })
          .catch(err => {
            this.loading = false
            this.success = false
            this.message = err.message
          })

      } else if (!this.mod) {
        /**
         * --- NO QUERY NO PROPS >> GO ADD ONE
         */
        this.$router.push({name: 'news.manage'})
      } else {
        /**
         * --- PROPS >> GET THE ARTICLES DIRECTLY
         */
        console.log('--- via props')
        this.$store.dispatch('asyncNewsRequest', this.mod)
          .then(res => {
            this.moduleHeader = this.mod.name
            this.loading = false
          })
          .catch(err => {
            this.loading = false
            this.success = false
            this.message = err.message
          })
      }
    }
  },
  created() {
    this.fetchData()
  }
}
</script>