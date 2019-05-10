import Point from "./point";
import { isInput, openModalExists } from "../helpers/";

/** @type {Point[]} */
let records = [],
	isRecording = false,
	isOk = false,
	progress = 0;

const dispatch = (type, detail) => {
	window.dispatchEvent(new CustomEvent(type, { detail }));
};

window.addEventListener("touchstart", event => {
	isRecording = !isInput(event.target) && !openModalExists();
});

window.addEventListener("touchmove", ({ targetTouches }) => {
	if (!isRecording) return;
	const [{ clientX: x, clientY: y }] = targetTouches,
		thisOne = new Point(x, y),
		[first] = records;

	if (
		first &&
		!isOk &&
		thisOne.x - first.x >= 10 &&
		Math.abs(thisOne.slopeFrom(first)) <= 1
	) {
		isOk = true;
	}

	if (isOk) {
		progress = (thisOne.distanceFrom(first) / window.innerWidth) * 4;
		dispatch("swipe-progress", { progress });
	}

	if (!first || isOk) records.push(thisOne);
});

window.addEventListener("touchend", () => {
	if (!isRecording) return;
	if (
		isOk &&
		progress >= 1 &&
		records
			.map(({ x }, i, a) => {
				const prev = a[i - 1];
				return prev ? x >= prev.x : true;
			})
			.every(Boolean)
	) {
		dispatch("swipe-done");
	}

	dispatch("swipe-end");
	records = [];
	isOk = false;
	progress = 0;
});
