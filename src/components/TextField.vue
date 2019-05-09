<template lang="pug">
input.input(ref='input'
	v-model='_value'
	:class='{ "is-danger": showError && (value && !validator(_value)) }'
	:dir='direction'
	:placeholder='placeholder' required)
</template>
<script>
import { isRtlString } from '../helpers';
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
		direction() {
			return isRtlString(this._value || this.placeholder || '') ? 'rtl' : 'ltr'
		},
		isValid() {
			return Boolean(this._value && this.validator(this._value))
		}
	},
	methods: {
		focus() {
			this.$el.focus()
		}
	}
}
</script>
