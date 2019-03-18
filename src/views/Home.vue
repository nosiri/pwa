<template lang="pug">
section.section: .container: .tile.is-ancestor.is-mobile
	.tile.is-vertical
		.tile
			.tile.is-parent.is-vertical
				router-link(to="/filimo").tile.is-child.xlink.is-filimo
					h1.title Filimo
				router-link(to="/namava").tile.is-child.xlink.is-namava
					h1.title Namava
				.tile.is-child
					.columns.is-mobile.is-vcentered
						.column: router-link(to="/sc").tile.is-child.xlink.is-soundcloud
								img(:src="require('../assets/soundcloud.svg')")
						.column: router-link(to="/yt").tile.is-child.xlink.is-youtube
								img(:src="require('../assets/youtube.svg')")
						.column: router-link(to="/npm").tile.is-child.xlink.is-npm
								img(:src="require('../assets/npm.svg')")
						.column: router-link(to="/").tile.is-child.xlink.has-background-dark
								.title b
	.tile
		.tile.is-parent
			.tile.is-child.xlink.has-background-info.has-text-centered
				.icon: i.material-icons wb_sunny
				br
				.title 17&deg;
		.tile.is-parent.is-4
			.tile.is-child.xlink.has-background-success
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
