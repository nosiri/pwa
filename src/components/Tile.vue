<template>
<component :is='href ? "router-link" : "div"' :to='href' :class="`is-size-${small ? 5 : 4}`" class="box">
	<div class="columns is-vcentered has-text-right" :class="classNames">
		<div class="column is-narrow icon">
			<icon :name="icon" size="2.75em" :color="color" />
		</div>
		<div class="column text">
			<slot />
		</div>
	</div>
</component>
</template>
<script>
import Icon from './Icon.vue'
export default {
	props: {
		icon: String,
		responsive: Boolean,
		small: Boolean,
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
.text:empty {
	display: none;
}
</style>
