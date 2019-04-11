<template>
	<section class="hero" :class="`is-${primary ? 'primary' : 'light'}`">
		<div class="hero-body">
			<div class="container">
				<h1 class="title has-text-weight-bold">{{ title }}</h1>
				<slot />
			</div>
		</div>
	</section>
</template>
<script>
export default {
	props: {
		title: String,
		primary: Boolean
	}
}
</script>
