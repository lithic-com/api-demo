<template>
  <div class="card-modal">
    <h2>{{ card && card.token ? "Update Card" : "Create Card" }}</h2>
    <div>Memo:</div>
    <input v-model="memo" placeholder="memo" />
    <div>Type:</div>
    <select v-model="type">
      <option>SINGLE_USE</option>
      <option>MERCHANT_LOCKED</option>
      <option>UNLOCKED</option>
    </select>
    <div>Spend limit:</div>
    <input v-model="spend_limit" placeholder="spend_limit" />
    <div>Spend limit duration:</div>
    <select v-model="spend_limit_duration">
      <option>TRANSACTION</option>
      <option>MONTHLY</option>
      <option>ANNUALLY</option>
      <option>FOREVER</option>
    </select>
    <div>State:</div>
    <select v-model="state" :disabled="!card">
      <option>OPEN</option>
      <option>PAUSED</option>
      <option>CLOSED</option>
    </select>
    <br />
    <button @click="createCard">
      {{ card && card.token ? "Update" : "Create" }}
    </button>
  </div>
</template>

<script>
export default {
  name: "CardModal",
  props: ["card", "callback"],
  created() {
    if (this.card && this.card.token) {
      this.memo = this.card.memo;
      this.type = this.card.type;
      this.spend_limit = this.card.spend_limit;
      this.spend_limit_duration = this.card.spend_limit_duration;
      this.state = this.card.state;
    }
  },
  data() {
    return {
      memo: "",
      type: "SINGLE_USE",
      spend_limit: 0,
      spend_limit_duration: "TRANSACTION",
      state: "OPEN",
    };
  },
  methods: {
    createCard: async function () {
      const req = {
        url: "/card",
        method: "post",
        data: {
          memo: this.memo,
          spend_limit: Number(this.spend_limit),
          spend_limit_duration: this.spend_limit_duration,
          state: this.state,
        },
      };
      const token = this.card && this.card.token;
      if (token) {
        req.method = "put";
        req.data.card_token = token;
      } else {
        req.data.type = this.type;
      }
      const ret = await this.$store.dispatch("apiRequest", req);
      this.callback && this.callback(ret);
    },
  },
};
</script>

<style scoped lang="scss">
.card-modal {
  background: var(--background, white);
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: grid;
  grid-template-columns: 200px 1fr;
  row-gap: 10px;

  > button,
  > h2 {
    grid-column: span 2 / auto;
    margin: 0;
  }

  > * {
    padding: 10px;
  }
}
</style>
