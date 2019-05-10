<template lang="pug">
transition(name='fade')
	.modal.is-active(v-if='open' tabindex='-1' @keydown.esc.exact.self='close')
		.modal-background(@click.self='close')
		.modal-card
			header.modal-card-head
				p.modal-card-title {{ title }}
			section.modal-card-body
				slot
			footer.modal-card-foot
				slot(name='footer')
				btn(v-if='closeButton' @click.native='close') {{ closeButton }}
		button.modal-close.is-large(aria-label='close' @click='close')
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
			if (isOpen) {
				html.style.overflowY = 'hidden'
				this.$nextTick(() => {
					this.$el.focus()
				})
			} else html.removeAttribute('style')
		}
	},
	name: 'Modal'
}
</script>
