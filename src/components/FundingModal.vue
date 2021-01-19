<template>
  <div class="funding-modal">
    <h2>Add a Funding Source</h2>
    <div>Account Name (Optional):</div>
    <input v-model="account_name" placeholder="account_name (OPTIONAL)" />
    <div>Account Number:</div>
    <input v-model="account_number" placeholder="account_number" />
    <div>Routing Number:</div>
    <input v-model="routing_number" placeholder="routing_number" />
    <br />
    <button @click="addFunding">Submit</button>
  </div>
</template>

<script>
export default {
  name: "FundingModal",
  props: ["funding", "callback"],
  data() {
    return {
      account_name: "",
      account_number: null,
      routing_number: null
    };
  },
  methods: {
    addFunding: async function() {
      if (this.account_number && this.routing_number) {
        const ret = await this.$store.dispatch("apiRequest", {
          url: "/fundingsource/bank",
          method: "post",
          data: {
            account_name: this.account_name,
            routing_number: this.routing_number,
            account_number: this.account_number
          }
        });
        this.callback && this.callback(ret);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.funding-modal {
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
