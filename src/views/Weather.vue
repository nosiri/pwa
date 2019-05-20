<template lang="pug">
main.container: .columns.is-centered.is-vcentered.is-mobile(style='min-height: 100vh')
	transition(name='fade' mode='out-in')
		.column.is-size-7-desktop(v-if='!loading && !error')
			empty-state(icon='thermometer')
				h1.title {{ temp.now | faNum }} درجه
				.subtitle.is-size-6
					| کمترین: {{ temp.min | faNum }}
					br
					| بیشترین: {{ temp.max | faNum }}
		spinner(:size='64' v-else-if='loading && !error')
		empty-state(v-else vertical icon='error' error)
			h1.title(style='margin-bottom: .35em') خطایی رخ داد!
			p.has-text-grey-dark {{ error | translate }}
</template>
<script>
import { call } from '../api';
import { getCurrentPosition } from '../helpers/';
import animateNumber from '../helpers/animateNumber';
import { reset } from '../mixins/'
export default {
	data: () => ({
		loading: false,
		error: null,
		temp: {
			now: 0,
			min: 0,
			max: 0
		},
		phrase: '',
		city: ''
	}),
	mixins: [reset],
	methods: {
		async init() {
			this.loading = true
			try {
				const res = await call('/weather', await getCurrentPosition())
				if (res.ok) {
					const { phrase, temp, location: city } = res.data;
					this.temp = temp
					this.phrase = phrase.replace(/_/g, '-').toLowerCase()
					this.city = city
				} else throw res.error
			} catch (e) {
				this.error = e
			} finally {
				this.loading = false
			}
		}
	},
	activated() {
		this.init()
	},
	components: {
		EmptyState: () => import('../components/EmptyState.vue'),
		Spinner: () => import('../components/Spinner.vue')
	}
}
</script>