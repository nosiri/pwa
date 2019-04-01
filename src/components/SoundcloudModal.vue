<template>
	<modal :open="open" title="دانلود از ساندکلود" close-button="بستن" @toggle="$emit('toggle', $event)">
		<p>
			لینک آهنگ موردنظر را در فیلد زیر کپی کنید تا در صورت امکان، لینک دانلود آن را برای شما پیدا کنیم.
		</p>
		<br>

		<form class="columns is-mobile is-vcentered" @submit.prevent="handleSubmit">
			<div class="column control">
				<input v-model="url" dir="ltr" class="input" placeholder="https://soundcloud.com/...">
			</div>
			<div class="column is-narrow">
				<button :disabled='!isValid' class="button is-link" :class="{'is-loading': loading}">جستجو</button>
			</div>
		</form>

		<p>
			<template v-if="error">
				<span class="has-text-danger">خطایی رخ داد:</span>
				<b> {{ error | errfmt }}</b>
			</template>
			<b v-if="response" class="has-text-success">
				لینک دانلود پیدا شد!
			</b>
		</p>
		
		<a slot="footer" :href='response' v-if='response' target="_blank" class="button is-primary">
			دانلود
		</a>
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
