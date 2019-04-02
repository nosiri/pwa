<template>
<component :is='to ? "router-link" : "button"' :to='to' class="button" :class="classNames">
	<slot />
</component>
</template>
<script>
export default {
	props: {
		color: {
			type: String,
			default: 'dark'
		},
		outlined: Boolean,
		loading: Boolean,
		to: String
	},
	computed: {
		classNames() {
			return {
				'is-loading': this.loading,
				'is-outlined': this.outlined,
				[`is-${this.color}`]: true
			}
		}
	}
}
</script>

