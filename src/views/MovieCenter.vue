<template lang="pug">
div
	page-header(title="سینما")
		simple-form(v-model='query' placeholder='نام فیلم' :loading='loading' @submit='handleSubmit')
	main.section: .container: .columns.is-multiline
		.column.is-6-desktop(v-for="i in 20" :key="i")
			box(button small)
				figure.image.is-48x48(slot='avatar')
				b فیلم شماره {{ i | faNum }}
</template>
<script>
import PageHeader from "../components/PageHeader.vue";
import Box from "../components/Box.vue";
import Modal from "../components/Modal.vue";
export default {
	props: {
		uid: String
	},
	data: () => ({
		loading: false,
		results: [],
		query: '',
		provider: 0
	}),
	methods: {
		handleSubmit() {
			if (!this.query) return
			this.results = []
			this.loading = true
			setTimeout(() => {
				this.loading = false
			}, 1000)
		}
	},
	components: {
		PageHeader, Box, Modal
	}
}
</script>
