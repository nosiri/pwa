<template>
<component :is='tagName' v-bind="attrs" :class="`is-size-${small ? 5 : 4}`" class="box" @click='onClick($event)'>
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
		href: String,
		button: Boolean
	},
	computed: {
		classNames() {
			return {
				"is-mobile": !this.responsive,
				"has-text-centered-mobile": this.responsive
			}
		},
		tagName() {
			return this.button ? 'a' : this.href ? 'router-link' : 'div'
		},
		attrs() {
			return this.button ? {
				href: '#'
			} : this.href ? {
				to: this.href
			} : {}
		}
	},
	methods: {
		/** @param {MouseEvent} e */
		onClick(e) {
			if (this.button) {
				e.preventDefault()
				this.$emit('tap')
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
.box {
	padding: 0.825em;
}
</style>
