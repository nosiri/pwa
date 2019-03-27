<template>
	<div class="snackbar">
		<div class="box">
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		active: {
			type: Boolean,
			required: true
		}
	},
	model: {
		prop: 'active',
		event: 'toggle'
	}
}
</script>