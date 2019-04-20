<template>
<transition name="snackbar-transition">
	<div class="snackbar is-active" @click="close" v-if="active">
		<div @click.self="close">
			<slot></slot>
		</div>
	</div>
</transition>
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
	z-index: 10;
	> div {
		transition: inherit;
		cursor: pointer;
		width: 100%;
		padding: 1rem 1.5rem;
		background: $grey-darker;
		color: $white;
		max-width: 540px;
		border-radius: $radius-small $radius-small 0 0;
		box-shadow: 0 5px 35px -2px #000a;
		pointer-events: auto
	}
}
</style>