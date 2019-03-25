<template lang="pug">
section.section: .container: .tile.is-ancestor
	.tile.is-vertical.is-7
		.tile
			.tile.is-parent
				router-link(to="/filimo").tile.is-child.xlink.is-filimo
					.title فیلیمو
			.tile.is-parent
				router-link(to="/namava").tile.is-child.xlink.is-namava
					.title نماوا
		.tile
			.tile.is-parent.is-4
				router-link.tile.is-child.xlink.is-soundcloud(to="/sc")
					img(:src="require('../assets/soundcloud.svg')")
			.tile.is-parent.is-4
				router-link.tile.is-child.xlink.is-youtube(to="/yt")
					img(:src="require('../assets/youtube.svg')")
			.tile.is-parent
				.tile.is-child.xlink.has-background-grey.is-size-6.is-centered
					i.material-icons.is-3x.has-text-grey-lighter attach_money
					| ۱۳۵۰۰ تومان
	.tile
		.tile.is-parent
			weather.tile.is-child(:degree="17" state="sunny")
</template>
<script>
import Weather from '../components/Weather.vue'
export default {
	components: { Weather }
}
</script>
