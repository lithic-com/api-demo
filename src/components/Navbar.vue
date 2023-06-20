<template>
  <div class="navbar">
    <router-link to="/">
      <img src="@/assets/logo.svg" />
    </router-link>
    <div>
      <router-link
        to="/"
        exact
        class="nav-link"
        :class="{ active: $route.path === '/' }"
      >
        Overview</router-link
      >
      <router-link
        to="/card"
        class="nav-link"
        :class="{ active: $route.path === '/card' }"
      >
        Cards
      </router-link>
      <router-link
        to="/fundingsource"
        class="nav-link"
        :class="{ active: $route.path === '/fundingsource' }"
      >
        Funding
      </router-link>
      <a href="https://lithic.com" target="_blank" class="nav-link"
        >Learn More</a
      >
      <a href="https://docs.lithic.com" target="_blank" class="nav-link"
        >Docs</a
      >
    </div>

    <div class="switch-container">
      <p>Light</p>
      <toggle-button
        :value="darkMode"
        @change="toggleDarkMode"
        class="toggle"
      />
      <p>Dark</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit("toggleDarkMode");
    },
  },
};
</script>

<style scoped lang="scss">
.navbar {
  box-sizing: border-box;
  z-index: 1;
  position: sticky;
  top: 0;
  height: 56px;
  width: 100%;
  padding: 0 100px;
  background: var(--light, #ffffff);
  display: flex;
  align-items: center;
  justify-content: space-between;

  > img {
    filter: var(--logo);
    height: 20px;
  }

  > div > .nav-link {
    font-weight: 400;
    font-family: "Graphik";
    text-decoration: none;
    margin-right: 24px;

    &:nth-child(7) {
      margin-left: auto;
    }

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      opacity: 0.7;
    }

    &.active {
      text-decoration: underline;
    }
  }

  .switch-container {
    display: flex;
    align-items: center;
  }

  .toggle {
    margin: 0 12px;
  }
}
</style>
