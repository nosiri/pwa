<template lang="pug">
transition(name="snack")
	.snackbar(v-if='active' @click='close')
		slot
</template>
<script>
export default {
	props: {
		active: {
			type: Boolean,
			required: true
		},
		duration: {
			type: Number,
			default: 5
		}
	},
	model: {
		prop: 'active',
		event: 'toggle'
	},
	data: () => ({ timeout: 0 }),
	methods: {
		close() {
			this.$emit("toggle", false)
		}
	},
	mounted() {
		this.$watch('active', b => {
			if (this.duration === 0) return;

			if (b) {
				this.timeout = setTimeout(() => {
					this.close()
				}, this.duration * 1000);
			} else {
				clearTimeout(this.timeout)
			}
		}, {
			immediate: true
		})
	}
}
</script>
<style lang="scss">
@import "../styles/_vars";
@import "~bulma/sass/utilities/mixins";
.snackbar {
	position: fixed;
	z-index: 10;
	bottom: 0;
	left: calc(calc(100vw - 540px) / 2);
	width: 540px;
	@media only screen and (max-width: 540px) {
		left: 0;
		width: 100%;
	}
	padding: 1rem 1.5rem;
	cursor: pointer;
	box-shadow: 0 -6px 32px -4px #0005;
	border-radius: $radius-small $radius-small 0 0;
	color: $white;
	background-color: $grey-darker
}
</style>