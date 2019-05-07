import router from "../router";
import Point from "./point";
import { isInput, openModalExists } from "../helpers/";

/** @type {Point[]} */
let records = [],
	isRecording = false,
	isOk = false,
	progress = 0;

const dispatchEnd = () => {
	window.dispatchEvent(new CustomEvent("swipe-end"));
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
		window.dispatchEvent(
			new CustomEvent("swipe-progress", {
				detail: { progress }
			})
		);
	}

	if (!first || isOk) records.push(thisOne);
});

window.addEventListener("touchend", () => {
	if (!isRecording) return;
	if (
		isOk &&
		progress >= 1 &&
		records
			.map((p, i, a) => {
				const prev = a[i - 1];
				return prev ? p.x > prev.x : true;
			})
			.every(Boolean)
	) {
		router.push("/");
	}

	dispatchEnd();
	records = [];
	isOk = false;
	progress = 0;
});
