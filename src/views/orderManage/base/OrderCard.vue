<template>
  <div class="order-card">
    <van-panel :title="'订单号：'+ item[0].order_no" status="已完成" class="m-b-10 b-r-10" v-for="(item,index) in orderList"
      :key="index">
      <div class="content">
        <van-card class="bg-white" :num="goods.goods_count" :price="goods.sellind_price" desc="黑色/38码" :title="goods.goods_name"
          :thumb="goods.goods_cover_img" v-for="(goods,index) in item" :key="index" />
      </div>
      <div slot="footer" class="footer">
        <div class="info">
          <div class="total">共{{item.length}}件商品合计：￥{{totalPrice(item)}}</div>
          <div class="btn">
            <van-button plain size="mini" round>查看发票</van-button>
            <van-button plain size="mini" round type="danger">评价晒单</van-button>
            <van-button plain size="mini" round type="danger">再次购买</van-button>
          </div>
        </div>
      </div>
    </van-panel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderList: []
      }
    },
    mounted() {
      this.$api.orderData.orderList(this.$Cookies.get('userId')).then(({
        data
      }) => {
        this.orderList = data
      })
    },
    methods: {
      totalPrice(obj) {
        var price = 0
        for (var i = 0; i < obj.length; i++) {
          price += obj[i].selling_price * obj[i].goods_count
        }
        return price
      }
    }
  }
</script>

<style lang="scss" scoped>
  .order-card {
    padding: 10px;

    .content {
      background-color: #ffffff;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .info {
        .total {
          margin-bottom: 10px;
          text-align: right;
        }
      }
    }
  }
</style>
