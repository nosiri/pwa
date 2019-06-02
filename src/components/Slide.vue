<template lang="pug" functional>
.carousel-slide
	slot
</template>
<style lang="scss">
@import "~bulma/sass/utilities/mixins";
.carousel-slide {
	@include mobile {
		width: 100%
	}
	flex: 0 0;
	padding: .4rem 0;
	& + & {
		padding-right: .4rem
	}
}
</style>
