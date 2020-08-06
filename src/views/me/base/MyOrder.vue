<template>
  <!-- 我的订单 -->
  <div class='my-order'>
    <div class='order-wrapper'>
      <van-cell value='查看更多' is-link>
        <template slot='title'>
          <span class='custom-title'>我的订单</span>
        </template>
      </van-cell>
      <van-row type='flex' justify='space-between' align='center' class='order-list'>
        <van-col v-for='(item,index) in orderData' :key='index' class='item'>
          <van-icon size='1.5rem' :name="item.icon" :info='item.info' />
          <span style="font-size: smaller;">{{item.name}}</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderData: [{
            name: '待付款',
            icon: 'balance-pay',
            info: '1'
          },
          {
            name: '待发货',
            icon: 'send-gift-o',
            info: '3'
          },
          {
            name: '待收货',
            icon: 'logistics',
            info: '2'
          },
          {
            name: '评价',
            icon: 'comment-o',
            info: '1'
          },
          {
            name: '退款/售后',
            icon: 'after-sale',
            info: ''
          }
        ]
      }
    },
    methods: {
      // 路由跳转
      // onMore() {
      //   this.$router.push('/order')
      // }
    }
  };
</script>

<style lang='scss' scoped>
  .my-order {
    padding: 10px;

    .order-wrapper {
      border-radius: 5px;
      overflow: hidden;

      .order-list {
        background-color: #fff;
        border-top: 1px solid #eee;
        padding: 15px;

        .item {
          display: flex;
          flex-direction: column;
          align-items: center;

          span {
            margin-top: 5px;
          }
        }
      }
    }
  }
</style>
