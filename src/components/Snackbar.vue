<template>
	<div class="snackbar" :class="{ 'is-active': active }" @click="close">
		<div @click.self="close">
			<slot></slot>
		</div>
	</div>
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
			default: 5000
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
			if (b) {
				this.timeout = setTimeout(() => {
					this.close()
				}, this.duration);
			} else {
				clearTimeout(this.timeout)
			}
		}, {
			immediate: true
		})
	}
}
</script>
<style lang="scss" scoped>
@import "../styles/_vars";
.snackbar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	pointer-events: none;
	transition: $speed*1.5 $easing;
	z-index: 10;
	transform: translateY(100%);
	opacity: .75;
	> div {
		transition: inherit;
		cursor: pointer;
		width: 100%;
		padding: 1rem 1.5rem;
		background: $grey-darker;
		color: $white;
		max-width: 540px;
		opacity: 0;
		border-radius: $radius-small $radius-small 0 0
	}
	&.is-active {
		transform: translateY(0);
		opacity: 1;
		> div {
			opacity: 1;
			box-shadow: 0 5px 35px -2px #000a;
			pointer-events: auto
		}
	}
}
</style>