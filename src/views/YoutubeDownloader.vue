<template>
<div>
	<page-header title="دانلود از یوتیوب">
		<simple-form placeholder='https://youtube.com' :loading='state === 0' button-text='دریافت' :validator='isValidUrl' v-model="link" @submit="handleSubmit" show-error />					
	</page-header>
	<main class="section">
		<div class="container">
			<transition name="fade" mode="out-in">
				<div key="a" class="columns" v-if="state === 1 && data">
					<div class="column is-7">
						<video :src="data.link" controls />
					</div>
					<div class="column">
						<template v-if="data.title.trim()">
							<h2 class="title" dir="auto">{{ data.title }}</h2>
							<hr>
						</template>
						<div class="has-text-centered">
							<btn @click.native="reset">جستجوی دوباره</btn>
						</div>
					</div>
				</div>

				<empty-state icon='youtube' v-else>
					<p>
						اگه می‌خواید فیلمی رو از یوتیوب دانلود کنید،
						<b>لینک اون رو همینجا کپی کنید</b>
						تا اون رو تماشا یا دانلود کنید.
					</p>
					<!-- <simple-form slot="extra" placeholder='https://youtube.com' :loading='state === 0' button-text='دریافت' :validator='isValidUrl' v-model="link" @submit="handleSubmit" show-error />					 -->
				</empty-state>
			</transition>
		</div>
	</main>
	<snackbar v-model="error_snack" :duration="3">{{ data | errfmt }}</snackbar>
</div>
</template>
<script>
// import Icon from '../components/Icon.vue'
import EmptyState from '../components/EmptyState.vue'
import { call } from '../api';
// test case: https://www.youtube.com/watch?v=6SZ_wVEk2Z4
export default {
	data: () => ({
		link: '',
		state: null,
		data: null,
		error_snack: false
	}),
	methods: {
		reset() {
			this.state = null
			this.data = null
			this.link = ''
		},
		async handleSubmit() {
			this.state = 0
			this.error_snack = false
			try {
				const res = await call('/youtube', { link: this.link })
				if (res.ok) {
					this.state = 1
					this.data = res.data.result
				} else throw res.error
			} catch (e) {
				this.state = 2
				this.data = e
				this.error_snack = true
			}
		},
		isValidUrl: url => /^https?:\/\//i.test(url)
	},
	components: { EmptyState }
}
</script>
<style scoped>
video {
	width: 100%;
	box-shadow: 0 10px 35px -2px #0004
}
</style>
