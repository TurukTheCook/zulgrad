<template>
  <router-view class="news-main-content flex-grow" :key="$route.fullPath"></router-view>
</template>

<script>
export default {
  name: 'modulesManageHome'
}
</script>
