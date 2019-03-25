<template>
	<section class="hero is-fullheight is-light is-bold">
		<div class="hero-body">
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-8-tablet is-6-desktop is-4-widescreen">
						<div class="box">
							<form @submit.prevent="handleSubmit">
								<h1 class="title">ورود به برنامه</h1>
								<hr>
								<div class="control">
									<label class="label">آدرس ایمیل</label>
									<input type="email" class="input" required placeholder="info@example.com" dir="ltr" autofocus v-model="email">
								</div>
								<br>
								<div class="control has-text-centered">
									<button class="button is-primary is-medium" :disabled="!email" :class="{'is-loading': loading}">ورود</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	data: () => ({
		email: '',
		loading: false
	}),
	methods: {
		handleSubmit() {
			if (!this.email || this.loading) return
			this.loading = true
			setTimeout(() => {
				this.loading = false
			}, 2000)
		}
	}
}
</script>