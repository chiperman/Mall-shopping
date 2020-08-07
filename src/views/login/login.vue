<template>
  <div class="login">
    <!-- 登录页logo -->
    <div class="logo">
      <img style="background: aqua;" src="https://www.easyicon.net/api/resizeApi.php?id=1207631&size=128" />
    </div>
    <!-- 登录from表单校验 用户名的方式登录-->
    <div class="user-form" v-if="!isPhoneLogin">
      <van-field maxlength="11" clearable type="text" v-model="userName" placeholder="请输入用户名" />
      <van-field type="password" clearable v-model="password" @keyup.enter="onLogin" placeholder="请输入密码" />
    </div>
    <!-- 手机号验证码方式登录 -->
    <div class="user-form" v-else>
      <van-field maxlength="11" clearable type="tel" v-model="phone" placeholder="请输入手机号码" />
      <van-field maxlength="6" v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" round size="mini" style="width:2rem" type="primary" @click="VerifyCodeCountdown">{{validateBtn}}</van-button>
      </van-field>
    </div>
    <div class="login-btn">
      <van-button :loading="isLoading" @click="onLogin" loading-text="登录中..." color="#fd7792" round block :disabled="isDisabled"
        type="default">登录</van-button>
    </div>
    <div class="login-tips">
      <span @click="onPhoneLogin">{{isPhoneLogin?'手机号登录':'用户名登录'}}</span>
      <span>忘记密码</span>
    </div>
    <div class="login-tips" @click="toRegister()">
      <span>没有账号？点击注册</span>
    </div>
    <!-- 第三方登录 -->
    <van-divider>第三方登录</van-divider>
    <div class="otherlogin">
      <div class="weixin" @click="onClick">
        <van-icon size="20px" color="#fff" class-prefix="iconfont iconweixin2"></van-icon>
      </div>
      <div class="qq" @click="onClick">
        <van-icon size="20px" color="#fff" class-prefix="iconfont iconQQ"></van-icon>
      </div>
    </div>
    <div class="protocol">
      <span>注册即代表您同意</span>
      <span class="user-protocol">
        &lt;&lt;
        <a href="#">商城用户协议</a>&gt;&gt;
      </span>
    </div>
    <!-- 退出登录页面 -->
    <div class="cross-login" @click="handleBack">
      <van-icon size="16px" name="cross"></van-icon>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userName: "", // 用户名
        password: "", // 密码
        phone: "", // 手机号
        sms: "", // 验证码
        isLoading: false, // 登录loading
        isPhoneLogin: false, // 是否为手机号码登录
        validateBtn: "发送验证码",
        isLoginSuccess: true
      };
    },
    created() {
      this.TispLoginWay();
    },
    methods: {
      // 提示用户选择登录方式
      TispLoginWay() {},
      //  返回上一页
      handleBack() {
        this.$router.go(-1);
      },
      //  处理登录
      onLogin() {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          if (this.userName && this.password) {
            this.$api.login.login(this.userName, this.password).then(({
              data
            }) => {
              console.log('登录')
              console.log(data.success)
              this.$Cookies.set('userId', data.user_id, {
                expires: 7
              })
              this.userId = data.user_id
              if (data.success === 0) {
                this.isLoginSuccess = false
                this.$dialog.alert({
                  message: "账户名或密码错误!"
                }).then(() => {
                  // on close
                });
              }
            })
            if (!this.isLoginSuccess) {
              return
            }
            this.$Cookies.set("TOKEN", this.userName, {
              expires: 7
            });
            localStorage.setItem("isLogin", true);
            this.$router.push("/");
            this.$notify({
              type: "success",
              message: "登录成功"
            });
          }
        }, 1000);
      },
      //  切换手机号登录
      onPhoneLogin() {
        this.isPhoneLogin = !this.isPhoneLogin;
        if (this.isPhoneLogin) {
          this.$toast("手机登录接口功能未开发");
        }
      },
      // 验证码倒计时
      VerifyCodeCountdown() {
        this.$toast("发送成功");
        // 验证码倒计时
        let time = 60;
        const timer = setInterval(() => {
          if (time === 0) {
            clearInterval(timer);
            this.validateBtn = "发送验证码";
            this.disabled = false;
          } else {
            this.validateBtn = time + "秒后重试";
            this.disabled = true;
            time--;
          }
        }, 1000);
      },
      //  提示框
      onClick() {
        this.$toast("功能未开发");
      },
      toRegister() {
        this.$router.push('/register')
      }
    },
    computed: {
      isDisabled() {
        var flag = !this.password
        return !this.userName || flag;
      }
    }
  };
</script>

<style lang="scss">
  .login {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0 10%;
    background: linear-gradient(to bottom, #5aaafb 0%, #f06c7a 100%);

    .cross-login {
      position: absolute;
      top: 30px;
      left: 30px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .logo {
      display: flex;
      justify-content: center;
      margin-top: 100px;

      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }

    .van-divider {
      color: #fff;
    }

    .user-form {
      padding-top: 40px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .van-field {
        border-radius: 50px;
      }

      .van-field__label {
        font-size: 12px;
        width: 70px;
      }

      .van-field__control {
        font-size: 13px;
      }
    }

    .login-btn {
      margin-top: 30px;

      .van-button__text {
        color: #fff;
        font-size: 16px;
      }
    }

    .login-tips {
      padding: 10px;
      color: #fff;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
    }

    .otherlogin {
      padding: 20px;
      display: flex;
      justify-content: space-around;

      div {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }

      .weixin {
        background-color: #2ad19b;
      }

      .qq {
        background-color: #2baefc;
      }
    }

    .protocol {
      text-align: center;
      color: #fff;

      a {
        color: blue;
      }
    }
  }
</style>
