<template>
  <div class="app">
    <NuxtPage />
    <LoadingPage v-if="isLoading" />
  </div>
</template>
<script setup>
import { useCommonStore } from './stores/common'

const commonStore = useCommonStore()
const { isLoading } = storeToRefs(commonStore)
</script>
<style>
* {
  box-sizing: border-box;
}
html {
  font-size: 10px;
}
.app {
  width: 100%;
  max-width: 144rem;
  padding: 0;
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
}
</style>
