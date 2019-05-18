<template lang="pug">
div
	page-header(title='تنظیمات' small)
	main.section: .container: .columns.is-centered
		.column.is-7-desktop
			box(small button @tap='getLocation()' icon='gps' icon-color='grey')
				| تنظیم موقعیت مکانی
				span(slot='caption') از این موقعیت در تعیین آب و هوا استفاده می‌شود.
	snackbar(v-model='gl_open' :duration='0')
		template(v-if='!gl_error') موقعیت مکانی شما با موفقیت ذخیره شد.
		template(v-else) متاسفانه موقعیت مکانی شما پیدا نشد.
</template>
<script>
import { setCookie } from 'tiny-cookie';
import pick from 'lodash/pick';
import { getCurrentPosition, wait } from '../helpers/';
export default {
	data: () => ({
		gl_open: false,
		gl_error: false
	}),
	methods: {
		async getLocation() {
			try {
				const { lat, long } = await getCurrentPosition();
				setCookie('position', `${lat},${long}`)
			} catch {
				this.gl_error = true
			} finally {
				this.gl_open = true
			}
		}
	},
	components: {
		Box: () => import('../components/Box.vue')
	}
}
</script>

