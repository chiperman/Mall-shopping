<template>
	<div>
    <Swipe></Swipe>
		<h1>这是首页</h1>
		<MenuBar></MenuBar>
	</div>
</template>

<script>
  import MenuBar from '../../components/MenuBar.vue'
  import Swipe from './base/Swipe.vue'
  export default {
    name: 'home',
    components: {
      MenuBar,
      Swipe
    }
  }
</script>
<style>
</style>
