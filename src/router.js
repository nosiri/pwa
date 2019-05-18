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
const Soundcloud = () =>
	import(/* webpackChunkName: "sc" */ "./views/Soundcloud.vue");
const Settings = () =>
	import(/* webpackChunkName: "settings" */ "./views/Settings.vue");
const Weather = () =>
	import(/* webpackChunkName: "weather" */ "./views/Weather.vue");

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
			path: "/settings",
			component: Settings
		},
		{
			path: "/cinema",
			component: Cinema
		},
		{
			path: "/cinema/:uid",
			component: Movie,
			props: true
		},
		{
			path: "/weather",
			component: Weather
		},
		{
			path: "/youtube",
			component: YoutubeDownloader
		},
		{
			path: "/dictionary",
			component: Dictionary
		},
		{
			path: "/soundcloud",
			component: Soundcloud
		}
	]
});
