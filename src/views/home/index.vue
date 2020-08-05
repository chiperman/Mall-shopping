<template>
  <div class="home">
    <van-sticky>
      <NavBar></NavBar>
    </van-sticky>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <Swipe class='swipe'></Swipe>
      <Spike></Spike>
      <Popular></Popular>
      <AllGoods></AllGoods>
    </van-pull-refresh>
    <MenuBar></MenuBar>
  </div>
</template>

<script>
  import MenuBar from '../../components/MenuBar.vue'
  import Swipe from './base/Swipe.vue'
  import NavBar from './base/Navbar.vue'
  import Spike from './base/Spike.vue'
  import Popular from './base/Popular.vue'
  import AllGoods from './base/AllGoods.vue'
  export default {
    name: 'home',
    components: {
      MenuBar,
      Swipe,
      NavBar,
      Spike,
      Popular,
      AllGoods
    },
    data() {
      return {
        isLoading: false
      }
    },
    methods: {
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功')
          this.isLoading = false
        }, 1000)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .home {
    padding-bottom: 50px;
  }
  .swipe {
    width: 95%;
    margin: auto;
    height: 140px;
    margin-bottom: 5px;
    margin-top: 10px;
    border-radius: 5px;
    overflow: hidden;
  }
</style>
