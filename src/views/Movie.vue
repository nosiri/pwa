<template lang="pug">
page-header(full-screen :background-image='cover || image' :blur='!cover' :darken='!!cover' v-if='state === 1')
	.columns.is-vcentered.has-text-centered-mobile
		.column.is-5
			img(:src='image')
		.column.result
			h1.title {{ title }}
			p.has-text-weight-semibold(v-html='description' style='margin-bottom: 10px')
			p
				.details ژانر: 
					b(v-for='(g, i) in genres' :key='i')
						| {{ g }}
						template(v-if='genres.length - i > 1') ، 
				.details زمان: 
					b {{ duration | minToDuration | faNum }}
				.details محصول {{ year | faNum }}
			br
			template(v-if='!usesBothProviders')
				btn(color='link' outlined :href='link' style='margin-left: 10px') تماشای فیلم
				btn(color='light' outlined @click.native='save') ذخیره
page-header(full-screen v-else).is-bold
	empty-state(v-if='state === 2' vertical icon='error' error)
		h1.title(style='margin-bottom: .35em') خطایی رخ داد!
		p.has-text-grey-dark {{ error | errfmt }}
	.has-text-centered(v-else)
		spinner(:size='64')
</template>
<script>
import { call } from '../api';
import { reset } from '../mixins/';
import { pick } from 'lodash';
import Spinner from '../components/Spinner.vue';
export default {
	mixins: [reset],
	data: () => ({
		state: 0,
		error: null,
		title: '',
		description: '',
		image: '',
		link: '',
		cover: '',
		genres: [],
		duration: 0,
		year: 0
	}),
	methods: {
		/** @param {string} uid */
		async init(uid) {
			this.state = 0
			try {
				const res = await call(`/cinema/movie/${ uid }`)
				const [, fetchedId] = res.url.match(/\/([^/]+)\?/)
				if (fetchedId !== this.uid) return;
				if (res.ok) {
					const data = pick(res.data, [
						'title', 'description', 'image', 'link',
						'cover', 'genres', 'duration', 'year'])
					Object.assign(this, data)
					this.state = 1
				} else throw res.error
			} catch (e) {
				this.error = e
				this.state = 2
				console.log(e)
			}
		}
	},
	computed: {
		uid() {
			return this.$route.params.uid
		},
		usesBothProviders() {
			return this.uid?.split('-').length > 1
		}
	},
	filters: {
		minToDuration: m => {
			const hours = m / 60 >> 0,
			minutes = m % 60;
			return (hours ? `${hours} ساعت و ` : '') + `${minutes} دقیقه`
		}
	},
	created() {
		this.$watch('$route.params.uid', u => {
			if (u) this.init(u)
		}, {
			immediate: true
		})
	},
	components: {
		Spinner,
		EmptyState: () => import('../components/EmptyState.vue')
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
.result {
	h1.title {
		text-shadow: 0 2px 5px #0008
	}
	p {
		text-shadow: 0 2px 10px #0004
	}
	.details {
		display: inline-block;
		&:not(:last-of-type)::after {
			content: '|';
			margin: 0 .2em;
			opacity: 0.5;
		}
	}
}
</style>