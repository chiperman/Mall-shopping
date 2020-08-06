<template>
  <div class="popular">
    <!-- 标题 -->
    <van-row type="flex" justify="space-between">
      <van-col class="title">
        <van-icon name="fire" color="#f06c7a" />
        <span>热门限购</span>
      </van-col>
      <van-col class="tips">
        <span>极品生活</span>
        <span>日用之美好</span>
      </van-col>
    </van-row>
    <!-- 热门商品 -->
    <div class="hot-goods">
      <van-row v-for="(item,index) in goodsList" :key="index" @click="goDetail(item.goods_id)" class="hot-goods-item m-b-10 bg-white">
        <van-col :span="8">
          <van-image lazy-load radius="3px" :src="item.goods_cover_img" />
        </van-col>
        <!-- 抢购商品信息 -->
        <van-col :span="16" class="goods-info">
          <div class="van-ellipsis goods-title">{{item.goods_name}}</div>
          <!-- 标题下面内容部分 -->
          <van-row type="flex" justify="space-between" align="center">
            <van-col :span="14">
              <div class="price">
                <span>￥{{item.selling_price}}</span>
                <s>￥{{item.original_price}}</s>
              </div>
              <van-progress color="#f2826a" stroke-width="7" pivot-text :percentage="70" />
              <div class="purchased">{{item.stock_num}}</div>
            </van-col>
            <van-col :span="10" class="buy-btn">
              <van-button round size="mini" color="#f06c7a">立即抢购</van-button>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goodsList: []
      }
    },
    methods: {
      goDetail(id) {
        this.$router.push(`goodsDetails/${id}`)
      }
    },
    created() {
      this.$api.homeData.banner().then(({
        data
      }) => {
        this.goodsList = data.goods_info
      })
    }
  }
</script>

<style lang="scss" scoped>
  .popular {
    padding: 0 10px;

    .title {
      display: flex;
      align-items: center;

      span {
        font-size: 16px;
        font-weight: bold;
      }

      .van-icon {
        font-size: 18px;
        margin-right: 5px;
      }
    }

    .tips {
      color: #bbb;

      span {
        padding: 0 3px;
      }
    }

    .hot-goods {
      margin-top: 10px;

      .hot-goods-item {
        border-radius: 10px;

        .goods-info {
          padding: 8px;

          .goods-title {
            font-size: 14px;
            margin-bottom: 10px;
            color: #000;
          }

          .price {
            display: flex;
            align-items: center;

            span {
              font-size: 20px;
              color: #f06c7a;
              margin-bottom: 5px;
              margin-right: 10px;
            }

            s {
              color: #bbb;
            }
          }

          .purchased {
            color: #bbb;
            margin-top: 5px;
          }

          .buy-btn {
            text-align: center;

            .van-button--mini {
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
</style>
