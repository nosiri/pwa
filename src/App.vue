<template>
	<router-view v-if="hasLoggedIn" /> 
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
