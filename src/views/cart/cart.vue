<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <van-sticky>
      <van-nav-bar title="购物车" @click-left="onClickLeft">
        <template slot="left">
          <van-icon name="arrow-left" size=".48rem" color="#000" />
        </template>
        <!-- 清空全部的商品订单 -->
        <template slot="right" v-if="hisGoodsOrder && this.cartInfoList.length">
          <van-icon name="delete" @click="onClearOrder" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 无商品订单时显示提示 -->
    <div class="no-has-goods-order" v-if="!hisGoodsOrder || !this.cartInfoList.length">
      <no-goods-order :tipsTxt="tipsTxt"></no-goods-order>
    </div>
    <!-- 有商品订单时显示 -->
    <div class="has-goods-order" v-else>
      <!-- 购物商品订单列表 -->
      <div class="card-goods-list" v-for="(item,index) in cartInfoList" :key="item.cart_item_id">
        <!-- 购物车商品列表 -->
        <van-swipe-cell>
          <div slot="default" class="order-item">
            <van-row type="flex" justify="space-between">
              <!-- 商品订单复选框 -->
              <van-col span="3" class="d-flex-c">
                <van-checkbox v-model="item.isChecked" @click='selectSingle(item,index)'></van-checkbox>
              </van-col>
              <!-- 订单商品图片 -->
              <van-col span="6">
                <van-image :src="item.goods_cover_img" fit="contain" lazy-load show-loading class="order-img" />
              </van-col>
              <!-- 订单商品详细信息 -->
              <van-col span="15" class="goods-info">
                <!-- 商品标题 -->
                <div class="goods-title">{{item.name}}</div>
                <!-- 商品tag -->
                <div class="goods-tag">
                  <span>440ml;10件，套装</span>
                  <van-icon name="arrow-down" />
                </div>
                <!-- 商品价格与数量 -->
                <div class="goods-price-num">
                  <div class="price">￥{{item.selling_price}}</div>
                  <div class="num">
                    <van-stepper integer button-size="24px" v-model="item.goods_count" />
                  </div>
                </div>
              </van-col>
            </van-row>
          </div>
          <template slot="right">
            <van-button @click="handleCollection(item.goods_id)" square color="#f6da63" text="收藏" />
            <van-button @click="handleLookSimilar" square color="#eb8242" text="看相似" />
            <van-button @click="handleDelete(item.cart_item_id)" square color="#da2d2d" text="删除" />
          </template>
        </van-swipe-cell>
      </div>
      <!-- 提交订单 -->
      <van-submit-bar :loading="isLoading" safe-area-inset-bottom :price="totalPrice" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="allChecked" @click="handleAllChecked">全选</van-checkbox>
        <span slot="tip">
          你的收货地址不支持同城送,
          <span>修改地址</span>
        </span>
      </van-submit-bar>
    </div>
    <!-- 顶部导航 -->
    <MenuBar></MenuBar>
  </div>
