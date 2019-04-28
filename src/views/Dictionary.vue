<template>
<div>
	<page-header small>
		<simple-form v-model='query' placeholder="یک کلمه" @submit='handleSubmit' :loading="state === 0" />
	</page-header>
	<main class="section">
		<div class="container">
			<div class="columns is-centered" v-if="state === 1">
				<word-details :word='word' :type='type' :text='text' :database='database' has-save-button />
			</div>
		</div>
	</main>
	<snackbar v-model="error_snack">
		خطایی رخ داد: <b>{{ error | errfmt }}</b>
	</snackbar>
</div>
</template>
<script>
import { call } from '../api';
export default {
	data: () => ({
		query: "",
		state: -1,
		error: null,
		error_snack: false,
		word: null,
		text: null,
		type: null,
		database: null
	}),
	methods: {
		async handleSubmit() {
			this.state = 0
			try {
				const { ok, error, data } = await call('/dictionary', { query: this.query });
				if (ok) {
					const { text, type, database } = data.result
					this.text = text
					this.type = type
					this.database = database
					this.word = this.query
					this.state = 1
					this.error_snack = false
				} else throw error
			} catch (e) {
				this.state = 2
				this.error = e
				this.error_snack = true
			}
		}
	},
	beforeRouteEnter(_to, _from, next) {
		next(vm => {
			if (vm.word) vm.query = vm.word
		})
	},
	components: {
		WordDetails: () => import("../components/WordDetails.vue")
	}
}
</script>
