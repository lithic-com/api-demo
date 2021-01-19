<template>
  <div class="card-page">
    <PageHeader title="Card">
      <template v-slot:action>
        <button @click="showModal">Edit Card</button>
      </template>
    </PageHeader>
    <beat-loader :loading="!card"></beat-loader>
    <div class="page" v-if="card">
      <div class="schema">
        <h2>Card Schema</h2>
        <Info :data="card" />
      </div>
      <div>
        <h2>Hosted Card UI</h2>
        <Card :url="url" />
      </div>
      <div class="disclaimer">
        Due to security constraints, a card’s expiration date, pan, and cvv can
        only be displayed through a hosted iframe
      </div>
      <div class="transactions">
        <div class="small-header">
          <h2>Transactions</h2>
          <div class="buttons">
            <button
              @click="simAuth"
              :disabled="
                !transactions ||
                  (card.type === 'SINGLE_USE' &&
                    transactions &&
                    transactions.length > 0)
              "
            >
              Simulate Authorization
            </button>
            <button @click="simReturn">Simulate Return</button>
          </div>
        </div>
        <List :items="transactions" />
      </div>
    </div>
    <modal name="card-modal" height="400">
      <CardModal :card="card" :callback="onEditCard" />
    </modal>
  </div>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import Info from "@/components/Info";
import Card from "@/components/Card";
import List from "@/components/List";
import PageHeader from "@/components/PageHeader";
import CardModal from "@/components/CardModal";
export default {
  name: "CardPage",
  created() {
    this.$store
      .dispatch("apiRequest", {
        url: "/embed/card"
      })
      .then(({ url }) => {
        this.url = url;
      });

    this.$store
      .dispatch("apiRequest", {
        url: "/card"
      })
      .then(([first]) => {
        this.card = first;
      });

    this.getTransactions();
  },
  data() {
    return {
      card: null,
      transactions: null,
      url: ""
    };
  },
  methods: {
    getTransactions: async function() {
      this.transactions = await this.$store.dispatch("apiRequest", {
        url: "/transaction"
      });
    },
    simAuth: async function() {
      try {
        await this.$store.dispatch("apiRequest", {
          url: "/simulate/authorize",
          method: "post",
          data: {
            descriptor: `Sample Transaction`,
            amount: Math.floor(Math.random() * Math.floor(10000)) + 100,
            pan: this.card.pan
          }
        });
        this.getTransactions();
      } catch (err) {
        console.error("Error simulating transaction");
      }
    },
    simReturn: async function() {
      try {
        await this.$store.dispatch("apiRequest", {
          url: "/simulate/return",
          method: "post",
          data: {
            descriptor: `Sample Return`,
            amount: Math.floor(Math.random() * Math.floor(10000)) + 100,
            pan: this.card.pan
          }
        });
        this.getTransactions();
      } catch (err) {
        console.error("Error simulating return");
      }
    },
    showModal: async function() {
      this.$modal.show("card-modal");
    },
    onEditCard: async function() {
      this.card = null;
      const cards = await this.$store.dispatch("apiRequest", { url: "/card" });
      this.card = cards[0];
      this.$modal.hide("card-modal");
    }
  },
  components: {
    Card,
    Info,
    List,
    PageHeader,
    CardModal,
    BeatLoader
  }
};
</script>

<style scoped lang="scss">
.card-page {
  box-sizing: border-box;
  padding: 35px;
  max-width: 830px;
  margin: 0 auto;
}
.page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content 1fr;
  row-gap: 30px;
  column-gap: 30px;

  > .schema {
    grid-row: 1 / 3;
    display: grid;
    grid-template-rows: min-content;
  }

  .card {
    width: 100%;
    height: 200px;
  }

  > .disclaimer {
    font-family: "Roboto Mono";
    background: rgba(242, 244, 250, 0.2);
    border: 1px solid #cfcfcf;
    border-radius: 4px;
    padding: 20px;
  }

  > .transactions {
    grid-column: 1 / 3;

    > .small-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 35px;

      h2 {
        margin: 0;
      }

      > .buttons {
        button:first-of-type {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
