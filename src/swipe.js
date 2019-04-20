import router from "./router";

/** @type {Array<{ x: number, y: number }>} */
let records = [];

window.addEventListener("touchmove", ({ targetTouches: touches }) => {
	const [{ clientX: x, clientY: y }] = touches;
	records.push({ x, y });
});

window.addEventListener("touchend", () => {
	if (records.length >= 2) {
		const [first] = records,
			last = records[records.length - 1];

		const d = last.x - first.x;
		if (d / window.innerWidth > 0.3) {
			const slope = (last.y - first.y) / (last.x - first.x);

			if (slope < 0.5 && slope > -0.5) {
				history.length <= 2 ? router.back() : router.push("/");
			}
		}
	}
	records = [];
});
