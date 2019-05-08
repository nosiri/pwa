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

Vue.filter("errfmt", err => faNum(ERR_CODES[err] || `خطای ${err}`));

Vue.filter("comma", s => s.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
