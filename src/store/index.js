import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);

const baseURL = process.env.VUE_APP_API;

export default new Vuex.Store({
  state: { requests: [], cards: [], apiKey: null, darkMode: false },
  actions: {
    async apiRequest(
      { commit, state },
      { url, method = "get", logging = true, data: passedData }
    ) {
      try {
        const paramApiKey = router.history.current.query.apiKey;
        const params = { ...passedData, ...router.currentRoute.params };
        const headers = { "Content-Type": "application/json" };

        if (state.apiKey || paramApiKey) {
          headers["Authorization"] = `api-key ${state.apiKey || paramApiKey}`;
        }

        const req = {
          headers,
          method,
          baseURL,
          url
        };

        if (method === "get") {
          req.params = params;
        } else {
          req.data = passedData;
        }

        const res = await axios(req);
        const { data, displayURL, ...otherData } = res.data;

        if (logging) {
          commit("setRequests", {
            displayURL,
            method,
            params: req.params && (otherData.params || params),
            data: !req.params && passedData
          });
        }

        return data || otherData;
      } catch (err) {
        window.toastr.e(err.response.data.message);
      }
    }
  },
  mutations: {
    setApiKey: (state, request) => {
      state.apiKey = request;
    },
    setRequests: (state, request) => {
      state.requests = [...state.requests, request];
    },
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode;
    }
  }
});
