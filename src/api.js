import { get } from "tiny-cookie";

export const API_DOMAIN = "https://nosiri.sh-sh.ml";

export const getToken = () => get("TOKEN");

/**
 * @param {string} path
 * @param {Object} data
 */
export async function call(path, data = {}) {
	const usePost = path === "/auth"; // POST is only used in auth
	let fullUrl = API_DOMAIN + path;
	if (!usePost) fullUrl += "?" + new URLSearchParams(data);

	try {
		const response = await fetch(
			fullUrl,
			usePost
				? {
						method: "post",
						body: JSON.stringify(data)
				  }
				: {}
		);

		let data;
		try {
			data = await response.json();
		} catch {
			data = {};
		}
		const ok = response.ok && data.ok;
		return {
			status,
			data: ok ? data.result : null,
			ok,
			error: ok ? null : data.error || response.status,
			url: fullUrl
		};
	} catch ({ message }) {
		console.log(message);
		throw "CLIENT_ERROR";
	}
}
