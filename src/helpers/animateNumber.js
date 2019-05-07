export default (callback, n) => {
	const absN = Math.abs(n),
		step = Math.max((n / 100) >> 0, 1);

	let range = [];
	for (let i = 0; i <= absN; i++) {
		if (i % step === 0) range.push(i);
	}
	if (range[range.length - 1] !== absN) range.push(absN);

	let i = 1;
	const timer = setInterval(() => {
		const current = range[i];
		callback(n < 0 ? -current : current);
		i++;
		if (i === range.length) clearInterval(timer);
	}, 1000 / range.length);
};
