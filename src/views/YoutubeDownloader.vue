<template>
<div>
	<page-header title="دانلود از یوتیوب" primary />
	<main class="section">
		<div class="container">
			<transition name="fade" mode="out-in">
				<div key="a" class="columns" v-if="state === 1 && data">
					<div class="column is-7">
						<video :src="data.link" controls />
					</div>
					<div class="column">
						<template v-if="data.title.trim()">
							<h2 class="title" dir="auto">{{ data.title }}</h2>
							<hr>
						</template>
						<div class="has-text-centered">
							<btn @click.native="reset">جستجوی دوباره</btn>
						</div>
					</div>
				</div>
				<div key="b" class="columns is-vcentered is-center" v-else>
					<div class="column is-4 has-text-centered">
						<icon name="youtube" size="200" color="red" id="icon"></icon>
					</div>
					<div class="column has-text-centered-mobile">
						<p>
							اگه می‌خواید فیلمی رو از یوتیوب دانلود کنید،
							<b>لینک اون رو همینجا کپی کنید</b>
							تا اون رو تماشا یا دانلود کنید.
						</p> 
						<br>
						<form class="columns is-multiline is-vcentered is-mobile" @submit.prevent="handleSubmit" ref="form">
							<div class="column control">
								<input type="url" class="input" placeholder="لینک فیلم" v-model.trim="link" required>
							</div>
							<div class="column is-narrow">
								<btn color="primary" :disabled="!isValid" :loading="state === 0" type="submit">دریافت</btn>
							</div>
						</form>
					</div>
				</div>
			</transition>
		</div>
	</main>
</div>
</template>
<script>
import PageHeader from '../components/PageHeader.vue'
import Icon from '../components/Icon.vue'
import { call } from '../api';
// test case: https://www.youtube.com/watch?v=6SZ_wVEk2Z4
export default {
	data: () => ({
		link: '',
		isValid: false,
		state: null,
		data: null
	}),
	methods: {
		reset() {
			this.state = null
			this.data = null
			this.link = ''
		},
		async handleSubmit() {
			this.state = 0
			try {
				const res = await call('/youtube', { link: this.link })
				if (res.ok) {
					this.state = 1
					this.data = res.data.result
					const { title, link } = res.data.result
					console.log(title + ': ' + link);
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
video {
	width: 100%;
	box-shadow: 0 10px 35px -2px #0004
}
</style>
