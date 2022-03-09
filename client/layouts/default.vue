<template>
  <div>
    <div v-if="isOpen" class="modal-body">
      <Menu />
    </div>
    <div class="d-flex flex-direction-row-column px-4 mt-4 mb-4">
      <div class="col-lg-2">
        <div class="desktop-menu">
          <Menu />
        </div>
        <!-- <ul class="d-flex mobile-menu">
          <li class="px-2">
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li class="px-2">
            <nuxt-link to="/transfer">Transfer</nuxt-link>
          </li>
          <li class="px-2">
            <nuxt-link to="/profile">Profile</nuxt-link>
          </li>
          <li class="px-2" @click="handleLogout">
            <nuxt-link to="">Logout</nuxt-link>
          </li>
        </ul> -->
      </div>
      <div class="col-lg-10 spacing pt-1">
        <div id="mobile-menu" class="px-4 py-4" @click="handleCloseModal">
          <MenuIcon />
        </div>
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import MenuIcon from "@/components/MenuIcon.vue"
export default {
  components: {
    Menu,
    MenuIcon
  },
  methods: {
    async handleLogout() {
      window.localStorage.clear()
      await this.$auth.logout()
      this.$router.push('/login')
    },
    handleCloseModal() {
      this.$store.dispatch('AppNav/setOpenClose', true)
    }
  },
  computed: {
    isOpen() {
      return this.$store.getters["AppNav/opened"];
    }
  }
}
</script>

<style lang="scss" scoped>
.spacing {
  padding-left: 0;
  padding-right: 0;
  @media (min-width: 800px) {
    padding-left: 50px;
    padding-right: 50px;
  }
}

a {
  color: black !important;
  text-decoration: none !important;
}

#mobile-menu {
  display: block;
  @media (min-width: 1000px) {
    display: none;
  }
}

.modal-body {
  background: rgba(0,0,0,0.5);
  height: 100vh;
  width: 100%;
  z-index: 10;
  bottom: 0;
  position: fixed;
  display: block;
  @media (min-width: 1000px) {
    display: none;
  }
}

.desktop-menu {
  display: none;
  @media (min-width: 1000px) {
    display: block;
  }
}
</style>
