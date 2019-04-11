<template>
	<div class="modal" :class="{ 'is-active': open }">
		<template v-if="open">
			<div class="modal-background" @click.self="close"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">{{ title }}</p>
				</header>
				<section class="modal-card-body">
					<slot></slot>
				</section>
				<footer class="modal-card-foot">
					<slot name="footer" />
					<btn v-if="closeButton" @click.native="close">
						{{ closeButton }}
					</btn>
				</footer>
			</div>
			<button class="modal-close is-large" aria-label="close" @click="close"></button>
		</template>
	</div>
</template>
<script>
export default {
	props: {
		open: Boolean,
		title: String,
		closeButton: String
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
	watch: {
		open(isOpen) {
			const html = document.body.parentElement
			if (isOpen) html.style.overflowY = 'hidden'
			else html.removeAttribute('style')
		}
	},
	name: 'Modal'
}
</script>
