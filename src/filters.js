import Vue from "vue";

/**
 * @param {string|number} string
 * @returns {string}
 */
const faNum = string => {
	if (typeof string === "number") string = string.toString();
	return string
		.replace(/\d/g, n => String.fromCodePoint(n.codePointAt(0) + 1728))
		.replace(/\./g, "/");
};

window.f = faNum;

Vue.filter("faNum", faNum);
