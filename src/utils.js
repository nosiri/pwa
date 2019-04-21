export function animateNumber(callback, to) {
	const absTo = Math.abs(to),
		step = Math.max((to / 100) >> 0, 1);

	let range = [];
	for (let i = 0; i <= absTo; i++) {
		if (i % step === 0) range.push(i);
	}
	if (range[range.length - 1] !== absTo) range.push(absTo);

	let i = 1;
	const timer = setInterval(() => {
		const current = range[i];
		callback(to < 0 ? -current : current);
		i++;
		if (i === range.length) clearInterval(timer);
	}, 1000 / range.length);
}

/** @param {Element} el */
export const isInput = ({ tagName }) => tagName.toLowerCase() === "input";
