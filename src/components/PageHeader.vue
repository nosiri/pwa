<template>
	<div class="hero is-light">
		<div class="hero-body">
			<div class="container">
				<h1 class="title">{{ title }}</h1>
				<slot />
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: String
	}
}
</script>
