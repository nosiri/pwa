<template>
<div>
	<page-header title="دانلود از یوتیوب" />
	<section class="section">
		<div class="container">
			<div class="columns is-vcentered is-center">
				<div class="column is-two-fifths has-text-centered">
					<icon name="youtube" size="175" color="red" id="icon"></icon>
				</div>
				<div class="column has-text-centered-mobile">
					<p>
						اگه می‌خواید فیلمی رو از یوتیوب دانلود کنید،
						<b>لینک اون رو همینجا کپی کنید</b>
						تا اون رو همینجا تماشا کنید، یا اگه خواستید دانلود کنید.
					</p>
					<br>
					<form class="columns is-multiline is-vcentered is-mobile" @submit.prevent="handleSubmit">
						<div class="column control">
							<input type="url" class="input" placeholder="لینک فیلم" autofocus v-model="link" required>
						</div>
						<div class="column is-narrow">
							<btn color="primary" type="submit">دریافت</btn>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
</div>
</template>
<script>
import PageHeader from '../components/PageHeader.vue'
import Icon from '../components/Icon.vue'
import { call } from '../api';
export default {
	data: () => ({
		link: ''
	}),
	methods: {
		async handleSubmit() {
			console.log(await call('/youtube', { link: this.link }))
		}
	},
	components: { PageHeader, Icon }
}
</script>
<style scoped>
#icon {
	stroke: #8205;
	stroke-width: 1;
	stroke-linejoin: round;
	stroke-linecap: round;
}
</style>
