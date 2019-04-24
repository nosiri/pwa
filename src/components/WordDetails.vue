<template>
	<div class="column is-full-mobile is-8-tablet is-6-desktop">
		<h1 class="title">{{ word }}</h1>
		<div class="subtitle">{{ type }}</div>
		<hr>
		<p>
			{{ text }}
			<br>
			<b class="is-size-7">
				منبع: {{ database }}
			</b>
		</p>
		<div class="has-text-centered" v-if='hasSaveButton'>
			<btn color="primary" @click.native="save">ذخیره</btn>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		word: String,
		type: String,
		text: String,
		database: String,
		hasSaveButton: Boolean
	},
	methods: {
		save() {
			const { word, text, type, database } = this
			this.$emit('save', { word, text, type, database })
		}
	}
}
</script>
