<template>
  <div>
    <beat-loader :loading="!(cards && transactions)"></beat-loader>
    <div class="home" v-if="cards && transactions">
      <div class="section">
        <div class="header">
          <router-link to="/card">
            <h2>Cards</h2>
          </router-link>
          <button @click="showModal">New Card</button>
        </div>
        <CardGrid :items="cards" />
        <modal name="card-modal" height="400">
          <CardModal :callback="onCreateCard" />
        </modal>
      </div>
      <div class="section">
        <router-link to="/transaction">
          <h2>Transactions</h2>
        </router-link>
        <List :items="transactions" />
      </div>
      <router-link class="button" to="/card" v-if="cards">
        See All Cards
      </router-link>
      <router-link class="button" to="/transaction" v-if="transactions">
        See All Transactions
      </router-link>
    </div>
  </div>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import CardModal from "@/components/CardModal";
import List from "@/components/List";
import CardGrid from "@/components/CardGrid";
export default {
  name: "HomePage",
  created() {
    this.$store
      .dispatch("apiRequest", {
        url: "/card",
        data: { page_size: 3 },
      })
      .then((cards) => {
        this.cards = cards;
      });

    this.$store
      .dispatch("apiRequest", {
        url: "/transaction",
        data: { page_size: 11 },
      })
      .then((transactions) => {
        this.transactions = transactions;
      });
  },
  methods: {
    showModal: async function () {
      this.$modal.show("card-modal");
    },
    onCreateCard: function ({ token } = {}) {
      this.$router.push("/card/" + token);
    },
  },
  data() {
    return {
      cards: null,
      transactions: null,
    };
  },
  components: {
    List,
    CardGrid,
    CardModal,
    BeatLoader,
  },
};
</script>

<style scoped lang="scss">
.home {
  box-sizing: border-box;
  padding: 35px;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-auto-rows: min-content;
  column-gap: 60px;
  row-gap: 30px;

  > .section {
    > .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      > button {
        padding: 4px 10px;
      }

      h2 {
        margin: 0;
      }
    }

    &:last-of-type {
      margin-bottom: 0px;
    }

    a {
      color: black;
      text-decoration: none;
      transition: 0.3s opacity;
    }
  }

  > .button {
    padding: 16px 0;
    border-radius: 14px;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 30px;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
