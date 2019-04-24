<template lang="pug">
main.section: .container
	.columns.is-mobile.is-vcentered.is-variable.is-2-mobile
		.column
			box(responsive icon="usd" icon-color="#4a8d4a" small href="/currencies")
				b {{ init_usd | faNum }} تومان
		.column
			box(responsive icon="weather-pouring" icon-color="#6c8397" small)
				| تهران: 
				b(dir="ltr") {{ init_temperature | faNum }}&deg;

	.columns.is-vcentered
		.column.is-5
			box(icon="movies" icon-color="#5716da" href="/movies"): b نماوا/فیلیمو
		.column
			box(icon="youtube" icon-color="red" href="/youtube"): b یوتیوب
		.column
			box(icon="soundcloud" icon-color="#ff7500" button @tap="scModal = true")
				b ساندکلود
		soundcloud-modal#sc-modal(v-model="scModal")

	.columns.is-multiline.is-vcentered.is-mobile.is-variable.is-2-mobile
		.column.is-5-desktop.is-12-mobile
			box(icon="telegram" icon-color="#2a89b6" small button @tap="getAProxy")
				b پراکسی تلگرام
		modal#mtp-modal(v-model="proxy_open" title="پراکسی تلگرام" close-button="لغو")
			template(v-if="proxy_loaded")
				p با استفاده از لینک زیر می‌توانید بدون استفاده از فیلترشکن به تلگرام متصل شوید.
				btn(slot='footer' color='primary' :href="proxy_link") اتصال
			p(v-else) لطفا چند لحظه صبر کنید...
		.column
			box(icon="word" icon-color="#c25541" small href='/dictionary' responsive)
				b لغت‌نامه
		.column.is-3-desktop
			box(icon="omen" icon-color="#bd9548" small button responsive): b فال حافظ

	p.is-size-6.has-text-grey-dark(dir="ltr" v-if="init_state === 1")
		| IP: 
		b {{ init_ip }}
		br
		b {{ init_date | faNum }}

	snackbar(v-model="init_err_snack")
		| خطایی رخ داد:  
		b {{ init_err | errfmt }}
</template>
<script>
import { call } from '../api'
import { animateNumber } from '../utils'
import Box from "../components/Box.vue"
export default {
	data: () => ({
		scModal: false,
		init_state: 0,
		init_err: null,
		init_err_snack: false,
		init_ip: '',
		init_date: '',
		init_usd: 0,
		init_temperature: 0,
		proxy_open: false,
		proxy_loaded: false,
		proxy_link: ''
	}),
	async mounted() {
		try {
			const res = await call('/init')
			if (res.ok) {
				const { result } = res.data

				this.init_ip = result.ip
				this.init_date = result.date
				
				animateNumber(i => {
					this.init_usd = i
				}, result.dollar)
	
				// if (result.weather.ok) {
				// 	const w = result.weather.result.weather,
				// 	c = +(w.match(/[-+]?\d+/) || 0);
				// 	animateNumber(i => {
				// 		this.init_temperature = i
				// 	}, c)
				// }
				this.init_state = 1
			} else throw res.error
		} catch (e) {
			console.log(e)
			this.init_state = 2
			this.init_err = e
			this.$nextTick(() => {
				this.init_err_snack = true
			})
		}
	},
	methods: {
		getAProxy() {
			this.proxy_open = true
			if (!this.proxy_loaded) {
				call('/proxy').then(({ data, ok }) => {
					if (ok) {
						const link = data.result.proxy
						this.proxy_loaded = true
						this.proxy_link = link
					}
				})
			}
		}
	},
	beforeRouteEnter(_to, _from, next) {
		next(vm => {
			if (vm.init_err && !vm.init_err_snack) vm.init_err_snack = true
		})	
	},
	components: {
		Box,
		SoundcloudModal: () => import("../components/SoundcloudModal.vue"),
		Modal: () => import("../components/Modal.vue")
	}
}
</script>