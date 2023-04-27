<template>
  <div class="header">
    <div>
      <router-link to="/">
        <i class="fas fa-chevron-left"></i> Home
      </router-link>
    </div>
    <div>
      <slot name="center"></slot>
      <h2>{{ title }}</h2>
    </div>
    <div class="right">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: ["title"],
};
</script>

<style scoped lang="scss">
.header {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
  align-items: center;
  margin-bottom: 35px;
  min-height: 37px;

  a {
    padding: 10px 20px;
    border-radius: 20px;
    text-decoration: none;

    i {
      margin-right: 4px;
    }

    &:hover {
      background: rgba(196, 196, 196, 0.2);
    }
  }

  h2 {
    margin: 0;
    text-align: center;
  }

  > .right {
    text-align: right;
  }
}
</style>
