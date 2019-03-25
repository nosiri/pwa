<template>
<div>
	<div class="hero is-small is-light">
		<div class="hero-body">
			<div class="container">
				<h1 class="title">{{ faProvider }}</h1>
				<form @submit.prevent="handleSubmit">
					<div class="columns is-mobile is-vcentered">
						<div class="column">
							<div class="control">
								<input type="text" v-model="query" class="input" autofocus placeholder="جستجو کنید...">
							</div>
						</div>
						<div class="column is-narrow">
							<button class="button is-primary" :disabled="!query" :class="{'is-loading': loading}" type="submit">جستجو</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<section class="section">
		<div class="container">
			<div class="title">پیشنهاد</div>
			<div class="columns is-multiline">
				<div class="column is-6-desktop" v-for="i in 10" :key="i">
					<movie rate="۴/۵" release-date="۲۰۱۶" duration="۱:۴۲:۰۷" @click="query = 'hi'">
						فیلم شماره {{ i }}
					</movie>
				</div>
			</div>
		</div>
	</section>
</div>
</template>
<script>
import Modal from "../components/Modal.vue";
import Movie from "../components/Movie.vue";
export default {
	props: {
		provider: {
			type: String,
			required: true,
			// validator: p => p === 'filimo' || p === 'namava'
		},
		id: String
	},
	data: () => ({
		loading: false,
		/** @type {Array<{ id: number, title: string }>} */
		results: [],
		query: '',
	}),
	computed: {
		faProvider() {
			return this.provider === 'filimo' ? 'فیلیمو' : 'نماوا'
		}
	},
	methods: {
		handleSubmit() {
			if (!this.query) return
			this.results = []
			this.loading = true
			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		getLink(id) {

		}
	},
	components: { Modal, Movie }
}
</script>
