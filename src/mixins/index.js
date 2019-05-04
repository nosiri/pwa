/**
 * Resets component's data on route leave.
 */
export const reset = {
	beforeRouteLeave(_to, _from, next) {
		this.$reset();
		next();
	}
};
