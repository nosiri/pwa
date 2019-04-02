<template>
	<modal :open="open" title="دانلود از ساندکلود" close-button="بستن" @toggle="$emit('toggle', $event)">
		<p>
			لینک آهنگ موردنظر را در فیلد زیر کپی کنید تا در صورت امکان، لینک دانلود آن را برای شما پیدا کنیم.
		</p>
		<br>

		<form class="columns is-mobile is-vcentered" @submit.stop.prevent="handleSubmit">
			<div class="column control">
				<input v-model="url" dir="ltr" class="input" placeholder="soundcloud.com/">
			</div>
			<div class="column is-narrow">
				<btn :disabled='!isValid' color="link" :loading='loading'>جستجو</btn>
			</div>
		</form>

		<template v-if="!loading">
			<p class="has-text-danger" v-if="error">
				خطایی رخ داد:
				<b> {{ error | errfmt }}</b>
			</p>
			<p v-else-if="response" class="has-text-success has-text-weight-bold">
				لینک دانلود پیدا شد!
			</p>

			<a slot="footer" :href='response' v-if='response' target="_blank" class="button is-primary">
				دانلود
			</a>
		</template>		
	</modal>
</template>
<script>
import Modal from './Modal.vue'
import { call } from '../api';
export default {
	props: {
		open: Boolean
	},
	model: {
		prop: 'open',
		event: 'toggle'
	},
	data: () => ({
		url: '',
		loading: false,
		error: '',
		response: ''
	}),
	computed: {
		isValid() {
			return /^(https?:\/\/)?((www|m)\.)?soundcloud\.com\/.+/i.test(this.url) // *shrug*
		}
	},
	methods: {
		close() {
			this.$emit('toggle', false)
		},
		async handleSubmit() {
			if (!this.isValid || this.loading) return;
			
			let { url } = this;
			if (!url.startsWith('http')) url = `https://${url}`
			this.loading = true
			try {
				const { ok, data, status } = await call('/soundcloud', { link: url })
				if (ok) {
					const { link } = data.result
					this.response = link
					this.error = ''
				} else throw status
			} catch (e) {
				console.log(e);
				this.error = e
				this.response = ''
			} finally {
				this.loading = false
			}
		}
	},
	components: { Modal }
}
</script>
