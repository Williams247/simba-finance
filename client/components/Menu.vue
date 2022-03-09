<template>
  <div>
    <div>
      <Card :colored="true">
        <div class="close-btn">
          <div @click="handleCloseModal">X</div>
        </div>
        <h3 class="px-4">Simba</h3>
        <div id="menu">
        <ul v-for="(i, index) in Menu" :key="index">
          <li class="list-item mt-4" @click="handleCloseModal">
            <nuxt-link :to="i.url">
              {{ i.label }}
            </nuxt-link>
          </li>
        </ul>
        <ul>
          <li class="list-item mt-4" @click="handleLogout">
            <nuxt-link to="#">Logout</nuxt-link>
          </li>
        </ul>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Menu from "@/constants/menus.json";
export default {
  data() {
    return {
      Menu
    }
  },
  methods: {
    async handleLogout() {
      window.localStorage.clear()
      await this.$auth.logout()
      this.$router.push('/login')
    },
    handleCloseModal() {
      this.$store.dispatch('AppNav/setOpenClose', false)
    }
  }
}
</script>

<style lang="scss" scoped>
#menu {
  min-height: 100vh !important;
  .list-item {
    border-radius: 10px !important;
    cursor: pointer;
    &:hover {
      a {
          text-decoration: underline !important;
      }
    }
  }
  a {
     text-decoration: none !important;
     color: black;
  }
}

.close-btn {
  display: block;
  float: right;
  padding-bottom: 20px;
  @media (min-width: 800px) {
    display: none;
  }
}
</style>
