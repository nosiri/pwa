<template>
<div>
	<page-header :title="faProvider">
		<form @submit.prevent="handleSubmit">
			<div class="columns is-mobile is-vcentered">
				<div class="column control">
					<input type="text" v-model="query" class="input" placeholder="جستجو کنید...">
				</div>
				<div class="column is-narrow">
					<button class="button is-primary" :disabled="!query" :class="{'is-loading': loading}" type="submit">جستجو</button>
				</div>
			</div>
		</form>
	</page-header>
	<section class="section">
		<div class="container">
			<h2 class="title">پیشنهاد</h2>
			<div class="columns is-multiline">
				<div class="column is-6-desktop" v-for="i in 70" :key="i">
					<movie :rate="4.5" release-date="۲۰۱۶" duration="۱:۴۲:۰۷">
						فیلم شماره {{ i | faNum }}
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
import PageHeader from "../components/PageHeader.vue";
export default {
	props: {
		provider: {
			type: String,
			required: true
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
	components: { Modal, Movie, PageHeader }
}
</script>
