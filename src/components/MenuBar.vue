<template>
  <div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to='/home' icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to='/category' icon="search" dot>分类</van-tabbar-item>
      <van-tabbar-item replace to='/cart' icon="shopping-cart-o" badge="5">购物车</van-tabbar-item>
      <van-tabbar-item replace to='/me' icon="user-o" badge="20">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    name: 'MenuBar',
    data() {
      return {
        active: 0
      }
    }
  }
</script>
