<template lang="pug">
page-header(full-screen :background-image='image' blur)
	.columns.is-vcentered.has-text-centered-mobile
		.column.is-5
			img(:src='image' style='width: 80%')
		.column
			h1.title {{ title }}
			p(v-html='description')
</template>
<script>
import { call } from '../api';
import { reset } from '../mixins';
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
					const { title, description, image } = res.data.result
					this.title = title
					this.description = description
					this.image = image
				} else throw res.error
			} catch {}
		}
	},
	watch: {
		'$route.params.uid'(u) {
			this.init(u)
		}
	},
	beforeRouteEnter(_to, _from, next) {
		next(vm => vm.init(_to.params.uid))
	}
}
</script>
<style lang="scss" scoped>
@import "../styles/vars";
img {
	border-radius: $radius-large * 2;
	box-shadow: 0 10px 50px -4px #000b
}
h1.title {
	text-shadow: 0 2px 5px #0008
}
p {
	text-shadow: 0 2px 10px #0004
}
</style>