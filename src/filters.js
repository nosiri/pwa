import Vue from "vue";
import ERR_CODES from "./errors.json";

/** @param {string|number} string */
const faNum = string => {
	if (typeof string === "number") string = string.toString();
	return string
		.replace(/\d/g, n => String.fromCodePoint(n.codePointAt(0) + 1728))
		.replace(/\./g, "/");
};
Vue.filter("faNum", faNum);

/** @param {string} err */
const formatErrorCode = err => ERR_CODES[err];
Vue.filter("errfmt", formatErrorCode);
