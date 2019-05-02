import Vue from "vue";
import Router from "vue-router";

const Home = () => import(/* webpackChunkName: "home" */ "./views/Home.vue");
const Cinema = () =>
	import(/* webpackChunkName: "cinema" */ "./views/Cinema.vue");
const Movie = () => import(/* webpackChunkName: "movie" */ "./views/Movie.vue");
const YoutubeDownloader = () =>
	import(/* webpackChunkName: "ytdl" */ "./views/YoutubeDownloader.vue");
const Dictionary = () =>
	import(/* webpackChunkName: "dict" */ "./views/Dictionary.vue");

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
			path: "/cinema",
			component: Cinema
		},
		{
			path: "/cinema/:uid",
			component: Movie
		},
		{
			path: "/youtube",
			component: YoutubeDownloader
		},
		{
			path: "/dictionary",
			component: Dictionary
		}
	]
});
