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
				div(v-if='!form_focus && (suggested.length || saved.length)')
					template(v-if='suggested.length')
						h2.title پیشنهادی
						.columns.is-multiline
							.column.is-6-desktop.is-4-widescreen(v-for='(movie, i) in suggested' :key='i')
								movie-box(:title='movie.title' :image='movie.image' :uid='movie.id')
					template(v-if='saved.length')
						h2.title ذخیره‌شده
						.columns.is-multiline
							.column.is-6-desktop.is-4-widescreen(v-for='(movie, i) in saved' :key='i')
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
import { open } from '../db';
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
		saved: [],
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
			if (this.state !== -1) {
				this.$reset('suggested', 'form_focus', 'saved')
			}
		}
	},
	async mounted() {
		const db = await open(),
		tx = db.transaction(['movies']),
		movies = tx.objectStore('movies');
		let cursor = await movies.openCursor();

		while (cursor) {
			this.saved.push({
				id: cursor.key,
				...cursor.value
			})
			cursor = await cursor.continue()
		}

		const res = await call('/cinema')
		if (res.ok) {
			this.suggested = res.data
		}
	},
	components: {
		Modal: () => import("../components/Modal.vue"),
		Spinner: () => import("../components/Spinner.vue"),
		MovieBox
	}
}
</script>