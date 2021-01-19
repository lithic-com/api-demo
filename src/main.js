import Vue from "vue";
import VueChatScroll from "vue-chat-scroll";
import VueToastr from "vue-toastr";
import VModal from "vue-js-modal";
import ToggleButton from "vue-js-toggle-button";

import App from "./views";
import router from "./router";
import store from "./store";
import "./App.css";

Vue.config.productionTip = false;

Vue.use(VueChatScroll);
Vue.use(VModal);
Vue.use(ToggleButton);
Vue.use(VueToastr, {
  defaultPosition: "toast-bottom-left"
});

new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
