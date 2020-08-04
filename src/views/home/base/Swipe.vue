<template>
  <div class="swiper-wrapper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.carousel_url" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        images: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596535547436&di=b2c2c255ea659e836aaad286b197b64b&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F56%2F12%2F01300000164151121576126282411.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596535547436&di=5aab6e3f5413fa2f6e4af468ca7f9db1&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg'
        ]
      }
    },
    methods: {
      async getBannerImage() {
        await this.$api.homeData.banner().then(({
          data
        }) => {
          this.images = data.mall_carousel
        })
      }
    },
    created() {
      this.getBannerImage()
    }
  }
</script>

<style>
  .swiper-wrapper img {
    width: 100%;
    height: auto;
  }
</style>
