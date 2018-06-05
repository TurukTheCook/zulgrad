<template>
<div>
  <div v-if="!success" class="alert alert-warning m-0 mb-2 w-100">{{message}}</div>
  <!-- <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item active">Data</li>
  </ol> -->
  <!-- TO DO -->
  <loading v-if="loading"></loading>
  <div v-if="!loading" class="bg-secondary text-white p-3 mb-3 shadow"><h5 class="mb-0">{{mod.name}}</h5></div>
  <news-articles v-if="!loading" :articles="articles"></news-articles>
</div>
</template>

<script>
import LoadingComponent from './../LoadingComponent'
import ErrorComponent from './../ErrorComponent'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import http from '../../helpers/http.js'
import moment from 'moment'
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
    }),
    FontAwesomeIcon
  },
  props: ['mod'],
  data() {
    return {
      success: true,
      loading: true,
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
          console.log('via query')

          http.get('modules/' + this.$route.query.id)
            .then(res => {
              console.log(res.data)
            })
      } else if (!this.mod) {
        this.$router.push({name: 'news.manage'})
      } else {
        /**
         * --- PROPS >> GET THE ARTICLES DIRECTLY
         */
        // TODO

        this.$store.dispatch('getArticles', this.mod)
          .then(res => {
            console.log('test res articles: ', res)
            this.loading = false
          })
          .catch(err => {
            console.log(err.message)
            this.loading = false
            this.success = err.response.data.success
            this.message = err.response.data.message
          })
      }
    }
  },
  created() {
    this.fetchData()
  }
}
</script>