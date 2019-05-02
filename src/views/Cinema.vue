<template lang="pug">
div
	page-header(title="سینما")
		simple-form(v-model='query' placeholder='نام فیلم' :loading='loading' @submit='handleSubmit')
	main.section: .container: .columns.is-multiline
		.column.is-6-desktop(v-for='(movie, i) in results' :key='i')
			movie-box(:title='movie.title' :image='movie.image' :uid='movie.id')
</template>
<script>
import { call } from '../api'
export default {
	props: {
		uid: String
	},
	data: () => ({
		loading: false,
		results: [],
		query: ''
	}),
	methods: {
		async handleSubmit() {
			this.results = []
			this.loading = true
			try {
				const res = await call('/cinema/search', { query: this.query })
				if (res.ok) {
					this.results = res.data.result
					console.log(res.data)
				} else throw res.error
			} catch (e) {
				console.log(e)
			} finally {
				this.loading = false
			}
		}
	},
	components: {
		Modal: () => import("../components/Modal.vue"),
		MovieBox: () => import("../components/MovieBox.vue")
	}
}
</script>