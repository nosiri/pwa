<template>
	<svg xmlns="http://www.w3.org/2000/svg" role="img" :width="size" viewBox="0 0 24 24">
		<path :d="d" :fill="color"></path>
	</svg>
</template>
<script>
import icons from './icons.json';
export default {
	props: {
		name: {
			type: String,
			required: true
		},
		color: String,
		size: String
	},
	computed: {
		d() {
			return icons[this.name]
		}
	}
}
</script>