import Vue from "vue";
import Router from "vue-router";

const Home = () => import(/* webpackChunkName: "home" */ "./views/Home.vue");
const MovieCenter = () =>
	import(/* webpackChunkName: "movie" */ "./views/MovieCenter.vue");
const YoutubeDownloader = () =>
	import(/* webpackChunkName: "ytdl" */ "./views/YoutubeDownloader.vue");

Vue.use(Router);

export default new Router({
	mode: "hash",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			component: Home
		},
		{
			path: "/:provider(namava|filimo)/:id(\\d+)?",
			component: MovieCenter,
			props: true
		},
		{
			path: "/youtube",
			component: YoutubeDownloader
		}
	]
});
