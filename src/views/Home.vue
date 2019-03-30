<template>
<section class="section">
	<div class="container">
		<div class="columns is-mobile is-vcentered">
			<div class="column">
				<tile responsive icon="usd" color="#4a8d4a" small>
					<b>{{ usdPrice | faNum }} تومان</b>				
				</tile>			
			</div>
			<div class="column is-7-desktop">
				<tile responsive icon="weather-pouring" color="#6c8397" small>
					تهران: <b dir="ltr">{{ temperature | faNum }}&deg;</b>
				</tile>
			</div>
		</div>
		<div class="columns is-vcentered">
			<div class="column">
				<tile icon="youtube" color="red" href="/youtube">
					<b>یوتیوب</b>
				</tile> 
			</div>
			<div class="column is-5">
				<tile icon="movies" color="#2f477d" href="/namava">
					<b>نماوا/فیلیمو</b>
				</tile>
			</div>
			<div class="column">
				<tile icon="soundcloud" color="#ff7500" button @tap="scModal = true">
					<b>ساندکلود</b>
				</tile>
			</div>
		</div>
	</div>	
	<modal v-model="scModal" title="دانلود از ساندکلود">
		<div class="control">
			<input type="url" dir="ltr" class="input" placeholder="https://soundcloud.com/..." autofocus>
		</div>
		<template slot="footer">
			<button class="button is-primary">دانلود</button>
			<button class="button is-dark">لغو</button>
		</template>
	</modal>
</section>
</template>
<script>
import { call } from '../api'
import { animateNumber } from '../utils'
import Tile from '../components/Tile.vue'
import Modal from '../components/Modal.vue'
export default {
	data: () => ({
		usdPrice: 0,
		temperature: 0,
		scModal: false
	}),
	async created() {
		try {
			const res = await call('/init')
			if (res.ok) {
				const { result } = res.data
				
				animateNumber(i => {
					this.usdPrice = i
				}, result.dollar, 150)
	
				const w = result.weather.result.weather,
				f = +(w.match(/[-+]?\d+/) || 0),
				c = Math.round((f - 32) * 5/9);
				animateNumber(i => {
					this.temperature = i
				}, c)
			}
		} catch (e) {
			console.log(e)
		}
	},
	components: { Tile, Modal }
}
</script>
