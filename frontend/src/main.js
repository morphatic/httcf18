import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

// add form-field validation library (works with vuetify)
// npm i -S vee-validate
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

// add support for asynchronously computed properties
// npm i -S vue-async-computed
import AsyncComputed from "vue-async-computed";
Vue.use(AsyncComputed)

// import our custom color scheme
import "./theme";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
