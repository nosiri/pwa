/** @param {Element} el */
export const isInput = ({ tagName }) => tagName.toLowerCase() === "input";

export const openModalExists = () =>
	!!document.querySelector(".modal.is-active");

/**
 * Checks if string must be displayed in RTL direction or not.
 * @param {string} str
 */
export const isRtlString = str => {
	for (let i = 0, { length } = str; i < length; i++) {
		if (str.charCodeAt(i) >= 1570) return true;
		else if (/^[a-z]$/i.test(str[i])) return false;
		else continue;
	}
	return false;
};

export function getCurrentPosition() {
	return new Promise((r, j) => {
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				r({
					long: coords.longitude.toFixed(6),
					lat: coords.latitude.toFixed(6)
				});
			},
			j,
			{
				enableHighAccuracy: true
			}
		);
	});
}

export const wait = dur => new Promise(r => setTimeout(r, dur));
