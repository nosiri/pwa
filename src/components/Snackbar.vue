<template>
	<div class="snackbar" :class="{ 'is-active': active }" @click="close">
		<div>
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
	watch: {
		active(b) {
			if (b) {
				this.timeout = setTimeout(() => {
					this.close()
				}, this.duration);
			} else clearTimeout(this.timeout)
		}
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
	transition: transform $speed $easing;
	z-index: 10;
	transform: translateY(100%);
	> div {
		cursor: pointer;
		width: 100%;
		padding: 1rem 1.5rem;
		background: $grey-darker;
		box-shadow: 0 -5px 20px -2px #0008;
		max-width: 720px;
	}
	&.is-active {
		transform: translateY(0);
		> div {
			pointer-events: auto
		}
	}
}
</style>