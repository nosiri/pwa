<template lang="pug">
page-header(full-screen :background-image='cover || image' :blur='!cover' :darken='!!cover' v-if='isSaved || state === 1')
	.columns.is-vcentered.has-text-centered-mobile
		.column.is-5: img(:src='image')
		.column.result
			h1.title {{ title }}
			p.has-text-weight-semibold(v-html='description' style='margin-bottom: 10px')
			p.details
				span(v-if='genres.length') ژانر: 
					b {{ genres.join('، ') }}
				span زمان: 
					b {{ duration | minToDuration | faNum }}
				span محصول 
					b {{ year | faNum }}
				span(v-if='rate && rate >= 0') امتیاز: 
					b {{ rate | faNum }} 
					| از ۱۰
			br
			div
				template(v-if='link')
					btn(v-if='!usesBothProviders' color='link' outlined :href='link') تماشای فیلم
					template(v-else)
						btn(:href='link.namava' outlined color='info') تماشا از نماوا
						btn(:href='link.filimo' outlined color='warning') تماشا از فیلیمو
				btn(color='light' outlined @click.native='!isSaved ? saveToDb() : removeFromDb()')
					| {{ !isSaved ? 'ذخیره' : 'حذف' }}
	div(v-if="serial && serial.length")
		h3.title.is-size-5 قسمت‌های دیگر ({{ serial.length | faNum }})
		carousel
			slide(v-for="({ id: uid, title, image }) in serial" :key="uid")
				movie-box(v-bind="{ uid, title, image }")
	br
	div(v-if="recommended && recommended.length")
		h3.title.is-size-5 پیشنهادی ({{ recommended.length | faNum }})
		carousel
			slide(v-for="({ id: uid, title, image }) in recommended" :key="uid")
				movie-box(v-bind="{ uid, title, image }")
	
	snackbar(v-if='isSaved && state === 2' v-model='error_snack') {{ error | translate }}
page-header(full-screen v-else).is-bold
	empty-state(v-if='state === 2 && !isSaved' vertical icon='error' error)
		h1.title(style='margin-bottom: .35em') خطایی رخ داد!
		p.has-text-grey-dark {{ error | translate }}
	.has-text-centered(v-else)
		spinner(:size='64')
</template>
<script>
import { call } from '../api';
import { open } from '../db';
import { pick } from 'lodash';
import Spinner from '../components/Spinner.vue';
export default {
	props: {
		uid: {
			type: String,
			required: true
		}
	},
	data: () => ({
		state: 0,
		error: null,
		isSaved: false,
		error_snack: true,

		title: '',
		description: '',
		image: '',
		link: '',
		cover: '',
		genres: [],
		duration: 0,
		year: 0,
		serial: null,
		recommended: null,
		rate: -1
	}),
	methods: {
		async init() {
			try {
				const fromDb = await this.loadFromDb();
				if (fromDb) {
					this.isSaved = true
					Object.assign(this.$data, fromDb)
					this.state = 1
				}

				const res = await call(`/cinema/movie/${ this.uid }`, { linkonly: !!fromDb }),
				fetchedId = res.url.match(/\/([^/]+)\?/)?.[1];

				// prevents old requests to be used
				if (fetchedId !== this.uid) return;

				if (res.ok) {
					Object.assign(this.$data, res.data)
					this.state = 1
				} else throw res.error
			} catch (e) {
				this.error = e
				this.state = 2
				console.log(e)
			}
		},
		async db() {
			const db = await open(),
			tx = db.transaction(['movies'], 'readwrite'),
			movies = tx.objectStore('movies');
			return movies
		},
		async loadFromDb() {
			const movies = await this.db();
			return await movies.get(this.uid);
		},
		async saveToDb() {
			const movies = await this.db();
			await movies.add({
				id: this.uid,
				...pick(this.$data, ['title', 'description', 'genres', 'duration', 'year', 'image', 'cover'])
			})
			this.isSaved = true
		},
		async removeFromDb() {
			const movies = await this.db();
			movies.delete(this.uid)
			this.isSaved = false
		}
	},
	computed: {
		usesBothProviders() {
			return this.uid?.split('-').length > 1
		}
	},
	filters: {
		minToDuration: m => {
			const hours = m / 60 >> 0;
			return (hours ? `${hours} ساعت و ` : '') + `${m % 60} دقیقه`
		}
	},
	created() {
		this.init();
	},
	watch: {
		uid() {
			this.$reset()
			this.init()
		}
	},
	components: {
		Spinner,
		Carousel: () => import("../components/Carousel.vue"),
		Slide: () => import("../components/Slide.vue"),
		MovieBox: () => import("../components/MovieBox.vue")
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
	p.details > span {
		display: inline-block;
		&:not(:last-child)::after {
			content: '|';
			margin: 0 0.2em;
			opacity: 0.5;
		}
	}
}
.box {
	background-color: #0003;
	border: 1px solid #fff5
}
</style>