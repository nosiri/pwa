export default class Point {
	/**
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	/** @param {Point} point */
	distanceFrom(point) {
		const a = point.x - this.x;
		const b = point.y - this.y;
		return Math.sqrt(a ** 2 + b ** 2);
	}
	/** @param {Point} point */
	slopeFrom(point) {
		return (this.y - point.y) / (this.x - point.x);
	}
}
