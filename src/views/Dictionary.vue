<template>
<div>
	<page-header small>
		<form class="columns is-mobile is-variable is-2-mobile is-vcentered" @submit.prevent.stop="handleSubmit">
			<div class="column control">
				<input type="text" class="input" placeholder="یک کلمه" v-model='query' required>
			</div>
			<div class="column is-narrow">
				<btn :disabled="!query" :loading="state === 0" type="submit" color="primary">جستجو</btn>
			</div>
		</form>
	</page-header>
	<main class="section">
		<div class="container">
			<div class="columns is-centered" v-if="state === 1">
				<div class="column is-full-mobile is-8-tablet is-6-desktop">
					<h1 class="title">{{ word }}</h1>
					<div class="subtitle">{{ type }}</div>
					<hr>
					<p>
						{{ text }}
						<br>
						<b class="is-size-7">
							منبع: {{ database }}
						</b>
					</p>
				</div>
			</div>
		</div>
	</main>
</div>
</template>
<script>
import PageHeader from "../components/PageHeader.vue";
import { call } from '../api';
export default {
	data: () => ({
		query: "",
		state: -1,
		error: null,
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
				} else throw error
			} catch (e) {
				this.state = 2
				this.error = e
			}
		}
	},
	beforeRouteEnter(_to, _from, next) {
		next(vm => {
			if (vm.word) vm.query = vm.word
		})
	},
	components: { PageHeader }
}
</script>
