import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import "./registerServiceWorker";
import "./styles/main.scss";

Vue.config.productionTip = false;

Vue.filter("cap", s => {
	s = s.toString();
	return s[0].toUpperCase() + s.slice(1);
});

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
