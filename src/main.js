import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import "./mixins/globals";
import "./filters";
import "./keyboardNavigation";
import "./swipe/";
import "./db";
import "./registerServiceWorker";
import "./styles/main.scss";

Vue.config.productionTip = false;

Vue.component("btn", () =>
	import(/* webpackChunkName: "btn" */ "./components/Btn.vue")
);
Vue.component("text-field", () =>
	import(/* webpackChunkName: "text-field" */ "./components/TextField.vue")
);
Vue.component("page-header", () =>
	import(/* webpackChunkName: "header" */ "./components/PageHeader.vue")
);
Vue.component("snackbar", () =>
	import(/* webpackChunkName: "snackbar" */ "./components/Snackbar.vue")
);
Vue.component("simple-form", () =>
	import(/* webpackChunkName: "form" */ "./components/SimpleForm.vue")
);

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
