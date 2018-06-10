<template>
  <div class="d-flex flex-column w-100">
    <div class="bg-secondary text-white p-3"><h5 class="mb-0">Welcome to Zulgrad !</h5></div>
    <div class="border shadow p-3 d-flex flex-column align-items-center justify-content-center">
      <p class="lead text-center">To get started with the app, you can add a module from the menu (top-left on mobiles).<br>
      Or click below: </p>
      <button class="btn btn-block btn-outline-primary mb-3" @click="toModulesManage()">Add a module</button>
      <p class="lead text-center">Then you'll be able to see news just like this:</p>
      <img class="img-fluid border mb-5" v-lazy="'/static/img/news-preview.jpg'" alt="news preview"/>
      <p>When you're done with your first news module, you can start reading news or add more modules to expand your range of news.</p>
      <p>Most recent articles can take 15min to 1hour to get accessible so be sure to come back every now and then to get the latest news !</p>
      <p>News articles viewed by Zulgrad members are stored up to a week. Your history won't be deleted but is limited to the 50 last news you clicked.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'default',
  methods: {
    toModulesManage() {
      this.$router.push({name: 'news.manage'})
    }
  }
}
</script>
