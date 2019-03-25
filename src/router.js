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
		},
		{
			path: "/sc",
			component: () => import("./views/LinkDownloader.vue"),
			props: { domain: "https://soundcloud.com" }
		},
		{
			path: "/yt",
			component: () => import("./views/LinkDownloader.vue"),
			props: { domain: "https://youtube.com" }
		}
	]
});
