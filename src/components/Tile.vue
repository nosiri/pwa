<template lang="pug">
component(:is='href ? "router-link" : "div"' :to='href').box.is-size-4
	.columns.is-vcentered.has-text-right(:class='classNames')
		.column.is-narrow.icon
			icon(:name='icon' size='2.4em' :color='color')
		.column
			slot
</template>
<script>
import Icon from './Icon.vue'
export default {
	props: {
		icon: String,
		responsive: Boolean,
		color: String,
		href: String
	},
	computed: {
		classNames() {
			return {
				"is-mobile": !this.responsive,
				"has-text-centered-mobile": this.responsive
			}
		}
	},
	components: { Icon }
}
</script>
<style scoped>
.icon {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
