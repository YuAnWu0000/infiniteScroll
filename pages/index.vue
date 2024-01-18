<template>
  <div class="followers">
    <h1>我們來看看尤雨溪大大的追蹤者有誰吧:</h1>
    <div v-for="(follower, index) in followers" :key="`follower${index}`" class="card">
      <div class="avatar" :style="`background-image: url(${follower.avatar_url})`"></div>
      <div class="info">
        <p>Name: {{ follower.login }}</p>
        <p>
          Github Page: <a :href="follower.html_url" target="_blank">{{ follower.html_url }}</a>
        </p>
      </div>
    </div>
    <div v-if="followers.length > 0" ref="bottomEl" class="bottom-el"></div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { getFollowersByUserName } from '../githubApi/users.client'

let nowPage = 1
const followers = ref([])
const getFollowers = async () => {
  const isFirstLoad = nowPage === 1
  const { data } = await getFollowersByUserName('yyx990803', {
    per_page: isFirstLoad ? 8 : 4, // default: 30
    page: nowPage // default: 1
  })
  followers.value = followers.value.concat(data)
  nowPage += isFirstLoad ? 2 : 1
}

const bottomEl = ref(null)
const observeBottomEl = () => {
  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 1
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // observer.unobserve(entry.target);
        getFollowers()
      }
    })
  }, options)
  // Observe last DOM element
  if (bottomEl.value) observer.observe(bottomEl.value)
}

onMounted(async () => {
  await getFollowers()
  observeBottomEl()
})
</script>
<style lang="scss" scoped>
.followers {
  position: relative;
  width: 70rem;
  h1 {
    font-size: 2rem;
    color: #000000;
  }
  .card {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #dae4e5;
    box-shadow: 0px 3px 8px -1px rgba(0, 0, 0, 0.3);
    border-radius: 0.8rem;
    margin: 2rem 0;
    padding: 2rem;
    font-size: 1.8rem;
    height: 20rem;
  }
  .avatar {
    width: 14rem;
    min-width: 14rem;
    height: 14rem;
    position: relative;
    background: no-repeat center / cover;
    box-shadow: 0px 3px 8px -1px rgba(0, 0, 0, 0.1);
    border-radius: 1.6rem;
    border: 0.5rem solid #fff;
  }
  .info {
    width: 40rem;
  }
  .bottom-el {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    background-color: aquamarine;
    opacity: 0;
  }
}
</style>
