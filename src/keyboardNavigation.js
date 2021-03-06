import router from "./router";
import { isInput, openModalExists } from "./helpers";

window.addEventListener("keypress", ev => {
	if (ev.shiftKey || ev.altKey || ev.ctrlKey || ev.metaKey) return; // no modifier keys
	if (isInput(document.activeElement)) return; // no input must be focused
	if (!document.querySelector(".rv")) return; // only navigate when router is active
	if (openModalExists()) return; // don't navigate whenever a modal is open

	/** @type {import("vue-router").RouterOptions} */
	const opts = router.options;
	for (const { path, meta } of opts.routes) {
		if (meta?.disableKeyNav) continue;

		const [firstSection] = path.match(/^\/[^/]*/i);
		if ((firstSection.charAt(1) || firstSection.charAt(0)) === ev.key) {
			router.push(firstSection);
		}
	}
});
