<template>
  <div class="px-4">
    <div>
      <Card :colored="true">
        <form @submit.prevent="handleFindUserByMail" class="form-group">
          <input
            type="email"
            class="w-100 form-control py-2 px-3 mb-3"
            placeholder="Receiver's email"
            v-model="findUserMail.email"
            :disabled="confirmed"
          />
          <AuthButton
            variant="primary"
            label="Confirm"
            :loading="confirmLoading"
          />
        </form>
      </Card>
      <div v-if="confirmation.username && confirmation.email" class="mt-3">
        <Card :colored="true">
          <ul class="mt-3">
            <li>
              <h4>Name: {{ confirmation.username }}</h4>
            </li>
            <li>
              <h4>Email: {{ confirmation.email }}</h4>
            </li>
          </ul>
          <div class="d-flex px-4">
            <ActionButton
              variant="danger"
              label="Decline"
              :click="handleDecline"
            />
            <div class="px-1"></div>
            <ActionButton
              variant="primary"
              label="Confirm"
              :click="handleConfirm"
            />
          </div>
        </Card>
      </div>
      <div v-if="confirmation.username && confirmation.email" class="mt-3">
        <Card :colored="true">
          <form @submit.prevent="handleSendMoney">
            <div>
              <input
                type="number"
                placeholder="Amount"
                class="w-100 form-control py-2 px-3 mb-3"
                :disabled="!confirmed"
                ref="amount"
              />
            </div>
            <div>
              <select
                :disabled="!confirmed"
                class="w-100 form-control py-2 px-3 mb-3"
                style="cursor: pointer"
                v-model="transferDetails.sendingCurrency"
              >
                <option value="">---Select your sending currency---</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="NGN">NGN</option>
              </select>
            </div>
            <div>
              <select
                :disabled="!confirmed"
                class="w-100 form-control py-2 px-3 mb-3"
                style="cursor: pointer"
                v-model="transferDetails.receivingCurrency"
              >
                <option value="">---Select your receiver's currency---</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="NGN">NGN</option>
              </select>
            </div>
            <div>
              <AuthButton
                v-if="confirmed"
                variant="primary"
                label="Make Transfer"
                :loading="transferLoading"
              />
            </div>
          </form>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/Buttons/ActionButton.vue";
import AuthButton from "@/components/Buttons/ActionButton.vue";
export default {
  middleware: ['auth'],
  components: { ActionButton, AuthButton },
  data() {
    return {
      confirmLoading: false,
      findUserMail: { email: "" },
      confirmation: {
        username: "",
        email: "",
      },
      confirmed: false,
      transferDetails: {
        sendingCurrency: "",
        receivingCurrency: ""
      }
    };
  },
  methods: {
    handleDecline() {
      this.confirmation = {
        username: "",
        email: "",
      };
    },
    handleConfirm() {
      this.confirmed = true;
    },
    async handleFindUserByMail() {
      this.confirmLoading = true;
      try {
        const response = await this.$axios.$post("/customer/find-customer", {
          ...this.findUserMail,
        });
        const {
          data: { email, username },
        } = response;
        this.confirmation = {
          username: username,
          email: email,
        };
        this.confirmLoading = false;
      } catch (error) {
        console.log(error);
        this.confirmLoading = false;
      }
    },
    async handleSendMoney() {
      const sendingAmount = this.$refs.amount.value;
      if (!sendingAmount) {
        this.$toast.error("Enter an amount to send");
        return false;
      }
      this.transferLoading = true;
      try {
        const response = await this.$axios.$post("/customer/send-money", {
          ...this.transferDetails,
          email: this.confirmation.email,
          amount: sendingAmount
        });
        this.transferLoading = false;
        this.$toast.success(response.message);
        this.$router.push("/")
      } catch (error) {
        this.transferLoading = false;
        console.log(error)
      }
    }
  },
};
</script>
