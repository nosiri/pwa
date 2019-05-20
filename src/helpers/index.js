import { getCookie } from "tiny-cookie";

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

/** @returns {Promise<{ long: number, lat: number }>} */
export function getCurrentPosition(allowCookie = false) {
	return new Promise((r, j) => {
		if (allowCookie) {
			const [lat, long] = getCookie("position")
				.split(",")
				.map(e => +e);
			r({ lat, long });
		} else {
			navigator.geolocation.getCurrentPosition(
				({ coords: { longitude, latitude } }) => {
					r({
						long: longitude.toFixed(6),
						lat: latitude.toFixed(6)
					});
				},
				j,
				{
					enableHighAccuracy: true
				}
			);
		}
	});
}
