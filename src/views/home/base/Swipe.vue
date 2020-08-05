<template>
  <div class="swiper-wrapper">
    <van-swipe :autoplay="3000" indicator-color="#f60">
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
  }
</style>
