<template lang="pug">
box(small no-wrap :title='title' :href='"/cinema/" + to')
	figure.image.is-3by4.is-64x64(slot='avatar')
		img(:src='image')
	b {{ title }}
</template>
<script>
import Box from './Box.vue'
export default {
	props: {
		image: String,
		title: String,
		uid: [Number, String, Object]
	},
	computed: {
		to() {
			const { uid } = this
			switch (typeof uid) {
				case 'string':
					return `f-${uid}`
				case 'number':
					return `n-${uid}`
				default: 
					const { filimo, namava } = uid
					return `${filimo}-${namava}`
			}
		}
	},
	components: { Box }
}
</script>
<style scoped lang="scss">
@import "../styles/vars";
img {
	border-radius: $radius;
}
</style>