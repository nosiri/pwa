<template>
	<header class="hero" :class="`is-${primary ? 'primary' : 'light'}`">
		<div class="hero-body">
			<div class="container">
				<h1 class="title has-text-weight-bold">{{ title }}</h1>
				<slot />
			</div>
		</div>
	</header>
</template>
<script>
export default {
	props: {
		title: String,
		primary: Boolean
	}
}
</script>
