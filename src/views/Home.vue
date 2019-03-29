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
					تهران: <b>&deg;{{ temperature | faNum }}</b>
				</tile>
			</div>
		</div>
		<div class="columns is-centered is-vcentered">
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
				<tile icon="soundcloud" color="#ff7500">
					<b>ساندکلود</b>
				</tile>
			</div>
		</div>
	</div>	
</section>
</template>
<script>
import { call } from '../api'
import Tile from '../components/Tile.vue'
export default {
	data: () => ({
		usdPrice: 0,
		temperature: 0
	}),
	created() {
		call('/init').then(res => {
			const { result } = res.data

			this.usdPrice = result.dollar

			const w = result.weather.result.weather,
			f = +(w.match(/[-+]?\d+/) || 0),
			c = Math.round((f - 32) * 5/9);
			this.temperature = c
		})
	},
	components: { Tile }
}
</script>
