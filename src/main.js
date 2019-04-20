import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import "./keyboardNavigation";
import "./filters";
import "./registerServiceWorker";
import "./styles/main.scss";

Vue.config.productionTip = false;

Vue.component("btn", () =>
	import(/* webpackChunkName: "btn" */ "./components/Btn.vue")
);
Vue.component("snackbar", () =>
	import(/* webpackChunkName: "snackbar" */ "./components/Snackbar.vue")
);

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
