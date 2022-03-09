<template>
  <div>
    <Card>
      <div class="py-5 px-4">
        <h3>Login</h3>
        <div class="mt-4 pt-3">
          <form class="form-group" @submit.prevent="handleLogin">
            <p>Email</p>
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
                label="Login"
                :loading="loading"
              />
            </div>
          </form>
          <p class="mt-3">
            Don't have an account?
            <nuxt-link to="/signup">Signup</nuxt-link>
          </p>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/Card.vue"
import AuthButton from "@/components/Buttons/AuthButton.vue"
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
        email: "",
        password: ""
      }
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        await this.$auth.login({ data: this.user })
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    }
  }
}
</script>
