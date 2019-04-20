import router from "./router";
import { isInput } from "./utils";

const ROUTES = {
	"": ["/", "h"],
	filimo: "f",
	namava: "n",
	youtube: "y",
	dictionary: "d"
};

window.addEventListener("keypress", ev => {
	if (ev.shiftKey || ev.altKey || ev.ctrlKey || ev.metaKey) return; // no modifier keys
	if (isInput(document.activeElement)) return; // no input must be focused
	if (!document.querySelector(".rv")) return; // only navigate when router is active
	if (document.querySelector(".modal.is-active")) return; // don't navigate whenever a modal is open

	for (const route in ROUTES) {
		const key = ROUTES[route];
		if (Array.isArray(key) ? key.includes(ev.key) : key === ev.key) {
			router.push(`/${route}`);
		}
	}
});
