<template>
  <header><TopNav /></header>
  <FetchBanner />
  <FetchApp />
</template>

<script>
import TopNav from './components/TopNav.vue'
import FetchBanner from './components/FetchBanner.vue'
import FetchApp from './components/FetchApp.vue'

console.log(`%cThank you for visiting  ${location.host}`, "color: purple; font-size: 32px; font-style: italic; background-color: yellow;padding: 2px")
console.log('%cSource code can be found at:', "color: purple; font-style: italic; font-size: 32px; background-color: yellow;padding: 2px")
console.log('%chttps://github.com/reddiky/makefetchhappen', "color: red; font-style: bold; font-size: 32px;padding: 2px")

export default {
  name: 'App',
  components: {
    FetchBanner,
    TopNav,
    FetchApp,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #632c5e;
}

#page {
  background-color: #f5a4ed;
}
</style>
