<template lang="pug">
div(v-if="hasLoggedIn")
	#swipe-indicator(:style="{ width: swiped + 'px' }"
		:class='{ "has-transition": swipe_transition }')
	transition(name="fade" mode="out-in")
		keep-alive
			router-view.rv
signin-form(v-else)
</template>
<script>
export default {
	components: {
		SigninForm: () => import(/* webpackChunkName: "signin" */'./views/SigninForm.vue')
	},
	data: () => ({
		swiped: 0,
		swipe_transition: false,
		hasLoggedIn: !0
	}),
	computed: {
		isInHome() {
			return this.$route.path === '/'
		}
	},
	created() {
		window.addEventListener('swipe-progress', e => {
			if (this.isInHome) return
			
			const n = e.detail.progress
			this.swipe_transition = false
			this.swiped = 70 * Math.min(n, 3)
		})
		window.addEventListener('swipe-end', e => {
			if (e.detail.isDone) this.$router.back()
			this.swipe_transition = true
			this.swiped = 0
		})
	}
}
</script>
<style lang="scss">
@import "./styles/vars";
#swipe-indicator {
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
