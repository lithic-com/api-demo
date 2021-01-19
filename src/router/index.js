import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/HomePage";
import CardPage from "@/views/CardPage";
import CardsPage from "@/views/CardsPage";
import TransactionPage from "@/views/TransactionPage";
import TransactionsPage from "@/views/TransactionsPage";
import FundingPage from "@/views/FundingPage";
import ApiKeyPage from "@/views/ApiKeyPage";
import store from "@/store/index.js";

Vue.use(VueRouter);

const Router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage
    },
    {
      path: "/card/:card_token",
      name: "Card",
      component: CardPage
    },
    {
      path: "/card",
      name: "Cards",
      component: CardsPage
    },
    {
      path: "/transaction/:transaction_token",
      name: "Transaction",
      component: TransactionPage
    },
    {
      path: "/transaction",
      name: "Transactions",
      component: TransactionsPage
    },
    {
      path: "/fundingsource*",
      name: "Funding",
      component: FundingPage
    },
    {
      path: "/apiKey",
      name: "API Key",
      component: ApiKeyPage
    }
  ]
});

Router.beforeEach((to, from, next) => {
  if (
    !store.state.apiKey &&
    !process.env.VUE_APP_API_KEY &&
    to.path !== "/apiKey" &&
    !to.query.apiKey &&
    !from.query.apiKey
  ) {
    next({ path: "/apiKey" });
  } else {
    if (from.query.apiKey && !to.query.apiKey) {
      next({ path: to.path, query: from.query, replace: true });
    } else {
      store.commit("setRequests", to);
      next();
    }
  }
});

export default Router;
