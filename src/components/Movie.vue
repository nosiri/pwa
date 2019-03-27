<template lang="pug">
fake-link.box(@click="$emit('click')")
	.columns.is-mobile.is-vcentered
		.column.is-narrow
			figure.image.is-48x48
				img
		.column.is-size-5
			slot
		.column.is-narrow
			.has-text-weight-bold.is-size-7.has-text-left
				div {{ rate | faNum }}
				div {{ duration }}
				div {{ releaseDate }}
</template>
<script>
export default {
	props: {
		rate: Number,
		duration: String,
		releaseDate: String
	},
	name: 'Movie'
}
</script>

