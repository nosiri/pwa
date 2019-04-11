<template>
	<transition v-if="hasLoggedIn" name="fade" mode="out-in">
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