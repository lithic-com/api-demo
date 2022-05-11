<template>
  <div class="navbar">
    <router-link to="/">
      <img src="@/assets/logo.svg" />
    </router-link>
    <router-link to="/card"> Cards </router-link>
    <router-link to="/transaction"> Transactions </router-link>
    <router-link to="/fundingsource"> Funding </router-link>
    <toggle-button :value="darkMode" @change="toggleDarkMode" />
    <a href="https://lithic.com" target="_blank"> Learn More </a>
    <a href="https://docs.lithic.com" target="_blank"> API Docs </a>
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
    toggleDarkMode: function () {
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
  background: var(--light, #f0eeeb);
  padding: 0 24px;
  display: flex;
  align-items: center;

  > * {
    font-weight: bold;
    font-family: "Graphik";
    text-decoration: none;
    margin-right: 24px;

    > img {
      filter: var(--logo);
      height: 20px;
    }

    &:nth-child(5) {
      margin-left: auto;
    }

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
