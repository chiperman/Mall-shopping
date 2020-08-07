<template>
  <div class="submit-order">
    <!-- 顶部导航 -->
    <van-sticky>
      <van-nav-bar title="提交订单" left-arrow @click-left="onClickLeft">
        <template slot="left">
          <van-icon name="arrow-left" size=".48rem" color="#000" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 收货地址 -->
    <van-contact-card @click="onContactCard" :type="type" :name="editAddressInfo.name" :tel="editAddressInfo.tel"
      :add-text="editAddressInfo.address" />
    <!-- 商品信息 -->
    <van-panel title="商品信息">
      <div v-for="(item,index) in infoList" :key=index>
        <van-card :num="item.goods_count" :price="item.selling_price" desc="440ml;10件，套装" :title="item.goods_name"
          :thumb="item.goods_cover_img" />
      </div>
    </van-panel>
    <!-- 商品cell -->
    <van-cell title="商品总价" value-class="text-color" :value="'￥'+totalPrice" size="large" />
    <!-- 优惠卷 -->
    <goods-coupon></goods-coupon>
    <!-- 发票 -->
    <van-cell title="发票" is-link value-class="text-color-red" value="不开发票" size="large" />
    <!-- 运费 -->
    <van-cell title="运送配" value-class="text-color" value="￥0.00" size="large" />
    <!-- 订单备注留言 -->
    <van-cell-group>
      <van-field v-model="message" rows="1" autosize label="订单备注" type="textarea" placeholder="请输入留言" />
    </van-cell-group>
    <!-- 确认支付 -->
    <van-submit-bar safe-area-inset-bottom :price="totalPrice * 100" :loading='loading' button-text="提交订单" @submit="onSubmitPay" />
  </div>
</template>

<script>
  import GoodsCoupon from "./GoodsCoupon";
  import {
    mapState
  } from "vuex"
  export default {
    components: {
      GoodsCoupon
    },
    data() {
      return {
        type: "edit",
        message: "", // 下单留言信息
        loading: false,
        infoList: this.$route.params.infoList,
        totalPrice: this.$route.params.TotalPrice
      };
    },
    mounted() {
      // 判断是否有地址
      Object.keys(this.editAddressInfo).length ? this.type = "edit" : this.type = "add"
    },
    created() {},
    methods: {
      // 返回上一页
      onClickLeft() {
        this.$router.go(-1);
      },
      // 提交支付订单
      onSubmitPay() {
        const TOKEN = this.$Cookies.get("TOKEN");
        this.loading = true
        setTimeout(() => {
          TOKEN ? this.$router.push({
            name: 'orderPayment',
            params: {
              TotalPrice: this.totalPrice,
              infoList: this.infoList
            }
          }) : this.$router.push("/login")
        }, 1000)
      },
      // 点击联系人卡片
      onContactCard() {
        this.$router.push({
          name: 'addressmanage',
          params: {
            TotalPrice: this.totalPrice,
            infoList: this.infoList,
            isOrder: 'true'
          }
        })
      }
    },
    computed: {
      ...mapState(["editAddressInfo"])
    }
  };
</script>

<style lang="scss" scoped>
  .submit-order {
    padding-bottom: 50px;

    .text-color {
      color: #000;
    }

    .text-color-red {
      color: red;
    }
  }
</style>
