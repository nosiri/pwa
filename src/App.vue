<template>
	<keep-alive v-if="hasLoggedIn">
		<router-view class="rv" /> 
	</keep-alive>
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
