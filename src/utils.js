export function animateNumber(callback, to, step = 1) {
	const absTo = Math.abs(to);

	let range = [];
	for (let i = 0; i <= absTo / step; i++) range.push(i * step);
	if (range[range.length - 1] !== absTo) range.push(absTo);

	let i = 1;
	const timer = setInterval(() => {
		const current = range[i];
		callback(to < 0 ? -current : current);
		i++;
		if (i === range.length) clearInterval(timer);
	}, 1000 / range.length);
}
