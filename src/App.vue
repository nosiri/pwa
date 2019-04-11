<template>
	<transition name="page" mode="out-in" v-if="hasLoggedIn">
		<keep-alive>
			<router-view class="rv" /> 
		</keep-alive>
	</transition>
	<signin-form v-else />
</template>
<script>
import SigninForm from './views/SigninForm.vue'
export default {
	components: { SigninForm },
	data: () => ({
		hasLoggedIn: !0
	})
}
</script>
<style lang="scss">
@import "./styles/vars";
.page-enter-active, .page-leave-active {
	transition-duration: $speed;
	transition-timing-function: $easing;
	transition-property: opacity, transform;
}

.page-enter-to, .page-leave {
	transform: translateY(0)
}

.page-enter, .page-leave-to {
	opacity: 0;
	transform: translateY(3px)
}
</style>
