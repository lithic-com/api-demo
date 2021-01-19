<template>
  <div class="grid">
    <beat-loader :loading="!items"></beat-loader>
    <div v-if="items && items.length === 0">
      No Cards
    </div>
    <div class="items" v-if="items && items.length > 0">
      <router-link
        v-for="(item, index) in items"
        :key="item.token || index"
        :to="`/card/${item.token}`"
      >
        <Card
          :topRight="item.state"
          :bottomLeft="item.memo || item.hostname"
          :bottomRight="item.last_four"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import Card from "@/components/Card";
export default {
  name: "CardGrid",
  props: ["items"],
  components: {
    Card,
    BeatLoader
  }
};
</script>

<style scoped lang="scss">
.items {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 240px);
  row-gap: 20px;
  column-gap: 20px;

  > a {
    min-width: 0;
    text-decoration: none;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.7;
    }
    &:active {
      opacity: 0.5;
    }
  }
}
</style>
