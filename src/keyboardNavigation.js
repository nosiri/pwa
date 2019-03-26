import router from "./router";

const ROUTES = {
	"": "/",
	filimo: "f",
	namava: "n"
};

window.addEventListener("keypress", ev => {
	if (!document.querySelector(".rv")) return;
	if (ev.shiftKey || ev.altKey || ev.ctrlKey || ev.metaKey) return;
	if (document.activeElement.tagName === "INPUT") return;

	for (const [route, key] of Object.entries(ROUTES)) {
		if (key === ev.key) router.push(`/${route}`);
	}
});
