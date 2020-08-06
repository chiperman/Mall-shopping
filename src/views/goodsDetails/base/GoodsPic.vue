<template>
  <div class="goods-pic">
    <van-divider>宝贝详情</van-divider>
    <!-- 详细图片 -->
    <img class="deImg" :src="detailImg" />
  </div>
</template>

<script>
  export default {
    props: ['detailImg']
  };
</script>

<style lang="scss" scoped>
  .goods-pic {
    .deImg {
      width: 100%;
    }
  }
</style>
