<template>
	<div>
		<h1>这是首页</h1>
		<MenuBar></MenuBar>
	</div>
</template>

<script>
  import MenuBar from '../../components/MenuBar.vue'
  export default {
    name: 'home',
    components: {
      MenuBar
    }
  }
</script>
<style>
</style>
