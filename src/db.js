import { openDB } from "idb";

export const open = async () =>
	await openDB("app", 1, {
		upgrade(db) {
			db.createObjectStore("movies", { keyPath: "id" });
		}
	});
