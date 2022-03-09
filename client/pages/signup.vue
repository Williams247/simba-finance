<template>
  <div class="mb-5">
    <Card>
      <div class="py-5 px-4">
        <h3>Signup</h3>
        <div class="mt-4 pt-3">
          <form class="form-group" @submit.prevent="handleSignUp">
            <p>Username</p>
            <div class="mt-2">
              <input
                type="text"
                class="form-control py-3"
                placeholder="Enter your username...."
                v-model="user.username"
            />
            </div>
            <p class="mt-4">Email</p>
            <div class="mt-2">
              <input
                type="email"
                class="form-control py-3"
                placeholder="Enter your email...."
                v-model="user.email"
            />
            </div>
            <p class="mt-4">Password</p>
            <div>
              <input
                type="password"
                class="form-control py-3"
                placeholder="Enter your password...."
                v-model="user.password"
            />
            </div>
            <div class="mt-4">
              <AuthButton
                label="Signup"
                :loading="loading"
              />
            </div>
          </form>
          <p class="mt-3">
            Already have an account?
            <nuxt-link to="/login">Login</nuxt-link>
          </p>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import AuthButton from "@/components/Buttons/AuthButton.vue";
export default {
  components: {
    Card,
    AuthButton
  },
  layout: "auth",
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
    async handleSignUp() {
      this.loading = true;
      try {
        const response = await this.$axios.$post("/auth/signup", {
          ...this.user
        });
        this.loading = false;
        this.$toast.success(response.message)
        this.$router.push('/login')
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    }
  }
}
</script>
