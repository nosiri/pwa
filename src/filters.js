import Vue from "vue";
import ERR_CODES from "./errors.json";

/** @param {string|number} string */
const faNum = string => {
	if (typeof string === "number") string = string.toString();
	return string
		.replace(/(\d)?\.(\d)/g, "$1/$2")
		.replace(/\d/g, n => String.fromCodePoint(n.codePointAt(0) + 1728));
};
Vue.filter("faNum", faNum);

/** @param {string} err */
const formatErrorCode = err => faNum(ERR_CODES[err] || `خطای ${err}`);
Vue.filter("errfmt", formatErrorCode);
