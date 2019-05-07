/** @param {Element} el */
export const isInput = ({ tagName }) => tagName.toLowerCase() === "input";

export const openModalExists = () =>
	!!document.querySelector(".modal.is-active");

/**
 * Checks if string must be displayed in RTL direction or not.
 * @param {string} str
 */
export const isRtlString = str =>
	/^[\s\d([!@#$%^&*;:'"`~/+-.]*[۰-۹ا-ی]/.test(str);
