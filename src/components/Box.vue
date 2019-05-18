<template>
<component :is='tagName' v-bind="attrs" :class="`is-size-${small ? 5 : 4}`" class="box" @click='handleClick($event)'>
	<div class="columns is-variable is-3 is-vcentered has-text-right" :class="columnClassNames">
		<div class="column is-narrow icon">
			<slot name="avatar">
				<icon v-if='icon' :name="icon" size="2.5em" :color="iconColor" />
			</slot>
		</div>
		<div class="column text" :class="{ 'no-wrap': noWrap }">
			<div class="has-text-weight-bold">
				<slot />
			</div>
			<div class="is-size-6 has-text-grey">
				<slot name="caption"></slot>
			</div>
		</div>
	</div>
</component>
</template>
<script>
export default {
	props: {
		icon: String,
		responsive: Boolean,
		small: Boolean,
		iconColor: String,
		href: String,
		button: Boolean,
		noWrap: Boolean
	},
	computed: {
		columnClassNames() {
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
		handleClick(e) {
			if (this.button) {
				e.preventDefault()
				this.$emit('tap')
			}
		}
	},
	components: {
		Icon: () => import('./Icon/Icon.vue')
	}
}
</script>
<style scoped lang="scss">
@import "~bulma/sass/utilities/mixins";
.icon {
	display: flex;
	align-items: center;
	justify-content: center;
}
.text.no-wrap {
	&, > div {
		overflow: hidden;
		white-space: nowrap;
	}
	> div {
		text-overflow: ellipsis;
	}
}
.text, .icon {
	&:empty {
		display: none;
	}
}
.box {
	padding: 0.825em;
	> .columns:not(.is-mobile) {
		@include mobile {
			.column:first-child {
				padding-bottom: 0;
			}
		}
	}
}
</style>
