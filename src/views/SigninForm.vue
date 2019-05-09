<template lang="pug">
page-header(full-screen).is-bold
	.columns.is-centered: .column.is-8-tablet.is-6-desktop.is-4-widescreen: .box
		h1.title.is-size-4 ورود به برنامه
		hr
		form(@submit.prevent='handleSubmit')
			.control
				label.label آدرس ایمیل
				text-field(v-model='email' ref='e' show-error placeholder='info@example.com' type='email' :validator='isValidEmail' autofocus)
			br
			.control
				label.label گذرواژه
				text-field(v-model='password' ref='p' show-error placeholder='حداقل ۶ رقم' type='password' :validator='isValidPassword')
			br
			btn.is-fullwidth.is-medium(color='link' :loading='loading' :disabled='!isValid()' type='submit') ورود
</template>
<script>
export default {
	data: () => ({
		email: '',
		password: '',
		loading: false
	}),
	methods: {
		handleSubmit() {
			if (!this.isValid() || this.loading) return
			this.loading = true
			setTimeout(() => {
				this.loading = false
			}, 2000)
		},
		isValidPassword: p => p.length >= 6,
		isValidEmail: e => /^[a-z\d_.+-]+@[a-z\d-.]+$/i.test(e),
		isValid() {
			const { p, e } = this.$refs
			return p?.isValid && e?.isValid
		}
	}
}
</script>