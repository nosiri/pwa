<template>
<div>
	<page-header :title="isFilimo ? 'فیلیمو' : 'نماوا'" has-tabs>
		<form @submit.prevent="handleSubmit">
			<div class="columns is-mobile is-vcentered">
				<div class="column control">
					<input type="text" v-model="query" class="input" placeholder="جستجو کنید..." dir="auto">
				</div>
				<div class="column is-narrow">
					<div class="buttons has-addons">
						<btn color="link" :disabled="!query" :loading='loading' type="submit" tabindex="2">جستجو</btn>
						<btn tabindex="1" outlined color="light" :to="isFilimo ? 'namava' : 'filimo'">
							{{ isFilimo ? 'نماوا' : 'فیلیمو' }}
						</btn>
					</div>
				</div>
			</div>
		</form>
	</page-header>
	<section class="section">
		<div class="container">
			<h2 class="title">پیشنهاد</h2>
			<div class="columns is-multiline">
				<div class="column is-6-desktop" v-for="i in 20" :key="i">
					<a class="box">
						<div class="columns is-mobile is-vcentered">
							<div class="column is-narrow">
								<figure class="image is-64x64"></figure>
							</div>
							<div class="column">
								<div class="title is-size-5">
									فیلم شماره {{ i | faNum }}
								</div>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</section>
</div>
</template>
<script>
import Modal from "../components/Modal.vue";
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
		isFilimo() {
			return this.provider === 'filimo'
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
		}
	},
	components: { Modal, PageHeader }
}
</script>
