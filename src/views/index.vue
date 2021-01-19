<template>
  <div id="app" :class="darkMode ? 'dark' : ''">
    <div>
      <div>
        <Navbar />
        <router-view></router-view>
      </div>
    </div>
    <Sidebar />
    <vue-toastr ref="toastr"></vue-toastr>
  </div>
</template>

<script>
import VueToastr from "vue-toastr";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  mounted() {
    window.toastr = this.$toastr;
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  components: {
    Sidebar,
    VueToastr,
    Navbar
  }
};
</script>

<style lang="scss">
#app {
  background: var(--background, white);

  > div:nth-of-type(1) {
    min-height: 100vh;
    width: calc(100vw - 385px);

    > div {
      min-width: 760px;
    }
  }

  > div:nth-of-type(2) {
    z-index: 2;
    position: fixed;
    right: 0;
    top: 0;
    width: 385px;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>
