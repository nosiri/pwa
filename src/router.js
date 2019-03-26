import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			component: Home
		},
		{
			path: "/:provider(namava|filimo)/:id(\\d+)?",
			component: () => import("./views/MovieCenter.vue"),
			props: true
		}
	]
});
