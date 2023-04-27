<template>
  <div class="funding-page">
    <PageHeader title="Funding Sources">
      <template v-slot:action>
        <button @click="showModal">New Funding Source</button>
      </template>
    </PageHeader>
    <div v-if="funding && funding.length === 0">No funding sources</div>
    <beat-loader :loading="!funding"></beat-loader>
    <div v-if="funding">
      <div class="row" v-for="source in funding" :key="source.token">
        <Info :data="source" />
      </div>
    </div>
    <modal name="funding-modal">
      <FundingModal :callback="onFundingAdded" />
    </modal>
  </div>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import Info from "@/components/Info";
import PageHeader from "@/components/PageHeader";
import FundingModal from "@/components/FundingModal";
export default {
  name: "FundingPage",
  async created() {
    this.funding = await this.$store.dispatch("apiRequest", {
      url: "/fundingsource",
    });
  },
  data() {
    return {
      funding: null,
      account_name: "",
      account_number: null,
      routing_number: null,
    };
  },
  methods: {
    showModal: async function () {
      this.$modal.show("funding-modal");
    },
    onFundingAdded: async function () {
      this.funding = await this.$store.dispatch("apiRequest", {
        url: "/fundingsource",
      });
      this.$modal.hide("funding-modal");
    },
  },
  components: {
    Info,
    PageHeader,
    FundingModal,
    BeatLoader,
  },
};
</script>

<style scoped lang="scss">
.funding-page {
  max-width: 830px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 35px;

  .row {
    margin-bottom: 30px;
  }
}
</style>
