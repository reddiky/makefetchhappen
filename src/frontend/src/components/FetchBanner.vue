<template>
  <div class="fetchBanner">
    <div class="fetchBannerContent">
      <div>
        <h1>Hiring a New Manager Has Never Been SO FUN!</h1>
        <h2>Snap up another Redding, earn kudos from your peers and make a new friend!</h2>
      </div>
      <div class='fetchImage' alt="Fetch logo"  v-bind:style="{ backgroundImage: `url(${imgSrc})` }"></div>
    </div>
  </div>
    
</template>
  
  <script>
  export default {
    name: 'FetchBanner',
    computed: {
      imgSrc() {
        let num = getRandomIntInclusive(1,16);
        const images = require.context(`../assets/`)
        return images(`./fetch${num}.jpeg`);
      }
    }
  }

  // src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  let getRandomIntInclusive = (min, max)  => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .fetchBanner {
      margin-inline: 0%;
      width:100%;
      margin-bottom: 2%;
      display: flex;
      justify-content: space-between;
      background-color: #632c5e;
    }

    .fetchBannerContent {
      margin-inline: 15%;
      margin-bottom: 2%;
      display: flex;
      justify-content: space-between;
      background-color: #632c5e;
    }

    .fetchImage {
      background-size: cover;
      height: 360px;
      width: 760px;
      box-shadow: 0 0 24px 24px #632c5e inset
    }

    h1 {
      color: #e8b3e3
    }
    h2 {
      color: #e8b3e3
    }
  
  </style>
  