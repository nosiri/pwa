<template lang="pug">
.columns.is-vcentered.is-center.is-variable.is-1-mobile
	.column.is-4.has-text-centered
		icon(:name="icon" size="200" :color="color")
	.column.has-text-centered-mobile
		p: slot
		br
		slot(name='extra')
</template>
<script>
import Icon from './Icon.vue'
export default {
	props: {
		icon: String,
		color: String
	},
	components: { Icon }
}
</script>
<style scoped lang="scss">
@import "~bulma/sass/utilities/mixins";
@include mobile {
	.column {
		&:first-child {
			padding-bottom: 0;
		}
		&:last-child {
			margin-top: -1rem;
			padding-top: 0;
		}
	}
}
</style>
