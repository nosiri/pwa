import Vue from "vue";

Vue.mixin({
	methods: {
		$reset(...exclude) {
			const initial = this.$options.data();
			for (const key in initial) {
				if (!exclude.includes(key)) {
					this.$data[key] = initial[key];
				}
			}
		}
	}
});
