<template>
	<div v-if="hasLoggedIn">
		<div id="swipe-progress"
			:style="{ width: swiped + 'px' }"
			:class='{"has-transition": swipe_transition}' />
		<transition name="fade" mode="out-in">
			<keep-alive>
				<router-view class="rv" /> 
			</keep-alive>
		</transition>
	</div>
	<signin-form v-else />
</template>
<script>
import handleSwipe from './swipe/'
export default {
	components: {
		SigninForm: () => import(/* webpackChunkName: "signin" */'./views/SigninForm.vue')
	},
	data: () => ({
		swiped: 0,
		swipe_transition: false,
		hasLoggedIn: !0
	}),
	mounted() {
		handleSwipe(n => {
			this.swipe_transition = false
			this.swiped = 75 * Math.min(n, 3)
		}, () => {
			this.swipe_transition = true
			this.swiped = 0
		})
	}
}
</script>
<style lang="scss">
@import "./styles/vars";
#swipe-progress {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	z-index: 100;
	background-image: linear-gradient(to right, rgba($link, .3), #0000);
	&.has-transition {
		transition: width $speed $easing
	}
}
</style>
