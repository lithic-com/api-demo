<template>
  <div class="transaction-page">
    <PageHeader title="Transaction" />
    <beat-loader :loading="!transaction"></beat-loader>
    <div class="page" v-if="transaction">
      <div class="schema">
        <h2>Transaction Schema</h2>
        <Info :data="transaction" />
      </div>
      <div>
        <h2>Merchant Data</h2>
        <div class="merchant" v-if="transaction.merchant">
          <div>
            <b>{{ transaction.merchant.descriptor }}</b>
          </div>
          <div>
            {{ transaction.merchant.state }},{{ transaction.merchant.country }}
          </div>
          <div>{{ transaction.merchant.mcc }}</div>
        </div>
      </div>
      <div>
        <div class="small-header">
          <h2>Events</h2>
          <div class="buttons">
            <button @click="simVoid">Simulate Void</button>
            <button @click="simClearing">Simulate Clearing</button>
          </div>
        </div>
        <List v-if="events" :items="events" :disableLink="true" />
      </div>
    </div>
  </div>
</template>

<script>
import get from "lodash/get";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import PageHeader from "@/components/PageHeader";
import Info from "@/components/Info";
import List from "@/components/List";
export default {
  name: "TransactionPage",
  async created() {
    this.getTransaction();
  },
  data() {
    return {
      transaction: null,
      events: null,
    };
  },
  methods: {
    getTransaction: async function () {
      const data = await this.$store.dispatch("apiRequest", {
        url: "/transaction",
      });
      this.transaction = get(data, "0", {});
      this.events = get(data, "0.events", []);
    },
    simVoid: async function () {
      await this.$store.dispatch("apiRequest", {
        url: "/simulate/void",
        method: "post",
        data: {
          amount: this.transaction.amount,
          token: this.transaction.token,
        },
      });
      this.getTransaction();
    },
    simClearing: async function () {
      await this.$store.dispatch("apiRequest", {
        url: "/simulate/clearing",
        method: "post",
        data: {
          amount: this.transaction.amount,
          token: this.transaction.token,
        },
      });
      this.getTransaction();
    },
  },
  components: {
    PageHeader,
    Info,
    List,
    BeatLoader,
  },
};
</script>

<style scoped lang="scss">
.transaction-page {
  margin: 0 auto;
  max-width: 830px;
  box-sizing: border-box;
  padding: 35px;

  > .page {
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-template-columns: 2fr 3fr;
    column-gap: 30px;

    > .schema {
      grid-row: 1 / 3;
      display: grid;
      grid-template-rows: min-content 1fr;
    }
  }

  .merchant {
    background: rgba(242, 244, 250, 0.2);
    border: 1px solid #cfcfcf;
    border-radius: 4px;
    padding: 20px;
    display: grid;
    row-gap: 20px;
    grid-template-columns: 1fr min-content;
    grid-template-rows: 1fr min-content;
    justify-content: space-between;
  }

  .small-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;

    > .buttons > button {
      margin-right: 20px;

      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>
