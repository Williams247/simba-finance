<template>
  <div>
    <div class="px-4">
    <div>
      <Card :colored="true">
        <h5 class="px-2">Balances</h5>
        <div class="d-flex flex-direction-row-column">
          <div class="col-lg-4 px-2">
            <div class="card card-body no-border">
              <h5>USD</h5>
              <div>${{ balanceInUSD.toLocaleString() }}</div>
            </div>
          </div>
          <div class="col-lg-4 px-2">
            <div class="card card-body no-border">
              <h5>EUR</h5>
              <div>€{{ balanceInEUR.toLocaleString() }}</div>
            </div>
          </div>
          <div class="col-lg-4 px-2">
            <div class="card card-body no-border">
              <h5>NGN</h5>
              <div>₦{{ balanceInNGN.toLocaleString() }}</div>
            </div>
          </div>
        </div>
      </Card>
      <div class="mt-3">
        <div class="d-flex justify-content-center mt-2">
          <Loader v-if="loading" />
        </div>
        <Card v-if="!loading" :colored="true">
          <h5>Transactions</h5>
          <div class="table-styles">
            <table>
              <tbody>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Currency</th>
                  <th>Transaction Type</th>
                  <th>Amount</th>
                  <th>Exchange Rate</th>
                  <th>Created At</th>
                </tr>
                <tr v-for="(i, index) in transactions" :key="index">
                  <td>{{ i.sender ? i.sender : '-' }}</td>
                  <td>{{ i.receiver ? i.receiver : '-' }}</td>
                  <td>{{ i.currency }}</td>
                  <td>{{ i.transactionType }}</td>
                  <td>{{ i.amount.toLocaleString() }}</td>
                  <td>{{ i.exchangeRate ? i.exchangeRate : '-' }}</td>
                  <td>{{ new Date(i.createdAt).toLocaleDateString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
export default {
  name: 'IndexPage',
  middleware: ['auth'],
  components: { Loader },
  data() {
    return {
      transactions: [],
      loading: true,
      balanceInUSD: "Estimating....",
      balanceInEUR: "Estimating....",
      balanceInNGN: "Estimating...."
    }
  },
  methods: {
    async handleGetTransactions() {
      try {
        const response = await this.$axios.$get("/customer/transactions");
        this.transactions = response.data;
        this.loading = false;
      } catch(error) {
         console.log(error)
         this.loading = false;
      }
    },
    async handleGetBalances() {
      try {
        const response = await this.$axios.$get("/customer/balances");
        this.balanceInUSD = response.results.balanceInUSD;
        this.balanceInEUR = response.results.balanceInEUR;
        this.balanceInNGN = response.results.balanceInNGN;
        console.log(response)
      } catch (error) {
        console.log(error)
        this.balanceInUSD = "Could not get estimate";
        this.balanceInEUR = "Could not get estimate";
        this.balanceInNGN = "Could not get estimate";
      }
    }
  },
  mounted() {
    this.handleGetTransactions()
    this.handleGetBalances()
    console.log(this.$auth.user)
  }
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

table, td, th {
  border: 1px solid #ddd;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(odd){background-color: #f2f2f2}

.table-styles {
  overflow-x: auto;
  overflow-y: auto;
  height: 440px;
}

.card {
  margin-top: 30px;
  @media (min-width: 800px) {
    margin-top: 0;
  }
}
</style>
