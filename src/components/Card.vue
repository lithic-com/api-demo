<template>
  <div class="card">
    <div class="url" v-if="url">{{ url }}</div>
    <div v-if="!url"></div>
    <iframe
      id="card-iframe"
      class="content"
      :src="url"
      v-if="url"
      allow="clipboard-write"
    />
    <div class="content" v-if="!url">
      <div class="row">
        <div>{{ topLeft || "" }}</div>
        <div>{{ topRight || "" }}</div>
      </div>
      <div class="row">
        <div>{{ middleLeft || "" }}</div>
        <div></div>
      </div>
      <div class="row">
        <div>{{ bottomLeft || "" }}</div>
        <div class="bottomRight">{{ bottomRight || "" }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: [
    "disclaimer",
    "url",
    "topLeft",
    "topRight",
    "bottomLeft",
    "middleLeft",
    "bottomRight",
  ],
};
</script>

<style scoped lang="scss">
.card {
  height: 150px;
  width: 240px;
  display: grid;
  grid-template-rows: min-content 1fr;

  > .url {
    background: linear-gradient(#e0e0e0, #b0adaa);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px;
    border-radius: 16px 16px 0 0;
  }

  > .content {
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 1fr 30% min-content;
    text-decoration: none;
    animation: fadein 0.3s;
    padding: 20px;
    background: var(--accent, #232323);
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
    width: 100%;
    height: 100%;

    .row {
      display: grid;
      grid-template-columns: 1fr min-content;
      column-gap: 20px;

      > div {
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    div {
      font-family: "Roboto Mono";
      color: var(--inv-color, white);
    }
  }

  > iframe.content {
    background: var(--embed, #232323);
    border: none;
    border-radius: 0 0 16px 16px;
    width: 100%;
  }
}
</style>
