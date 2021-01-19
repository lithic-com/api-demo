<template>
  <div class="sidebar" v-chat-scroll="{ smooth: true }">
    <div class="status">
      <h4>Request Log</h4>
    </div>
    <div class="scroll">
      <div class="entry" v-for="(entry, index) in requests" :key="index">
        <div class="route" v-if="entry.path">Route {{ entry.path }}</div>
        <div v-if="entry.displayURL">
          <div>> {{ entry.method.toUpperCase() }} \</div>
          <div>'{{ entry.displayURL }}' \</div>
          <div class="param">-H “Authorization: api-key API_KEY"</div>
          <div class="param" v-for="(value, name) in entry.params" :key="name">
            -d {{ name }}={{ value }}
          </div>
          <div class="param" v-if="entry.data">
            -d '{{ JSON.stringify(entry.data) }}'
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  computed: {
    requests() {
      return this.$store.state.requests;
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  position: relative;
  background: var(--dark, #232320);
  min-height: 100vh;

  h4,
  div {
    color: white;
  }

  > .status {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 24px;
    position: sticky;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--dark-accent, rgb(76, 75, 72));
  }

  > .scroll {
    position: relative;
    box-sizing: border-box;
    padding: 20px 20px 6px;
    overflow: scroll;

    > .entry {
      margin: 0 0 20px 0;
      animation: fadein 0.3s;
      line-height: 24px;

      > .route {
        border: 1px dashed white;
        border-width: 1px 0 1px 0;
        padding: 10px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .param {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
