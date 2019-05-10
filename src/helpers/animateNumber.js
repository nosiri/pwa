function* range(n) {
	const step = Math.max((n / 100) >> 0, 1);
	for (let i = 0; i <= Math.abs(n); i += step) {
		if (i === 0) continue;
		yield n < 0 ? -i : i;
	}
	if (n % step) yield n;
}

export default (callback, to) => {
	const r = [...range(to)];
	let i = 0;
	const timer = setInterval(() => {
		callback(r[i]);
		i++;
		if (i === r.length) clearInterval(timer);
	}, 1000 / r.length);
};
