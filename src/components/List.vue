<template>
  <div>
    <beat-loader :loading="!items"></beat-loader>
    <div v-if="items && items.length === 0">
      No items
    </div>
    <router-link
      class="item"
      v-for="item in items"
      :key="item.token"
      :to="!disableLink ? `/transaction/${item.token}` : ''"
    >
      <div class="date">
        {{ new Date(item.created).toString().slice(4, 16) }}
      </div>
      <div>{{ item.merchant ? item.merchant.descriptor : item.result }}</div>
      <div class="status">{{ (item.status || item.type).toLowerCase() }}</div>
      <div class="amount">${{ (item.amount / 100).toFixed(2) }}</div>
    </router-link>
  </div>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
export default {
  name: "List",
  props: ["items", "disableLink"],
  components: {
    BeatLoader
  }
};
</script>

<style scoped lang="scss">
.item {
  text-decoration: none;
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  column-gap: 20px;
  margin-bottom: 30px;
  animation: fadein 0.3s;
  font-size: 14px;

  > .amount {
    text-align: right;
    font-weight: bold;
  }

  > .date {
    white-space: nowrap;
  }

  > .status {
    text-transform: capitalize;
    opacity: 0.7;
  }

  &:last-of-type {
    margin: 0;
  }

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
}
</style>
