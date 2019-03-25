<template lang="pug">
a.box(href="#" @click.prevent="$emit('click')")
	.columns.is-mobile.is-vcentered
		.column.is-narrow
			figure.image.is-48x48
		.column.is-size-5
			slot
		.column.is-narrow
			.has-text-weight-bold.is-size-7.has-text-left
				div {{ rate }}
				div {{ duration }}
				div {{ releaseDate }}
</template>
<script>
export default {
	props: {
		rate: String,
		duration: String,
		releaseDate: String
	},
	name: 'Movie'
}
</script>

