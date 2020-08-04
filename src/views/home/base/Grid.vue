<template>
	<div>
		<van-grid square>
			<van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
		</van-grid>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		created() {}
	}
</script>

<style>
</style>
