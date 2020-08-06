<template>
  <div class="spike">
    <!-- 秒杀倒计时 -->
    <van-row type="flex" justify="space-between">
      <van-col class="title">
        <span>限时秒杀</span>
        <van-count-down :time="time">
          <template v-slot="timeData">
            <span class="time-item">{{ timeData.hours }}</span>:
            <span class="time-item">{{ timeData.minutes }}</span>:
            <span class="time-item">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </van-col>
      <van-col class="more">
        <span>查看更多</span>
        <van-icon name="arrow" />
      </van-col>
    </van-row>
    <!-- 秒杀商品 -->
    <van-row class="spike-goods" type="flex" justify="space-between">
      <van-col class="spike-goods-item" @click="goDetail(item.goods_id)" v-for="(item,index) in images" :key="index">
        <van-image width="3rem" fit="contain" lazy-load radius="5px" :src="item.goods_cover_img" style="width: 80px;height: 100px;" />
        <div style="overflow: hidden; text-overflow:ellipsis; ">{{item.goods_name}}</div>
        <div class="price">
          <span>￥{{item.selling_price}}</span>
          <s>￥{{item.original_price}}</s>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        images: [],
        time: 30 * 60 * 60 * 1000
      }
    },
    methods: {
      goDetail(goodsId) {
        this.$router.push(`goodsDetails/${goodsId}`)
      },
      async getBannerImage() {
        await this.$api.homeData.banner().then(({
          data
        }) => {
          this.images = data.goods_info
        })
      }
    },
    created() {
      this.getBannerImage()
    }
  }
</script>
<style lang="scss" scoped>
  .spike {
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;

      .icon-miaosha {
        font-size: 20px;
        color: #f06c7a;
        margin-right: 5px;
      }

      span {
        font-size: 16px;
        font-weight: bold;
        margin-right: 5px;
      }

      .time-item {
        display: inline-block;
        width: 20px;
        border-radius: 3px;
        margin-right: 3px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background-color: #f06c7a;
      }
    }

    .more {
      color: #bbb;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
    }

    .spike-goods {
      overflow-x: auto;

      .spike-goods-item {
        padding: 10px 0;
        margin-right: 7px;
        width: 50%;

        img {}

        .price {
          margin-top: 5px;
          display: flex;
          justify-content: space-between;

          span {
            font-size: 14px;
            color: #f06c7a;
          }

          s {
            color: #bbb;
          }
        }
      }
    }
  }
</style>
