<template lang='pug'>
form.columns.is-mobile.is-vcentered.is-variable.is-2-mobile(@submit.prevent='submit')
	.column.control
		text-field(v-model='_value' ref='field' v-bind='{ placeholder, showError, validator }' @focus.native='$emit("focuschange", true)' @blur.native='$emit("focuschange", false)')
	.column.is-narrow
		btn(color='link' :disabled='!isValid()' :loading='loading') {{ buttonText }}
</template>
<script>
export default {
	props: {
		value: {
			type: String,
			required: true
		},
		validator: {
			type: Function,
			default: v => v
		},
		placeholder: String,
		loading: Boolean,
		buttonText: {
			type: String,
			default: 'جستجو'
		},
		showError: Boolean,
		autofocus: {
			type: Boolean,
			default: true
		}
	},
	model: {
		prop: 'value',
		event: 'update'
	},
	computed: {
		_value: {
			get() { return this.value },
			set(v) {
				if (!!this.value.trim() && !v.trim()) {
					this.$emit('clear')
				}
				this.$emit('update', v)
			}
		}
	},
	methods: {
		isValid() {
			return this.$refs.field?.isValid
		},
		submit() {
			if (this.isValid() && !this.loading) {
				this.$emit('submit', this._value)
			}
		}
	},
	activated() {
		if (this.autofocus) {
			this.$refs.field?.focus()
		}
	}
}
</script>