<template lang="pug">
div
	page-header(title="سینما")
		simple-form(v-model='query' placeholder='نام فیلم' :loading='state === 0' @submit='handleSubmit')
	main.section: .container
		.columns.is-multiline(v-if="state === 1")
			.column.is-6-desktop(v-for='(movie, i) in result' :key='i')
				movie-box(:title='movie.title' :image='movie.image' :uid='movie.id')
		empty-state(v-else-if='state === -1' icon='movies')
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
		query: ''
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
	components: {
		Modal: () => import("../components/Modal.vue"),
		MovieBox,
		EmptyState: () => import("../components/EmptyState.vue")
	}
}
</script>