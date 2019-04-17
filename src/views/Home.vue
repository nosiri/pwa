<template>
<main class="section">
	<div class="container">
		<div class="columns is-mobile is-vcentered is-variable is-2-mobile">
			<div class="column">
				<tile responsive icon="usd" color="#4a8d4a" small href="/currencies">
					<b>{{ usdPrice | faNum }} تومان</b>
				</tile>			
			</div>
			<div class="column is-6-desktop">
				<tile responsive icon="weather-pouring" color="#6c8397" small>
					تهران: <b dir="ltr">{{ temperature | faNum }}&deg;</b>
				</tile>
			</div>
		</div>
		
		<div class="columns is-vcentered">
			<div class="column is-5">
				<tile icon="movies" color="#5716da" href="/filimo"><b>نماوا/فیلیمو</b></tile>
			</div>
			<div class="column">
				<tile icon="youtube" color="red" href="/youtube"><b>یوتیوب</b></tile> 
			</div>
			<div class="column">
				<tile icon="soundcloud" color="#ff7500" button @tap="scModal = true"><b>ساندکلود</b></tile>
			</div>
			<soundcloud-modal v-model="scModal" id="sc-modal" />
		</div>

		<div class="columns is-multiline is-vcentered">
			<div class="column is-5">
				<tile icon="telegram" color="#2a89b6" small button @tap="getAProxy"><b>پراکسی تلگرام</b></tile>
			</div>
			<modal v-model="proxy.open" title="پراکسی تلگرام" close-button="لغو" id="mtp-modal">
				<template v-if="proxy.loaded">
					<p>با استفاده از لینک زیر می‌توانید بدون استفاده از فیلترشکن به تلگرام متصل شوید.</p>
					<a slot='footer' class="button is-primary" :href="proxy.url">اتصال</a>
				</template>
				<template v-else>
					<p>لطفا چند لحظه صبر کنید...</p>
				</template>
			</modal>
			<div class="column">
				<tile icon="word" color="#c25541" small button><b>لغت‌نامه</b></tile>
			</div>
			<div class="column is-3">
				<tile icon="omen" color="#bd9548" small><b>فال حافظ</b></tile>
			</div>
		</div>

		<p class="is-size-6 has-text-grey-dark" dir="ltr" v-if="loaded">
			IP: <b>{{ ip }}</b>
			<br>
			{{ date }}
		</p>
	</div>	
</main>
</template>
<script>
import { call } from '../api'
import { animateNumber } from '../utils'
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
				}, result.dollar, 200)
	
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
		Tile: () => import("../components/Tile.vue"),
		Snackbar: () => import("../components/Snackbar.vue"),
		SoundcloudModal: () => import("../components/SoundcloudModal.vue"),
		Modal: () => import("../components/Modal.vue")
	}
}
</script>