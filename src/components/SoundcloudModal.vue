<template>
	<modal :open="open" title="دانلود از ساندکلود" close-button="بستن" @toggle="$emit('toggle', $event)">
		<p>
			لینک آهنگ موردنظر را در فیلد زیر کپی کنید تا در صورت امکان، لینک دانلود آن را برای شما پیدا کنیم.
		</p>
		<br>
		
		<simple-form placeholder="soundcloud.com/" v-model='url' @submit="handleSubmit" :loading='loading' :validator='isValid' show-error />

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
import { call } from '../api';
const URL_REGEX = /^(?:(?:https?:\/\/)?(?:www\.|m\.)?soundcloud\.com)?\/([^/]+)\/([^/]+)$/i
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
	methods: {
		isValid(url) {
			return URL_REGEX.test(url)
		},
		close() {
			this.$emit('toggle', false)
		},
		async handleSubmit() {
			this.loading = true
			const normalizedUrl = 'https://soundcloud.com/' + this.url.replace(URL_REGEX, '$1/$2')
			try {
				const { ok, data, error } = await call('/soundcloud', { link: normalizedUrl })
				if (ok) {
					const { link } = data.result
					this.response = link
					this.error = ''
				} else throw error
			} catch (e) {
				console.log(e);
				this.error = e
				this.response = ''
			} finally {
				this.loading = false
			}
		}
	},
	components: {
		Modal: () => import("./Modal.vue")
	}
}
</script>
