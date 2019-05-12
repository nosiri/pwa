<template lang="pug">
div
	page-header(title="سینما")
		simple-form(v-model='query' placeholder='نام فیلم'
			:loading='state === 0' @submit='handleSubmit'
			@focuschange='form_focus = $event')
	main.section: .container
		.columns.is-multiline(v-if="state === 1")
			.column.is-6-desktop.is-4-widescreen(v-for='(movie, i) in result' :key='i')
				movie-box(:title='movie.title' :image='movie.image' :uid='movie.id')
		transition(v-else-if='state === -1' name='fade' mode='out-in')
			div(v-if='!form_focus && suggested.length') 
				h2.title پیشنهادی
				.columns.is-multiline
					.column.is-6-desktop.is-4-widescreen(v-for='(movie, i) in suggested' :key='i')
						movie-box(:title='movie.title' :image='movie.image' :uid='movie.id')
			empty-state(icon='cinema' v-else)
				p
					| نام فیلم مورد نظر خود را وارد کنید و آن را از سرویس‌های داخلی 
					b نماوا 
					| و 
					b فیلیمو 
					| تماشا کنید!
</template>
<script>
import { call } from '../api'
import MovieBox from "../components/MovieBox.vue"
export default {
	props: {
		uid: String
	},
	data: () => ({
		state: -1,
		result: null,
		query: '',
		suggested: [],
		form_focus: false
	}),
	methods: {
		async handleSubmit() {
			this.state = 0
			this.result = null
			try {
				const res = await call('/cinema/search', { query: this.query })
				if (res.ok) {
					this.state = 1
					this.result = res.data
				} else throw res.error
			} catch (e) {
				this.state = 2
				this.result = e
				console.log(e)
			}
		}
	},
	mounted() {
		call('/cinema').then(res => {
			if (res.ok) {
				this.suggested = res.data
			} else throw res.error
		}).catch(console.log)
	},
	components: {
		Modal: () => import("../components/Modal.vue"),
		MovieBox
	}
}
</script>