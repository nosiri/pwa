<template lang="pug">
div
	page-header(title="سینما")
		simple-form(v-model='query' placeholder='نام فیلم'
			:loading='state === 0' :autofocus='false'
			@submit='handleSubmit'
			@focuschange='form_focus = $event'
			@clear='handleClear')
	main.section: .container
		transition(name='fade' mode='out-in')
			.columns.is-multiline(v-if="state === 1")
				.column.is-6-desktop.is-4-widescreen(v-for='(movie, i) in result' :key='i')
					movie-box(:title='movie.title' :image='movie.image' :uid='movie.id')

			template(v-else)
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
	snackbar(v-model='error_snack') {{ result | translate }}
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
		error_snack: false,
		query: '',
		suggested: [],
		form_focus: false
	}),
	methods: {
		async handleSubmit() {
			this.state = 0
			this.result = null
			this.error_snack = false
			try {
				const res = await call('/cinema/search', { query: this.query })
				if (res.ok) {
					this.state = 1
					this.result = res.data
				} else throw res.error
			} catch (e) {
				this.state = 2
				this.result = e
				this.error_snack = true
				console.log(e)
			}
		},
		handleClear() {
			if (this.state === -1) {
				this.$reset('suggested', 'form_focus')
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
		Spinner: () => import("../components/Spinner.vue"),
		MovieBox
	}
}
</script>