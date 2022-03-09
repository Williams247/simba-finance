<template>
  <div>
    <Card :colored="true">
      <h5 class="px-3">Fund Account</h5>
      <div class="d-flex flex-direction-row-column">
          <div class="col-lg-4 px-2">
            <div class="card card-body no-border mt-2">
              <h5>USD</h5>
              <h5>${{ balanceInUSD.toLocaleString() }}</h5>
              <div>
                  <ActionButton
                    variant="primary"
                    label="Fund +"
                    :click="handleSetDollar"
                  />
              </div>
            </div>
          </div>
          <div class="col-lg-4 px-2">
            <div class="card card-body no-border mt-2">
              <h5>EUR</h5>
              <h5>€{{ balanceInEUR.toLocaleString() }}</h5>
              <div>
                  <ActionButton
                    variant="primary"
                    label="Fund +"
                    :click="handleSetEuro"
                  />
              </div>
            </div>
          </div>
          <div class="col-lg-4 px-2">
            <div class="card card-body no-border mt-2">
              <h5>NGN</h5>
              <h5>₦{{ balanceInNGN.toLocaleString() }}</h5>
              <div>
                  <ActionButton
                    variant="primary"
                    label="Fund +"
                    :click="handleSetNaira"
                  />
              </div>
            </div>
          </div>
        </div>
    </Card>
    <div class="mt-4">
      <Card :colored="true">
        <div class="py-1">
          <form @submit.prevent="handleFundAccount">
            <input
             ref="amount_input"
             type="number"
             :placeholder="fundNaira ? 'Fund naira amount...' : fundEuro ? 'Fund euro amount...' : 'Fund dollar amount...'"
             class="form-control w-100 py-2"
            />
            <input ref="currency_input" type="hidden" :value="fundNaira ? 'NGN' : fundEuro ? 'EUR' : 'USD'" />
            <div class="mt-2">
             <ActionButton
                variant="primary"
                label="Fund Now"
                :loading="loading"
             />
            </div>
          </form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/Buttons/ActionButton.vue";
export default {
  middleware: ['auth'],
  components: { ActionButton },
  data() {
    return {
      amountInput: false,
      fundDollar: false,
      fundEuro: false,
      fundNaira: false,
      balanceInUSD: "Estimating....",
      balanceInEUR: "Estimating....",
      balanceInNGN: "Estimating....",
      loading: false
    }
  },
  methods: {
    handleSetDollar() {
      this.fundEuro = false;
      this.fundNaira = false;
      this.fundDollar = true;
    },
    handleSetEuro() {
      this.fundDollar = false;
      this.fundNaira = false;
      this.fundEuro = true;
    },
    handleSetNaira() {
      this.fundEuro = false;
      this.fundDollar = false;
      this.fundNaira = true;
    },
    async handleGetBalances() {
      try {
        const response = await this.$axios.$get("/customer/balances");
        this.balanceInUSD = response.results.balanceInUSD;
        this.balanceInEUR = response.results.balanceInEUR;
        this.balanceInNGN = response.results.balanceInNGN;
      } catch (error) {
        console.log(error)
        this.balanceInUSD = "Could not get estimate";
        this.balanceInEUR = "Could not get estimate";
        this.balanceInNGN = "Could not get estimate";
      }
    },
    async handleFundAccount () {
      this.loading = true;
      try {
        const response = await this.$axios.$post("/customer/fund-account", {
          amount: Number(this.$refs.amount_input.value),
          currency: this.$refs.currency_input.value
        });
        this.$toast.success(response.message);
        this.handleGetBalances();
        this.$refs.amount_input.value = "";
        this.$refs.amount_currency.value ="";
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    }
  },
  mounted() {
    this.handleGetBalances()
  }
}
</script>
