<template>
  <!-- 常用工具 -->
  <div class='common-tools'>
    <div class='tools-wrapper'>
      <!-- title -->
      <van-cell value='查看更多' is-link>
        <template slot='title'>
          <span class='custom-title'>常用工具</span>
        </template>
      </van-cell>
      <van-row type='flex' justify='space-between' align='center' class='tools-list'>
        <van-col span='6' v-for='(item,index) in toolsData' :key='index' class='item'>
          <van-icon size='1.5rem' :name='item.icon' />
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
        toolsData: [{
            name: '免费领好礼',
            icon: 'gift-o'
          },
          {
            name: '钱包',
            icon: 'paid'
          },
          {
            name: '领卷中心',
            icon: 'coupon-o'
          },
          {
            name: '客服服务',
            icon: 'service-o'
          },
          {
            name: '每日返现',
            icon: 'refund-o'
          },
          {
            name: '超值拼团',
            icon: 'bag-o'
          },
          {
            name: '闲置换钱',
            icon: 'balance-o'
          },
          {
            name: '开发票',
            icon: 'label-o'
          }
        ]
      }
    }
  };
</script>

<style lang='scss' scoped>
  .common-tools {
    padding: 10px;

    .tools-wrapper {
      border-radius: 5px;
      overflow: hidden;

      .tools-list {
        background-color: #fff;
        border-top: 1px solid #eee;
        padding: 10px 0;
        flex-wrap: wrap;
      }

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 0;

        span {
          margin-top: 5px;
        }
      }
    }
  }
</style>
