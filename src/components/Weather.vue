<template lang="pug">
.xlink.is-centered(:class="'is-' + state")
	i.material-icons.is-6x {{ icon }}
	.is-size-1.has-text-weight-light {{ degree | faNum }}&deg;
</template>
<script>
export default {
	props: {
		degree: Number,
		state: String,
	},
	computed: {
		icon() {
			switch (this.state) {
				case "sunny":
					return "wb_sunny"
				case "cloudy":
					return "cloud"
			}
		}
	},
	name: 'Weather'
}
</script>
<style lang="scss" scoped>
$map: (
	sunny: (#2196f3, #ff2),
	cloudy: (#627a89, #83bde1)
);
@each $state, $colors in $map {
	.is-#{ $state } {
		background: nth($colors, 1);
		> i {
			color: nth($colors, 2)
		}
	}
}
</style>
