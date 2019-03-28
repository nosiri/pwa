import { get } from "tiny-cookie";

export const API_DOMAIN = "https://nosiri.herokuapp.com";

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
		const response = await fetch(fullUrl, {
				method: usePost ? "POST" : "GET",
				...(usePost
					? {
							headers: {
								Authorization: getToken()
							},
							body: data
					  }
					: {})
			}),
			{ status, statusText, ok } = response;

		let data;
		response
			.json()
			.then(j => {
				data = j;
			})
			.catch(() => {
				data = {};
			});
		return {
			status: [status, statusText],
			ok,
			data
		};
	} catch ({ message }) {
		console.log(message);
		throw "client-error";
	}
}

call("/", {}, false);
