<template lang="pug">
page-header(full-screen :background-image='image' blur)
	.columns.is-vcentered.has-text-centered-mobile
		.column.is-5
			img(:src='image')
		.column
			h1.title {{ title }}
			p(v-html='description')
			br
			btn(color='primary' :href='link' style='margin-left: 10px') تماشای فیلم
			btn(color='white' outlined @click.native='save') ذخیره
</template>
<script>
import { call } from '../api';
import { reset } from '../mixins/';
export default {
	mixins: [reset],
	data: () => ({
		title: '',
		description: '',
		image: '',
		link: ''
	}),
	methods: {
		/** @param {string} uid */
		async init(uid) {
			try {
				const res = await call('/cinema/movie', { id: uid })
				if (res.ok) {
					const { title, description, image, link } = res.data.result;

					this.title = title
					this.description = description
					this.image = image
					this.link = link
				} else throw res.error
			} catch (e) {
				console.log(e)
			}
		}
	},
	created() {
		this.$watch('$route.params.uid', u => {
			if (u) this.init(u)
		}, {
			immediate: true
		})
	}
}
</script>
<style lang="scss" scoped>
@import "../styles/vars";
img {
	border-radius: $radius-large * 2;
	box-shadow: 0 10px 50px -4px #000b;
	width: 70%
}
h1.title {
	text-shadow: 0 2px 5px #0008
}
p {
	text-shadow: 0 2px 10px #0004
}
</style>