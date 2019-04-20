<template>
	<transition v-if="hasLoggedIn" name="fade" mode="out-in">
		<keep-alive>
			<router-view class="rv" /> 
		</keep-alive>
	</transition>
	<signin-form v-else />
</template>
<script>
export default {
	components: {
		SigninForm: () => import(/* webpackChunkName: "signin" */'./views/SigninForm.vue')
	},
	data: () => ({
		hasLoggedIn: !0
	})
}
</script>