import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import Btn from "./components/Btn.vue";
Vue.component("btn", Btn);
import "./keyboardNavigation";
import "./filters";
import "./api";
import "./registerServiceWorker";
import "./styles/main.scss";

Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
