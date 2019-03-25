<template>
	<div class="modal" :class="{ 'is-active': open }">
		<div class="modal-background" @click.self="close"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">{{ title }}</p>
			</header>
			<section class="modal-card-body">
				<slot></slot>
			</section>
			<footer class="modal-card-foot">
				<slot name="footer">
					<button class="button is-primary" @click="close">Close</button>
				</slot>
			</footer>
		</div>
		<button class="modal-close is-large" aria-label="close" @click="close"></button>
	</div>
</template>
<script>
export default {
	props: {
		open: Boolean,
		title: String
	},
	model: {
		prop: 'open',
		event: 'toggle'
	},
	methods: {
		close() {
			this.$emit('toggle', false)
		}
	},
	name: 'Modal'
}
</script>
