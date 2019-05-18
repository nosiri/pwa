<template lang="pug">
main.container: .columns.is-centered.is-vcentered.is-mobile(style='min-height: 100vh')
	.column.is-size-7-desktop
		empty-state(icon='thermometer' vertical)
			h1.title {{ temp[1] | faNum }}&deg;
			.subtitle {{ temp[2] | faNum }} &ndash; {{ temp[0] | faNum }}
</template>
<script>
import { call } from '../api';
import { getCookie } from 'tiny-cookie';
export default {
	data: () => ({
		temp: [0, 0, 0]
	}),
	async created() {
		const [lat, long] = getCookie('position').split(',').map(e => (+e).toFixed(6));

		const res = await call('/weather', { lat, long })
		if (res.ok) {
			const { now, min, max } = res.data.temp
			this.temp = [min, now, max]
		}
	},
	components: {
		EmptyState: () => import('../components/EmptyState.vue'),
		Spinner: () => import('../components/Spinner.vue')
	}
}
</script>