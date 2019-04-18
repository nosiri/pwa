import { get } from "tiny-cookie";

export const API_DOMAIN = "https://nosiri.sh-sh.ir";

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
			),
			{ status } = response;

		let data;
		try {
			data = await response.json();
		} catch {
			data = {};
		}
		const ok = response.ok && data.ok;
		return {
			status,
			data,
			ok,
			error: ok ? null : data.error || status
		};
	} catch ({ message }) {
		console.log(message);
		throw "client-err";
	}
}
