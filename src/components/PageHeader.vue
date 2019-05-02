<template>
	<header class="hero" :class="classNames">
		<div class="bg" v-if='backgroundImage' :style="{ 'background-image': `url(${ backgroundImage })` }" :class="{ 'is-blurry': blur}" />
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
		backgroundImage: String,
		fullScreen: Boolean,
		blur: Boolean
	},
	computed: {
		classNames() {
			const isDark = this.primary || this.backgroundImage
			return {
				[`is-${isDark ? 'primary' : 'light'}`]: true,
				"is-small": this.small,
				"is-raised": this.raised,
				"is-fullheight": this.fullScreen
			}
		}
	}
}
</script>
<style scoped lang="scss">
.hero {
	position: relative;
	overflow: hidden;
	&.is-raised {
		box-shadow: 0 3px 20px -3px #0007
	}
	> .bg {
		$blur: 17px;
		&.is-blurry {
			filter: blur($blur) brightness(.4) saturate(1.5);
		}
		position: absolute;
		top: -$blur * 2;
		left: -$blur * 2;
		right: -$blur * 2;
		bottom: -$blur * 2;
		background-size: cover;
		background-position: center;
		z-index: 1;
	}
	> .hero-body {
		z-index: 2;
	}
}
</style>
