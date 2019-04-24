<template>
<component :is='tagName' :to='to' :href='href' class="button" :class="classNames">
	<slot />
</component>
</template>
<script>
export default {
	props: {
		color: String,
		outlined: Boolean,
		loading: Boolean,
		to: String,
		href: String
	},
	computed: {
		classNames() {
			return {
				'is-loading': this.loading,
				'is-outlined': this.outlined,
				...this.color ? { [`is-${this.color}`]: true } : {}
			}
		},
		tagName() {
			return this.href ? 'a' : this.to ? 'router-link' : 'button'
		}
	}
}
</script>

