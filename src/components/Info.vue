<template>
  <div class="info">
    <vue-json-pretty :data="data" :deep="1"> </vue-json-pretty>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
export default {
  name: "Info",
  props: ["data"],
  components: {
    VueJsonPretty
  }
};
</script>

<style scoped lang="scss">
.info {
  > div {
    box-sizing: border-box;
    height: 100%;
    background: rgba(242, 244, 250, 0.2);
    border: 1px solid #cfcfcf;
    border-radius: 4px;
    padding: 20px;
  }
}
</style>
