import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import "./keyboardNavigation";
import "./filters";
import "./registerServiceWorker";
import "./styles/main.scss";

Vue.config.productionTip = false;

Vue.component("btn", () => import("./components/Btn.vue"));

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
