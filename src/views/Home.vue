<template lang="pug">
section.section: .container
	.columns.is-mobile.is-vcentered
		.column
			tile(responsive icon='usd' color='#4a8d4a')
				b ۱۳۵۰۰ تومان
		.column.is-size-4.is-7-desktop
			tile(responsive icon='weather-pouring' color='#6c8397')
				| تهران: 
				b ۱۷ درجه
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
export default {
	components: { Tile }
}
</script>
