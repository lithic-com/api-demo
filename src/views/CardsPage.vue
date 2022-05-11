<template>
  <div class="cards-page">
    <PageHeader title="Cards">
      <template v-slot:action>
        <button @click="showModal">New Card</button>
      </template>
    </PageHeader>
    <CardGrid :items="cards" />
    <br />
    <button @click="getCards" v-if="cards">Get More</button>
    <modal name="card-modal" height="400">
      <CardModal :callback="onCreateCard" />
    </modal>
  </div>
</template>

<script>
import CardGrid from "@/components/CardGrid";
import CardModal from "@/components/CardModal";
import PageHeader from "@/components/PageHeader";
export default {
  name: "CardsPage",
  async created() {
    this.getCards();
  },
  data() {
    return {
      cards: null,
      page: 1,
      type: "SINGLE_USE",
      spend_limit_duration: "TRANSACTION",
    };
  },
  methods: {
    showModal: async function () {
      this.$modal.show("card-modal");
    },
    onCreateCard: function ({ token } = {}) {
      this.$router.push("/card/" + token);
    },
    getCards: async function () {
      const cards = await this.$store.dispatch("apiRequest", {
        url: "/card",
        data: {
          page: this.page,
          page_size: 12,
        },
      });
      this.cards = [...(this.cards || []), ...cards];
      this.page = this.page + 1;
    },
  },
  components: {
    CardGrid,
    CardModal,
    PageHeader,
  },
};
</script>

<style scoped lang="scss">
.cards-page {
  max-width: 830px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 35px;

  > button {
    width: 100%;
  }
}
</style>
