<template>
<div>
  <div v-for="article in articles" :key="article._id" class="news-card d-flex flex-column bg-white text-dark border shadow mb-3">
    <h5 class="news-card-header py-1 px-3"><strong>{{article.title}}</strong></h5>
    <div class="news-card-content d-flex flex-row">
      <div class="news-card-content-image pt-2 mb-2">
        <img v-if="article.urlToImage" class="img-fluid border" v-lazy="article.urlToImage" alt="news related image">
        <img v-else class="img-fluid border" src="/static/img/image_not_found.jpg" alt="news related image">
      </div>
      <div class="news-card-content-body px-2 pb-2">
        <p class="mb-1">{{article.description}}</p>
        <div class="float-left">
          <small class="pl-2"><cite title="Author">{{article.author}}</cite> @ <cite title="Source Title">{{article.source.name}}</cite></small><br>
          <small class="pl-2">{{moment(article.publishedAt)}}</small>
        </div>
        <button @click="openLink(article.url, article)" class="btn btn-sm btn-outline-primary float-right" :disabled="calling">Read..</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: 'NewsArticles',
  props: ['articles', 'mode'],
  data() {
    return {
      calling: false
    }
  },
  methods: {
    moment(date) {
      let timezone = moment.tz.guess()
      return moment.tz(date, timezone).format("MMMM Do YYYY [at] HH:mm");
    },
    openLink(url, data) {
      this.calling = true
      if (this.mode == "news") {
        this.$store.dispatch('asyncAddHistory', data)
          .then(res => {
            this.calling = false
          })
          .catch(err => {
            if (err.message) console.log('error: ', err.message)
            if (err.response.data.message) console.log('error: ', err.response.data.message)
          })
      }
      // window.open(url, '_blank', 'noopener')
      window.open(url, '_blank')

      setTimeout(() => {
        this.calling = false
      }, 300);
    }
  }
}
</script>