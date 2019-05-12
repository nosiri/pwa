<template lang="pug">
.columns.is-vcentered.is-centered.is-multiline.empty-state(:class='{ "is-error": error }')
	.column.has-text-centered(:class='{ [`is-${ vertical ? 12 : 4 }`]: true }')
		icon(:name="icon" size='75%')
	.column(:class='{ [`has-text-centered${vertical ? "" : "-mobile"}`]: true }')
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
		error: Boolean,
		vertical: Boolean
	},
	components: { Icon }
}
</script>
<style lang="scss">
@import "~bulma/sass/utilities/mixins";
@import "../styles/vars";
.empty-state {
	svg {
		min-width: 175px;
		max-width: 225px;
	}
	svg > path {
		fill: #2929292a;
	}
	&.is-error {
		svg > path {
			fill: $red
		}
	}
	@include mobile {
		> .column {
			&:first-child {
				padding-bottom: 0;
			}
			&:last-child {
				margin-top: 8px;
				padding-top: 0;
			}
		}
	}
}
</style>
