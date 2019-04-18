<template>
	<section class="hero is-fullheight is-light is-bold">
		<div class="hero-body">
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-8-tablet is-6-desktop is-4-widescreen">
						<div class="card">
							<div class="card-header">
								<h1 class="card-header-title">ورود به برنامه</h1>
							</div>
							<div class="card-content">
								<form @submit.prevent="handleSubmit">
									<div class="control">
										<label class="label">آدرس ایمیل</label>
										<input ref="input" required type="email" class="input" placeholder="info@example.com" dir="ltr" autofocus v-model="email">
									</div>
									<br>
									<div class="control has-text-centered">
										<btn class="is-medium" color="primary" :disabled="!email" :loading='loading'>ورود</btn>
									</div>
								</form>
							</div>
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