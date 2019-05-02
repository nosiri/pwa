import { openDB } from "idb";

export default async () =>
	await openDB("app", 1, {
		upgrade(db) {
			db.createObjectStore("movies", { keyPath: "id" });
		}
	});
