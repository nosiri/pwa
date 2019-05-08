<template lang="pug">
div
	page-header.is-hidden-tablet(primary small title='صفحه اصلی' raised)
	main.section: .container
		.columns.is-mobile.is-vcentered.is-variable.is-2-mobile
			.column
				box(responsive icon="usd" icon-color="#4a8d4a" small button @tap='fetchCurrencies')
					b {{ init_usd | faNum }} تومان
			modal#cur-modal(v-model='cur_open' title='قیمت واحدهای ارزی' close-button='باشه')
				div(v-if='cur_loaded')
					div(v-for='(price, unit) in cur_data' :key='unit')
						span {{ unit | cur_name }}: 
						b {{ price.toString() | comma | faNum }} تومان
				p(v-else) لطفا چند لحظه صبر کنید...
			.column
				box(responsive icon="weather-pouring" icon-color="#6c8397" small)
					| تهران: 
					b(dir="ltr") {{ init_temperature | faNum }}&deg;

		.columns.is-vcentered
			.column.is-5
				box(icon="movies" icon-color="#5716da" href="/cinema"): b سینما
			.column
				box(icon="youtube" icon-color="red" href="/youtube"): b یوتیوب
			.column
				box(icon="soundcloud" icon-color="#ff7500" href='/soundcloud'): b ساندکلود

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
import animateNumber from '../helpers/animateNumber'
import Box from "../components/Box.vue"
import { omit } from 'lodash'
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
		proxy_link: '',
		cur_open: false,
		cur_loaded: false,
		cur_data: null
	}),
	async mounted() {
		try {
			const res = await call('/init')
			if (res.ok) {
				const { ip, date, dollar } = res.data

				this.init_ip = ip
				this.init_date = date
				
				animateNumber(i => {
					this.init_usd = i
				}, dollar)
	
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
		async getAProxy() {
			this.proxy_open = true
			if (this.proxy_loaded) return;
			const { data, ok } = await call('/proxy')
			if (ok) {
				const link = data.proxy
				this.proxy_loaded = true
				this.proxy_link = link
			}
		},
		async fetchCurrencies() {
			this.cur_open = true
			if (this.cur_loaded) return;
			const { ok, data, error } = await call('/currency');
			this.cur_loaded = true
			if (ok) {
				this.cur_data = omit(data, ['last_update'])
			} else throw error
		}
	},
	filters: {
		cur_name: eng => ({
			dollar: 'دلار',
			euro: 'یورو',
			bitcoin: 'بیت‌کوین',
			gold: 'طلا',
			emami_coin: 'سکه امامی'
		})[eng]
	},
	beforeRouteEnter(_to, _from, next) {
		next(vm => {
			if (vm.init_err && !vm.init_err_snack) vm.init_err_snack = true
		})	
	},
	components: {
		Box,
		Modal: () => import("../components/Modal.vue"),
	}
}
</script>