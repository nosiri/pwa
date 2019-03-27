<template>
	<a href="#" @click.prevent="$emit('click')">
		<slot></slot>
	</a>
</template>
<script>
export default {}
</script>
