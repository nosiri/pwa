<template>
	<div class="spinner" :style="styles" />
</template>
<script>
export default {
	props: {
		size: {
			type: Number,
			default: 50
		},
		color: String
	},
	computed: {
		styles() {
			const { size, color } = this
			return {
				'border-width': size / 15 + 'px',
				'width': size + 'px',
				'height': size + 'px',
				...color ? {
					'border-right-color': color,
					'border-top-color': color
				} : {}
			}
		}
	}
}
</script>
<style lang="scss">
@import "../styles/vars";
@import "~bulma/sass/utilities/mixins";
.spinner {
	@include loader;
	border-color: $primary $primary #0000 #0000;
	display: inline-block;
}
</style>
