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
				<div class="columns">
					<div class="column is-half-tablet is-4-desktop is-3-fullhd" v-for="movie in results" :key="movie.id">
						<router-link class="box" :to="movie.id.toString()">
							<div class="is-size-5">{{ movie.title }}</div>
						</router-link>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
export default {
	props: {
		provider: {
			type: String,
			required: true,
			validator: p => p === 'filimo' || p === 'namava'
		}
	},
	data: () => ({
		loading: false,
		/** @type {Array<{ id: number, title: string }>} */
		results: [],
		query: ''
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
				this.results = [{
					id: 15326,
					title: 'کارآگاه حقیقی'
				}, {
					id: 12485,
					title: 'میان ستاره‌ای'
				}]
			}, 1000)
		}
	}
}
</script>
