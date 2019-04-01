import router from "./router";

const ROUTES = {
	"": ["/", "h"],
	filimo: "f",
	namava: "n",
	youtube: "y"
};

window.addEventListener("keypress", ev => {
	if (!document.querySelector(".rv")) return; // only navigate when router is active
	if (document.querySelector(".modal.is-active")) return; // don't navigate whenever a modal is open
	if (ev.shiftKey || ev.altKey || ev.ctrlKey || ev.metaKey) return; // no modifier keys
	if (document.activeElement.tagName === "INPUT") return; // no input must be focused

	for (const route in ROUTES) {
		const key = ROUTES[route];
		if (Array.isArray(key) ? key.includes(ev.key) : key === ev.key) {
			router.push(`/${route}`);
		}
	}
});
