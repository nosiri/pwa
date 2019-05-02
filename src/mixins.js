/**
 * Resets component's data whenever on route leave.
 */
export const reset = {
	beforeRouteLeave(_to, _from, next) {
		Object.assign(this.$data, this.$options.data());
		next();
	}
};
