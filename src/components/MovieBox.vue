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
		provider() {
			switch (typeof this.uid) {
				case 'string': 
					return 'filimo'
				case 'number':
					return 'namava'
				default: 
					return 'both'
			}
		},
		to() {
			const { uid } = this
			if (this.provider === 'both') {
				const { filimo, namava } = uid
				return `${filimo}-${namava}`
			} else return String(uid)
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