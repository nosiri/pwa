<template>
<div>
	<page-header title="دانلود از یوتیوب" primary />
	<section class="section">
		<div class="container">
			<div class="columns is-vcentered is-center">
				<div class="column is-4 has-text-centered">
					<icon name="youtube" size="200" color="red" id="icon"></icon>
				</div>
				<div class="column has-text-centered-mobile">
					<p>
						اگه می‌خواید فیلمی رو از یوتیوب دانلود کنید،
						<b>لینک اون رو همینجا کپی کنید</b>
						تا اون رو همینجا تماشا کنید، یا اگه خواستید دانلود کنید.
					</p> 
					<br>
					<form class="columns is-multiline is-vcentered is-mobile" @submit.prevent="handleSubmit" ref="form">
						<div class="column control">
							<input type="url" class="input" placeholder="لینک فیلم" v-model="link" required>
						</div>
						<div class="column is-narrow">
							<btn color="primary" :disabled="!isValid" :loading="state === 0" type="submit">دریافت</btn>
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
// test case: https://youtu.be/RcbbA23gsbc
export default {
	data: () => ({
		link: '',
		isValid: false,
		state: null,
		data: null
	}),
	methods: {
		async handleSubmit() {
			this.state = 0
			try {
				const res = await call('/youtube', { link: this.link })
				if (res.ok) {
					this.state = 1
					const { title, link } = res.data.result
					console.log(link);
				} else throw res.status
			} catch (e) {
				this.state = 2
				console.log(e)
			}
		}
	},
	watch: {
		link() {
			// TODO: to be refactored later
			const { form } = this.$refs
			this.isValid = form ? form.checkValidity() : true
		}
	},
	components: { PageHeader, Icon }
}
</script>
<style scoped>
#icon {
	stroke: #a02;
	stroke-width: 1;
	stroke-linejoin: round;
	stroke-linecap: round;
}
</style>