</template>
<script>
  import MenuBar from "../../components/MenuBar";
  import NoGoodsOrder from "./base/NoGoodsOrder";
  export default {
    components: {
      MenuBar,
      NoGoodsOrder
    },
    data() {
      return {
        tipsTxt: "去登录",
        allChecked: false, //  订单全选
        hisGoodsOrder: false, //  是否有商品订单
        isLoading: false, //  提交订单按钮提交loading状态
        result: [], //  店铺 全选
        allShops: 0, //   被选中的商店数量
        cartInfoList: []
      };
    },
    created() {
      const TOKEN = this.$Cookies.get("TOKEN");
      TOKEN ? (this.hisGoodsOrder = true) : (this.tipsTxt = "去登录");
      this.$api.cartData.cartData(this.$Cookies.get('userId')).then(({
        data
      }) => {
        for (var i = 0; i < data.shopping_cart.length; i++) {
          data.shopping_cart[i].isChecked = false
          this.cartInfoList.push(data.shopping_cart[i])
        }
      })
    },
    computed: {
      totalPrice: function() {
        var totalPrice = 0
        for (var i = 0; i < this.cartInfoList.length; i++) {
          if (this.cartInfoList[i].isChecked) {
            totalPrice += this.cartInfoList[i].goods_count * this.cartInfoList[i].selling_price
          }
        }
        return totalPrice * 100
      }
    },
    methods: {
      //   提交订单跳转
      onSubmit() {
        if (this.totalPrice === 0) {
          this.$dialog.alert({
            message: '还没有选择商品'
          })
          return
        }
        this.isLoading = true;
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        setTimeout(() => {
          this.isLoading = false;
          this.cartInfoList = this.cartInfoList.filter((item) => {
            return (item.isChecked === true)
          })
          this.$router.push({
            name: 'submitOrder',
            params: {
              TotalPrice: parseFloat(this.totalPrice / 100).toFixed(2),
              infoList: this.cartInfoList
            }
          });
        }, 2000);
      },
      //   路由跳转
      onClickLeft() {
        this.$router.push("/");
      },
      //   商品订单滑动收藏事件
      handleCollection(goods_id) {
        this.$api.collectionData.editCollection(this.$Cookies.get('userId'), goods_id, true).then(({
          data
        }) => {
          console.log('editCollection')
          console.log(data.is_collection)
        })
        this.$toast.success("收藏成功");
      },
      //  删除商品订单
      handleDelete(id) {
        this.$dialog
          .confirm({
            message: "你确定要删除该商品订单吗？"
          })
          .then(() => {
            this.cartInfoList = this.cartInfoList.filter((item) => {
              return (item.cart_item_id !== id)
            })
            this.$api.cartData.delCartGoods(this.$Cookies.get('userId'), id).then(({
              data
            }) => {
              console.log('delCartGoods')
              console.log(data.success)
            })
          })
          .catch(() => {
            //    on cancel
          });
      },
      //  清空全部订单
      onClearOrder() {
        this.$dialog
          .confirm({
            message: "你确定清空商品订单吗？"
          })
          .then(() => {
            this.cartInfoList = [];
            this.tipsTxt = "去逛逛看";
          })
          .catch(() => {
            //   on cancel
          });
      },
      //   看相似
      handleLookSimilar() {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
      },
      //   店铺选中
      checkShop(item, index) {
        this.cartInfoList[index].productList.forEach(proItem => {
          proItem.isSelected = !proItem.isSelected;
        });
      },
      //   全选
      handleAllChecked(e) {
        for (var i = 0; i < this.cartInfoList.length; i++) {
          if (!this.allChecked) {
            this.cartInfoList[i].isChecked = false
          } else {
            this.cartInfoList[i].isChecked = true
          }
        }
      },
      //   商品单选
      selectSingle(itemId, index) {
        // if (!this.cartInfoList[index].isChecked) {
        //   this.cartInfoList[index].isChecked = false
        // } else {
        //   this.cartInfoList[index].isChecked = true
        // }
      }
    },
    watch: {
      cartInfoList(newValue) {
        const isLogin = localStorage.getItem("isLogin");
        if (!newValue.length && isLogin) {
          this.tipsTxt = "去逛逛看";
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .cart {
    padding-bottom: 80px;

    .van-submit-bar__bar {
      padding-left: 10px;
    }

    .has-goods-order {
      padding: 10px;

      .swiper-right {
        display: flex;
      }

      .card-goods-list {
        background-color: #ffffff;
        padding-right: 10px;
        border-radius: 5px;
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;

        .store {
          padding: 10px;

          .van-col {
            margin-right: 5px;
          }
        }

        .order-item {
          margin-top: 10px;

          .d-flex-c {
            display: flex;
            justify-content: center;
          }

          .goods-info {
            padding-left: 10px;

            .goods-title {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            .goods-tag {
              height: 15px;
              border-radius: 15px;
              width: 150px;
              background-color: #dddddd;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 10px;

              span {
                font-size: 8px;
              }
            }

            .goods-price-num {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 20px;

              .price {
                color: #f60;
                font-size: 20px;
              }
            }
          }
        }
      }
    }

    .van-button {
      height: inherit;
    }
  }
</style>
