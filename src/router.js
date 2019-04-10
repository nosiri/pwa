import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
	mode: "hash",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			component: () => import("./views/Home.vue")
		},
		{
			path: "/:provider(namava|filimo)/:id(\\d+)?",
			component: () => import("./views/MovieCenter.vue"),
			props: true
		},
		{
			path: "/youtube",
			component: () => import("./views/YoutubeDownloader.vue")
		}
	]
});
