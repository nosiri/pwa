<template lang="pug">
div
	page-header(title='دانلود از ساندکلود')
	main.section: .container
		empty-state(icon='soundcloud')
			p لینک آهنگ موردنظر را در فیلد زیر کپی کنید تا در صورت امکان، لینک دانلود آن را برای شما پیدا کنیم.
			template(slot='extra')
				simple-form(placeholder="soundcloud.com/" v-model='url' @submit="handleSubmit" :loading='state === 0' :validator='isValid' show-error)
				template(v-if="state > 0")
					hr
					p.has-text-danger(v-if="state === 2")
						| خطایی رخ داد: 
						b {{ data | translate }}
					p(v-else-if='state === 1')
						b.has-text-success پیدا شد! 
						| این آهنگ را می‌توانید از طریق 
						a(:href='data') این لینک 
						| دانلود کنید.
</template>
<script>
import { call } from '../api';
import { reset } from '../mixins';
const URL_REGEX = /^(?:(?:https?:\/\/)?(?:www\.|m\.)?soundcloud\.com)?\/([^/]+)\/([^/]+)$/i
export default {
	mixins: [reset],
	data: () => ({
		url: '',
		state: -1,
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
			this.state = 0
			const normalizedUrl = 'https://soundcloud.com/' + this.url.replace(URL_REGEX, '$1/$2')
			try {
				const { ok, data, error } = await call('/soundcloud', { link: normalizedUrl })
				if (ok) {
					const { link } = data
					this.data = link
					this.error = ''
					this.state = 1
				} else throw error
			} catch (e) {
				console.log(e);
				this.data = e
				this.state = 2
			}
		}
	}
}
</script>
