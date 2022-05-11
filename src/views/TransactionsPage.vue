<template>
  <div class="transactions-page">
    <PageHeader text="Transactions">
      <template v-slot:center>
        <div class="buttons">
          <button
            :class="{ active: approval_status === 'approvals' }"
            @click="toggleStatus('approvals')"
          >
            <h2>Transactions</h2>
          </button>
          <button
            :class="{ active: approval_status === 'declines' }"
            @click="toggleStatus('declines')"
          >
            <h2>Declines</h2>
          </button>
        </div>
      </template>
    </PageHeader>
    <List :items="transactions" />
    <button @click="getTransactions" v-if="transactions">Get More</button>
  </div>
</template>

<script>
import List from "@/components/List";
import PageHeader from "@/components/PageHeader";
export default {
  name: "TransactionsPage",
  async created() {
    this.getTransactions();
  },
  data() {
    return {
      approval_status: "approvals",
      transactions: null,
      page: 1,
    };
  },
  methods: {
    getTransactions: async function () {
      const transactions = await this.$store.dispatch("apiRequest", {
        url: `/transaction/${this.approval_status}`,
        data: {
          page: this.page,
        },
      });

      if (this.page === 1) {
        this.transactions = transactions;
      } else {
        this.transactions = [...this.transactions, ...transactions];
      }

      this.page = this.page + 1;
    },
    toggleStatus: function (approval_status) {
      this.page = 1;
      this.approval_status = approval_status;
      this.transactions = null;
      this.getTransactions();
    },
  },
  components: {
    List,
    PageHeader,
  },
};
</script>

<style scoped lang="scss">
.transactions-page {
  box-sizing: border-box;
  padding: 35px;
  max-width: 830px;
  margin: 0 auto;

  > button {
    margin-top: 35px;
    width: 100%;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;

    > button {
      padding-top: 7px;
      padding-bottom: 7px;
      height: auto;
      background: none;

      &:not(.active) {
        opacity: 0.5;
      }

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
