import Vue from "vue";

Vue.mixin({
	methods: {
		$reset() {
			Object.assign(this.$data, this.$options.data());
		}
	}
});
