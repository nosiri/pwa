import router from "./router";
import { isInput } from "./utils";

/** @type {Array<{ x: number, y: number }>} */ let records = [];

window.addEventListener("touchmove", ({ targetTouches: touches }) => {
	const [{ clientX: x, clientY: y }] = touches;
	records.push({ x, y });
});

window.addEventListener("touchend", ({ target }) => {
	if (!isInput(target) && records.length >= 2) {
		const [first] = records,
			last = records[records.length - 1];

		const dx = last.x - first.x;

		if (
			dx / window.innerWidth >= 0.25 &&
			records
				.map(({ x, y }, i) => {
					const next = records[i + 1];
					return next ? (next.y - y) / (next.x - x) : null;
				})
				.filter(i => i !== null)
				.every(n => Math.abs(n) <= 1.1)
		) {
			router.push("/");
		}
	}
	records = [];
});
