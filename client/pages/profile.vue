<template>
  <div class="px-4">
    <div v-if="loading" class="mt-2">
     <Loader />
    </div>
    <Card v-else :colored="true">
      <form @submit.prevent="handleEditUserDetail" class="form-group py-5 px-3">
         <div>
            <div>Username</div>
            <input type="text" placeholder="Username...." class="form-control py-2 w-100" v-model="user.username" />
         </div>
         <div class="mt-3">
             <div>Email</div>
            <input type="email" placeholder="Email...." class="form-control py-2 w-100" v-model="user.email" />
         </div>
         <div class="mt-3">
             <div>Password</div>
            <input type="password" placeholder="Password...." class="form-control py-2 w-100" v-model="user.password" />
         </div>
         <div class="mt-3">
            <AuthButton
              label="Update"
              :loading="loading"
            />
         </div>
      </form>
    </Card>
  </div>
</template>

<script>
import AuthButton from "../components/Buttons/AuthButton.vue";
import Loader from "../components/Loader.vue"
export default {
  middleware: ['auth'],
  components: {
    AuthButton,
    Loader
  },
  data() {
    return {
      loading: false,
      user: {
        username: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    async handleFetchUserProfile() {
      try {
        const response = await this.$axios.$get("/customer/profile");
        console.log(response)
        this.user.username = response.username;
        this.user.email = response.email;
      } catch (error) {
        console.log(error)
      }
    },
    async handleEditUserDetail() {
      this.loading = true;
      try {
        const response = await this.$axios.$put("/customer/edit-profile", { ...this.user });
        this.$toast.success(response.message);
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    }
  },
  mounted() {
    this.handleFetchUserProfile()
  }
}
</script>
