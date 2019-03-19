<template lang="pug">
section.section: .container: .tile.is-ancestor
	.tile.is-vertical
		.tile
			.tile.is-parent
				router-link(to="/filimo").tile.is-child.xlink.is-filimo
					.title فیلیمو
			.tile.is-parent
				router-link(to="/namava").tile.is-child.xlink.is-namava
					.title نماوا
		.tile
			.tile.is-parent.is-4
				.tile.is-child.xlink.is-soundcloud.is-clickable
					img(:src="require('../assets/soundcloud.svg')")
			.tile.is-parent.is-4
				.tile.is-child.xlink.is-youtube.is-clickable
					img(:src="require('../assets/youtube.svg')")
			.tile.is-parent
				.tile.is-child.xlink.has-background-grey.is-size-6.is-centered
					i.material-icons.is-3x.has-text-grey-lighter attach_money
					| ۱۳۵۰۰ تومان
	.tile
		.tile.is-parent
			.tile.is-child.xlink.has-background-info.is-centered
				i.material-icons.is-6x.has-text-warning wb_sunny
				.is-size-1.has-text-weight-light ۱۷&deg;

</template>
<script>
import Modal from '@/components/Modal.vue'
export default {
	components: { Modal } // will be used later
}
</script>
