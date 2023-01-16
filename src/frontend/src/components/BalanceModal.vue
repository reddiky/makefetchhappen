
<template>
    <button @click="getBalance" :disabled="balanceDisabled">More Details</button>

    <div v-if="open" class="modal">
      <div class="content">
        <h1>Balance Details:</h1>
        <li v-for="(k,v) in balances" :key="k">
          Payer:<b>{{ v}}</b>, Balance <b>{{ k }}</b> points
        </li>
        <button id="close" @click="open = false">Close</button>
      </div>
    </div>
  </template>
  
    

<script>
export default {
  name: 'BalanceModal',  
  props: ['home', 'balanceDisabled'],
  data() {
      return {
          open: false,
          balances: {}
      }
  },
  methods: {
    async getBalance() {
      this.balances = 'Thinking...'
      try {
        const res = await fetch(`${this.home}/balance`)
        this.balances = (await res.json())
        this.open = true;
      } catch (error) {
        this.balances = 'Error! Could not reach the API. ' + error
      }
    }
  }
}
</script>

<style scoped>
  .modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 500px;
    margin-left: -150px;
    min-height: 200px;
    background-color: white;
    border-radius: 25px;
    border: 2px solid #2c3e50;
  }
  .content {
    color: #2c3e50;
    padding: 10px;
  }

  #close {
    margin: 15px;
  }

  li {
    list-style-type: none
  }

  button {
      color: white;
      background-color: #632c5e;
      border-radius:5px;
      height: 30px;
    }

  button:disabled {
    color: white;
    background-color: lightpink;
  }
</style>