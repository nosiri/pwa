<template lang="pug">
.columns.is-vcentered.is-center
	.column.is-4.has-text-centered
		icon(:name="icon" size='75%' :color="color")
	.column.has-text-centered-mobile
		.is-size-5-desktop
			slot
		br
		slot(name='extra')
</template>
<script>
import Icon from './Icon.vue'
export default {
	props: {
		icon: String,
		color: {
			type: String,
			default: '#2929292a'
		}
	},
	components: { Icon }
}
</script>
<style scoped lang="scss">
@import "~bulma/sass/utilities/mixins";
svg {
	// width: 75%;
	min-width: 175px;
	max-width: 225px;
}
@include mobile {
	.column {
		&:first-child {
			padding-bottom: 0;
		}
		&:last-child {
			margin-top: 8px;
			padding-top: 0;
		}
	}
}
</style>
