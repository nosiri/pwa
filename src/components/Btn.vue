<template>
<component :is='to ? "router-link" : "button"' :to='to' class="button" :class="classNames">
	<slot />
</component>
</template>
<script>
export default {
	props: {
		color: String,
		outlined: Boolean,
		loading: Boolean,
		to: String
	},
	computed: {
		classNames() {
			return {
				'is-loading': this.loading,
				'is-outlined': this.outlined,
				...this.color ? { [`is-${this.color}`]: true } : {}
			}
		}
	}
}
</script>

