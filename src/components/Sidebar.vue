<template>
  <div class="sidebar" v-chat-scroll="{ smooth: true }">
    <div class="status">
      <h4>Request Log</h4>
    </div>
    <div class="scroll">
      <div class="entry" v-for="(entry, index) in requests" :key="index">
        <div class="row">
          <p class="number">1</p>
          <div class="route" v-if="entry.path">Route {{ entry.path }}</div>
        </div>

        <div v-if="entry.displayURL">
          <div class="row">
            <p class="number">1</p>
            <div class="request-type">> {{ entry.method.toUpperCase() }} \</div>
          </div>
          <div class="row">
            <p class="number">1</p>
            <div class="url">'{{ entry.displayURL }}' \</div>
          </div>
          <div class="row">
            <p class="number">1</p>
            <div class="param">-H “Authorization: api-key API_KEY"</div>
          </div>
          <div class="row">
            <p class="number">1</p>
            <div
              class="param"
              v-for="(value, name) in entry.params"
              :key="name"
            >
              -d {{ name }}={{ value }}
            </div>
          </div>
          <div class="row" v-if="entry.data">
            <p class="number">1</p>
            <div class="param">-d '{{ JSON.stringify(entry.data) }}'</div>
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
    },
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  position: relative;
  background: var(--request-log, #232320);
  min-height: 100vh;
  border-left: 1px solid rgba(0, 0, 0, 0.1);

  h4 {
    color: var(--color, #fff);
    font-weight: 500;
    font-size: 18px;
  }

  > .status {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 24px;
    position: sticky;
    z-index: 1;
    background: var(--request-log, #232320);
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  > .scroll {
    position: relative;
    box-sizing: border-box;
    padding: 20px 20px 6px;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    > .entry {
      margin: 0 0 0 0;
      animation: fadein 0.3s;
      line-height: 24px;

      .row {
        display: flex;
        align-items: center;
        .number {
          margin: 0px;
          margin-right: 10px;
          color: #b28f6b;
          opacity: 0.5;
        }
        > .route {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #b28f6b;
        }

        .param {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .url {
          color: #0093c9;
        }
        .request-type {
          color: #ff5c33;
        }
      }
    }
  }
  > .scroll::-webkit-scrollbar {
    display: none;
  }
}
</style>
