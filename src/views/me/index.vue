<template>
  <div class='user-center'>
    <!-- 顶部导航 -->
    <van-nav-bar class='bgcolor' fixed left-arrow @click-left='onBack' @click-right='onClickRight'>
      <div slot='title' style="color: #FFFFFF;">个人中心</div>
      <div slot='right' class='nav-right'>
        <van-icon name='setting-o' color='#ffffff' size='20' />
      </div>
    </van-nav-bar>
    <!-- 用户头像，二维码信息 -->
    <user-info></user-info>
    <!-- 浏览足迹 ，店铺关注，收藏夹，喜欢 -->
    <user-history></user-history>
    <!-- 我的订单 -->
    <my-order></my-order>
    <!-- 我的资产 -->
    <my-assets></my-assets>
    <!-- 常用工具 -->
    <common-tools></common-tools>
    <!-- 底部导航 -->
    <menu-bar></menu-bar>
  </div>
</template>
<script>
  import MenuBar from '../../components/MenuBar.vue';
  import UserInfo from './base/UserInfo';
  import UserHistory from './base/UserHistory';
  import MyOrder from './base/MyOrder';
  import MyAssets from './base/MyAssets';
  import CommonTools from './base/CommonTools';
  export default {
    components: {
      MenuBar,
      UserInfo,
      UserHistory,
      MyOrder,
      MyAssets,
      CommonTools
    },
    data() {
      return {
        scrollTop: 0
      };
    },
    mounted() {
      window.addEventListener('scroll', this.scroll);
    },
    unmounted() {
      window.removeEventListener('scroll', this.scroll);
    },
    methods: {
      onBack() {
        this.$router.push('/');
      },
      onClickRight() {
        this.$router.push('/set');
      },
      scroll() {
        const top = document.documentElement.scrollTop || document.body.scrollTop;
        if (top > 60) {
          let opacity = top / 200;
          opacity = opacity > 1 ? 1 : opacity
          this.scrollTop = opacity
        } else {
          this.scrollTop = 0;
        }
      }
    }
  };
</script>
<style lang='scss' scoped>
  .user-center {
    padding-bottom: 50px;

    .van-hairline--bottom::after {
      border: 0;
    }

    .van-nav-bar__title {
      color: #fff;
    }

    .van-icon-arrow-left {
      color: #fff;
      font-size: 16px;
    }
  }
</style>
