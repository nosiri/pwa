<template lang="pug">
main.section
	.container
		.columns.is-mobile.is-vcentered.is-variable.is-2-mobile
			.column
				tile(responsive icon="usd" color="#4a8d4a" small href="/currencies")
					b {{ usdPrice | faNum }} تومان
			.column
				tile(responsive icon="weather-pouring" color="#6c8397" small)
					| تهران:
					b(dir="ltr") {{ temperature | faNum }}&deg;
		.columns.is-vcentered
			.column.is-5
				tile(icon="movies" color="#5716da" href="/filimo"): b نماوا/فیلیمو
			.column
				tile(icon="youtube" color="red" href="/youtube"): b یوتیوب
			.column
				tile(icon="soundcloud" color="#ff7500" button @tap="scModal = true")
					b ساندکلود
			soundcloud-modal#sc-modal(v-model="scModal")
		.columns.is-multiline.is-vcentered
			.column.is-5
				tile(icon="telegram" color="#2a89b6" small button @tap="getAProxy")
					b پراکسی تلگرام
			modal#mtp-modal(v-model="proxy.open" title="پراکسی تلگرام" close-button="لغو")
				template(v-if="proxy.loaded")
					p با استفاده از لینک زیر می‌توانید بدون استفاده از فیلترشکن به تلگرام متصل شوید.
					a(slot='footer' class="button is-primary" :href="proxy.url") اتصال
				p(v-else) لطفا چند لحظه صبر کنید...
			.column
				tile(icon="word" color="#c25541" small button): b لغت‌نامه
			.column.is-3
				tile(icon="omen" color="#bd9548" small): b فال حافظ
		p.is-size-6.has-text-grey-dark(dir="ltr" v-if="loaded")
			| IP: 
			b {{ ip }}
			br
			b {{ date | faNum }}
</template>
<script>
import { call } from '../api'
import { animateNumber } from '../utils'
import Tile from "../components/Tile.vue"
export default {
	data: () => ({
		loaded: false,
		usdPrice: 0,
		temperature: 0,
		ip: '',
		date: '',
		scModal: false,
		proxy: {
			open: false,
			loaded: false,
			url: ''
		}
	}),
	async mounted() {
		try {
			const res = await call('/init')
			if (res.ok) {
				const { result } = res.data

				this.ip = result.ip
				this.date = result.date
				
				animateNumber(i => {
					this.usdPrice = i
				}, result.dollar)
	
				const w = result.weather.result.weather,
				c = +(w.match(/[-+]?\d+/) || 0);
				animateNumber(i => {
					this.temperature = i
				}, c)
				this.loaded = true
			} else throw res.status
		} catch (e) {
			console.log(e)
		}
	},
	methods: {
		getAProxy() {
			this.proxy.open = true
			if (!this.proxy.loaded) {
				call('/proxy').then(({ data, ok }) => {
					if (ok) {
						const link = data.result.proxy
						this.proxy.loaded = true
						this.proxy.url = link
					}
				})
			}
		}
	},
	components: {
		Tile,
		SoundcloudModal: () => import("../components/SoundcloudModal.vue"),
		Modal: () => import("../components/Modal.vue")
	}
}
</script>