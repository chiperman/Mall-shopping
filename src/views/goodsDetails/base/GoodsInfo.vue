<template>
  <div class="goods-info">
    <van-row type="flex" justify="space-between" align="center">
      <van-col span="8">
        <div class="price">
          <em>￥</em>
          <span class="price-1">{{maxGroupPrice}}</span>
          <van-tag plain type="success" round>新品</van-tag>
        </div>
        <div class="original-price">
          <em>价格</em>
          <s>￥{{marketPrice}}.00</s>
        </div>
      </van-col>
      <van-col span="4" class="text-right" @click="onLike">
        <van-icon name="like" size="20px" :color='like_color' />
        <div>收藏</div>
      </van-col>
    </van-row>
    <!-- 商品价格 -->
    <div class="goods-title">{{goodsDesc}}</div>
    <!-- 公告提示 -->
    <div class="tips">此商品将于2019-06-28,10点结束闪购特卖，时尚美饰联合专场</div>
    <!--快递，月销量，发货地址  -->
    <van-row type="flex" justify="space-between" align="center" class="sales">
      <van-col span="8" class="text-left">
        快递：0.00
      </van-col>
      <van-col span="8" class="text-center">
        月销量2009
      </van-col>
      <van-col span="8" class="text-right">
        浙江杭州
      </van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        collect_list: [],
        like_color: '',
        islike: false
      }
    },
    props: {
      // 商品原价
      marketPrice: {
        type: Number,
        default: 999
      },
      // 商品现价
      maxGroupPrice: {
        type: Number,
        default: 88
      },
      // 商品标题
      goodsDesc: {
        type: String,
        default: ''
      },
      goodsId: {
        type: String,
        default: ''
      }
    },
    methods: {
      onLike() {
        if (this.islike) {
          this.like_color = 'blue'
          this.islike = false
          this.$toast.success("取消收藏")
          this.$api.collectionData.editCollection(this.$Cookies.get('userId'), this.$props.goodsId, false).then(({
            data
          }) => {
            console.log('editCollection')
            console.log(data.is_collection)
          })
        } else {
          this.like_color = 'red'
          this.islike = true
          this.$toast.success("收藏成功")
          this.$api.collectionData.editCollection(this.$Cookies.get('userId'), this.$props.goodsId, true).then(({
            data
          }) => {
            console.log('editCollection')
            console.log(data.is_collection)
          })
        }
      }
    },
    created() {
      this.$api.collectionData.getCollectionList(this.$Cookies.get('userId')).then(({
        data
      }) => {
        this.collect_list = data.collect_Info
        console.log(this.$Cookies.get('userId'))
      })
      if (this.collect_list.length < 1) {
        this.like_color = 'blue'
        this.islike = false
      }
      for (let i = 0; i < this.collect_list.length; i++) {
        if (this.collect_list[i].goods_id === this.$props.goodsId) {
          if (!this.collect_list[i].is_deleted) {
            this.like_color = 'red'
            this.islike = true
            break
          } else {
            this.like_color = 'blue'
            this.islike = false
            break
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .goods-info {
    padding: 0 10px;
    background-color: #fff;
    padding-bottom: 10px;

    .price {
      color: red;

      em {
        font-size: 14px;
      }

      .price-1 {
        font-size: 22px;
        font-weight: bold;
        margin-right: 5px;
      }
    }

    .original-price {
      color: #999;
    }

    .goods-title {
      color: #151516;
      font-size: 15px;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .tips {
      color: #999;
      font-size: 12px;
      margin-top: 5px;
    }

    .sales {
      color: #999;
      margin-top: 15px;
    }
  }
</style>
