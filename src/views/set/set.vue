<template>
  <div class='set'>
    <van-nav-bar class='cart-navbar' title='设置' left-arrow border sticky @click-left='onClickLeft'>
      <template slot='left'>
        <van-icon name='arrow-left' size='.48rem' color='#000' />
      </template>
    </van-nav-bar>
    <!-- 功能列表 -->
    <div class='list'>
      <van-cell size='large' is-link v-for='(item,index) in listData' :key='index' @click='setclick(item)'>
        <div slot='title' style='font-size: small;'>{{item.title}}</div>
        <div slot='default' style='font-size: smaller;'>{{item.value}}</div>
      </van-cell>
      <!-- 消息推送 -->
      <van-cell-group>
        <van-cell value='清除缓存' style='font-size: small;' @click='clearNews' />
        <van-cell center title="消息推送">
          <template #right-icon>
            <van-switch v-model="newschecked" size="24" @change='changNews'/>
          </template>
        </van-cell>
        <!-- <van-switch-cell v-model='newschecked' title='消息推送' @change='changNews' /> -->
      </van-cell-group>
    </div>
    <!-- 退出登录 -->
    <div class='quit-login'>
      <van-button type='danger' block @click='quitLogin'>退出登录</van-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'set',
    data() {
      return {
        newschecked: true,
        listData: [{
            title: '个人资料'
          },
          {
            title: '收货地址'
          },
          {
            title: '实名认证'
          },
          {
            title: '关于APP'
          },
          {
            title: '检查更新',
            value: '当前版本 1.0.0'
          }
        ]
      };
    },
    methods: {
      // 顶部导航返回上一页
      onClickLeft() {
        this.$router.push('/me')
      },
      setclick(item) {
        if (item.title === '检查更新') {
          this.$toast('已是最新版本了哦~');
        } else if (item.title === '收货地址') {
          this.$router.push('/addressmanage');
        }
      },
      clearNews() {
        this.$toast.loading({
          message: '清理缓存中...',
          forbidClick: true
        });
        let second = 1
        const timer = setInterval(() => {
          second--;
          if (!second) {
            clearInterval(timer);
            // 手动清除 Toast
            this.$toast.clear();
            this.$toast.success('已清理缓存')
          }
        }, 1000);
      },
      // 开启信息推送或者关闭
      changNews() {
        if (this.newschecked) {
          this.$toast('已开启信息推送');
        } else {
          this.$toast('已关闭信息推送');
        }
      },
      // 退出登录
      quitLogin() {
        this.$dialog.confirm({
            title: '确定要退出登录么?'
            // message: '弹窗内容'
          })
          .then(() => {
            this.$toast('退出成功');
            localStorage.setItem("isLogin", false);
            // localStorage.removeItem('isLogin')
            this.$Cookies.set('TOKEN', '')
            this.$router.push('/')
          })
          .catch(() => {
            // on cancel
          });
      }
    }
  };
</script>
<style lang='scss' scoped>
  .set {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #fff;

    .quit-login {
      padding: 20px;
    }
  }
</style>
