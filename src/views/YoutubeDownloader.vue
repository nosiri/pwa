<template>
<div>
	<page-header title="دانلود از یوتیوب">
		<form class="columns is-multiline is-vcentered is-mobile" @submit.prevent="handleSubmit">
			<div class="column control">
				<input type="text" class="input" placeholder="لینک فیلم" autofocus v-model="link">
			</div>
			<div class="column is-narrow">
				<btn color="primary">
					دریافت
				</btn>
			</div>
		</form>
	</page-header>
</div>
</template>
<script>
import PageHeader from '../components/PageHeader.vue'
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
	components: { PageHeader }
}
</script>
