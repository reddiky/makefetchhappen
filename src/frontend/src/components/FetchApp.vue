<template>
  <div class="fetchApp">
    <div class="fetchAppContent">
      <div class='content'  id="addTrans">
        <p class="desc">Please add your transactions:</p>
        <input v-model="transaction.payer" placeholder="Payer">
        <input v-model.number="transaction.points">
        <input type='date' v-model="transaction.date"  required pattern="\d{4}-\d{2}-\d{2}" >
        <button @click="addTransaction" :disabled="transactionButton">Add Transaction</button>
      </div>
      <div class='content' id="funds">
        <p class="desc">View your available points:</p>        
        <div>Available Points: {{ this.availableFunds }}</div>
        <BalanceModal :home="home" :balanceDisabled="balanceDisabled"/>
      </div>
      <div class='content'  id="spend">
        <p class="desc">Spend available points:</p>        
        <input v-model.number="spend" placeholder="">
        <SpendModal :home="home" :spend="spend" :getAvailableFunds="getAvailableFunds" :spendEnabled="spendEnabled" />
      </div>

      <div class='content'>
        <p class="desc">The server only has local storage, press reset to start fresh</p>
        <button  @click="reset" >Reset</button>
      </div>

    </div>
  </div>
    
</template>
  
  <script>
  import BalanceModal from './BalanceModal.vue'
  import SpendModal from './SpendModal.vue'

  
  export default {
    name: 'FetchApp',
    components: {
      BalanceModal, 
      SpendModal,
    },
    computed: {
      home() { 
        return location.hostname === 'localhost' ? 'http://localhost:3000' : 'http://www.makefetchhappen.xyz'
      },
      transactionButton() {
        return !(this.transaction.payer != '' && this.transaction.points > 0 && this.transaction.date)
      },
      balanceDisabled() {
        return this.availableFunds <= 0
      },
      spendEnabled() {
        return this.spend > 0 && this.spend <= this.availableFunds
      }
    },
    data() {
      return {
        transactions: null,
        balances: null,
        availableFunds: null,
        spend: 0,
        openBalanceModa: false,
        transaction: {
            payer: '',
            points: 0,
            date: undefined
          }
      }
    },  
    methods: {
      async reset() {
        this.answer = 'Thinking...'
        try {
          await fetch(`${this.home}/reset`, {
            method: 'POST'
          });
          this.transactions = null;
          this.transaction = {
            payer: '',
            points: 0,
            date: new Date()
          }
          this.balances = null;
          this.spend = 0;
          this.availableFunds = null;
          this.getAvailableFunds();
        } catch (error) {
          this.transactions = null;
          this.balances = null;
          this.availableFunds = null;
        }
      },
      // This should be a subscriber, but I'm not being that fancy
      async getAvailableFunds() {
        this.availableFunds = 'Thinking...'
        try {
          const res = await fetch(`${this.home}/availableFunds`)
          this.availableFunds = (await res.json())
        } catch (error) {
          this.availableFunds = 'Error! Could not retrieve available funds. ' + error
        }
      },
      async getTransactions() {
        this.transactions = 'Thinking...'
        try {
          const res = await fetch(`${this.home}/getTransactions`)
          this.transactions = (await res.json()).transactions
        } catch (error) {
          this.transactions = 'Error! Could not retrieve available funds. ' + error
        }
      },
      async addTransaction() {
        try {
          await fetch(
            `${this.home}/addTransaction`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.transaction)
            }
          )
          this.getAvailableFunds();
          this.transaction = {
            payer: '',
            points: 0,
            date: undefined
          }
        } catch (error) {
          this.balances = 'Error! Could not retrieve available funds. ' + error
        }
      }
    },
    mounted() {
      this.getAvailableFunds()
    },
    
  }

  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .fetchApp {
      margin-inline: 0%;
      width:100%;
      margin-bottom: 2%;
      display: flex;
      justify-content: space-between;

    }

    .fetchAppContent {
      margin-inline: 15%;
      margin-bottom: 2%;
      display: flex;
      justify-content: space-between;
    }

    h1 {
      color: #e8b3e3
    }
    h2 {
      color: #e8b3e3
    }

    input {
      border-radius: 5px;
      border: 1px solid #632c5e;
    }

    button {
      color: white;
      background-color: #632c5e;
      height: 30px;
      border-radius:5px;
    }

    button:disabled {
      color: white;
      background-color: lightpink;
    }

    .content {
      border-radius: 25px;
      border: 2px solid #632c5e;
      padding: 20px;
      width: 200px;
      height: 175px;
      margin-inline-end:30px;
    }
  
  </style>
  