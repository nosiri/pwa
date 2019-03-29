import router from "./router";

const ROUTES = {
	"": ["/", "h"],
	filimo: "f",
	namava: "n",
	youtube: "y"
};

window.addEventListener("keypress", ev => {
	if (!document.querySelector(".rv")) return;
	if (ev.shiftKey || ev.altKey || ev.ctrlKey || ev.metaKey) return;
	if (document.activeElement.tagName === "INPUT") return;

	for (const route in ROUTES) {
		const key = ROUTES[route];
		if (Array.isArray(key) ? key.includes(ev.key) : key === ev.key) {
			router.push(`/${route}`);
		}
	}
});
