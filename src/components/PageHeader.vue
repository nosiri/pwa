<template>
	<header class="hero" :class="classNames" :style="styles">
		<div class="hero-body">
			<div class="container">
				<h1 v-if="title" class="title has-text-weight-bold">{{ title }}</h1>
				<slot />
			</div>
		</div>
	</header>
</template>
<script>
export default {
	props: {
		title: String,
		primary: Boolean,
		small: Boolean,
		raised: Boolean,
		backgroundImage: String
	},
	computed: {
		classNames() {
			const isDark = this.primary || this.backgroundImage
			return {
				[`is-${isDark ? 'primary' : 'light'}`]: true,
				"is-small": this.small,
				"is-raised": this.raised
			}
		},
		styles() {
			const bg = this.backgroundImage
			return {
				...bg ? {
					'background-image': `url(${ bg })`
				} : {}
			}
		}
	}
}
</script>
<style scoped>
.hero.is-raised {
	box-shadow: 0 3px 20px -3px #0007
}
</style>
