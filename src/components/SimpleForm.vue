<template lang='pug'>
form.columns.is-mobile.is-vcentered.is-variable.is-2-mobile(@submit.prevent='submit')
	.column.control
		input.input(v-model='_value' :dir='direction' :placeholder='placeholder' :class='{ "is-danger": showError && (value && !validator(_value)) }')
	.column.is-narrow
		btn(color='link' :disabled='!isValid' :loading='loading') {{ buttonText }}
</template>
<script>
import { isRtlString } from '../utils';
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
		showError: Boolean
	},
	model: {
		prop: 'value',
		event: 'update'
	},
	computed: {
		_value: {
			get() { return this.value },
			set(v) { this.$emit('update', v) }
		},
		isValid() {
			return Boolean(this._value && this.validator(this._value))
		},
		direction() {
			return isRtlString(this._value || this.placeholder) ? 'rtl' : 'ltr'
		}
	},
	methods: {
		submit() {
			if (this.isValid && !this.loading) {
				this.$emit('submit', this._value)
			}
		}
	}
}
</script>