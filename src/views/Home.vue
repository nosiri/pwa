<template lang="pug">
section.section: .container
	snackbar(v-model='snack') خطایی رخ داده‌است.
	.columns.is-mobile.is-vcentered
		.column
			tile(responsive icon='usd' color='#4a8d4a' small)
				b ۱۳۵۰۰ تومان
		.column.is-7-desktop
			tile(responsive icon='weather-pouring' color='#6c8397' small)
				| تهران: 
				b &deg;۱۷
	.columns.is-centered.is-vcentered
		.column
			tile(icon='youtube' color='red' href='/youtube') 
				b یوتیوب
		.column.is-5
			tile(icon='movies' color='#2f477d' href='/namava')
				b نماوا/فیلیمو
		.column
			tile(icon='soundcloud' color='#ff7500')
				b ساندکلود
</template>
<script>
import Tile from '../components/Tile.vue'
import Snackbar from '../components/Snackbar.vue'
export default {
	components: { Tile, Snackbar },
	data: () => ({ snack: false })
}
</script>
