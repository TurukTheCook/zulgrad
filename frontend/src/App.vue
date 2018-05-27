<template>
  <div id="app">
    <transition name="fadeInOut" mode="out-in">
      <router-view/>
    </transition>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
