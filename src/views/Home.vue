<template lang="pug">
section.section
	.container
		.tile.is-ancestor.is-mobile
			.tile.is-7.is-vertical
				.tile
					.tile.is-parent.is-vertical
						router-link(to="/filimo").tile.is-child.xlink.is-filimo
							h1.title Filimo
						router-link(to="/namava").tile.is-child.xlink.is-namava
							h1.title Namava
				.tile
					.tile.is-parent
						router-link(to="/").tile.is-child.xlink.is-soundcloud
							p.subtitle SoundCloud
					.tile.is-parent
						router-link(to="/").tile.is-child.xlink.is-youtube
							p.subtitle YouTube
			.tile
				.tile.is-parent.is-5
					.tile.is-child.notification.is-info
						| Tehran: 17&deg;
				.tile.is-parent
					router-link(to="/").tile.is-child.xlink
						| USD Price:
						b  13500
</template>
<script>
export default {
/* 	data: () => ({
		items: [{
			icon: 'movie',
			title: 'Namava',
			color: 'blue',
			to: '/namava'
		}, {
			icon: 'movie',
			title: 'Filimo',
			color: 'orange',
			to: '/filimo'
		}]
	})
 */}
</script>
