<template>
<div>
	<page-header title="دانلود از یوتیوب">
		<br>
		<form class="columns is-multiline is-vcentered is-mobile" @submit.prevent="">
			<div class="column control">
				<input type="text" class="input" placeholder="لینک فیلم" autofocus>
			</div>
			<div class="column is-narrow">
				<button class="button is-primary">
					دریافت
				</button>
			</div>
		</form>
	</page-header>
</div>
</template>
<script>
import PageHeader from '../components/PageHeader.vue'
export default {
	components: { PageHeader }
}
</script>
