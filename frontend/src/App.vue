<template>
  <div id="app">
    <transition name="fadeInOut" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
