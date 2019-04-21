<template>
	<header class="hero" :class="classNames">
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
		small: Boolean
	},
	computed: {
		classNames() {
			return {
				[`is-${this.primary ? 'primary' : 'light'}`]: true,
				"is-small": this.small
			}
		}
	}
}
</script>
