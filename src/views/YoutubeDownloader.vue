<template lang="pug">
div
	page-header(title="دانلود از یوتیوب")
		simple-form(placeholder='https://youtube.com' :loading='state === 0' button-text='دریافت' :validator='isValidUrl' v-model="link" @submit="handleSubmit" show-error)
	main.section: .container
		transition(name="fade" mode="out-in")
			.columns(v-if="state === 1 && data")
				.column.is-7
					video(:src="data.link" controls)
				.column
					template(v-if="data.title.trim()")
						h2.title(dir="auto") {{ data.title }}
						hr
					.has-text-centered
						.btn(@click.native="$reset") جستجوی دوباره

			empty-state(icon='youtube' v-else)
				p
					| اگه می‌خواید فیلمی رو از یوتیوب دانلود کنید، 
					b لینک اون رو همینجا کپی کنید 
					| تا اون رو تماشا یا دانلود کنید.
	snackbar(v-model="error_snack" :duration="3") {{ data | errfmt }}
</div>
</template>
<script>
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
		async handleSubmit() {
			this.state = 0
			this.error_snack = false
			try {
				const res = await call('/youtube', { link: this.link })
				if (res.ok) {
					this.state = 1
					this.data = res.data
				} else throw res.error
			} catch (e) {
				this.state = 2
				this.data = e
				this.error_snack = true
			}
		},
		isValidUrl: url => /^https?:\/\/((www|m)\.)?(youtube\.com|youtu\.be)\/.+/i.test(url)
	},
	components: {
		EmptyState: () => import("../components/EmptyState.vue")
	}
}
</script>
<style scoped>
video {
	width: 100%;
	box-shadow: 0 10px 35px -2px #0004
}
</style>
