<template lang="pug" functional>
.carousel
	.carousel-inner
		slot
</template>
<style lang="scss">
.carousel {
	width: 100%;
	max-width: 100%;
	white-space: nowrap;
	overflow-x: auto;
	overflow-y: hidden;
	display: block;
	scroll-behavior: smooth;
	&::-webkit-scrollbar { 
		display: none; 
	}
	> .carousel-inner {
		flex-wrap: nowrap;
		display: flex;
		width: 100%;
	}
}
</style>
