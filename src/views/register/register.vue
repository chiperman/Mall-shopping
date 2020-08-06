<template>
  <div class="login">
    <!-- 登录页logo -->
    <div class="logo">
      <img style="background: aqua;" src="https://www.easyicon.net/api/resizeApi.php?id=1207631&size=128" />
    </div>
    <!-- 登录from表单校验 用户名的方式注册-->
    <div class="user-form" v-if="!isPhoneLogin">
      <van-field maxlength="11" clearable type="text" v-model="userName" placeholder="请输入用户名" />
      <van-field type="password" clearable v-model="password" @keyup.enter="onRegister" placeholder="请输入密码" />
      <van-field type="password" clearable v-model="repassword" @keyup.enter="onRegister" placeholder="请再次输入密码" />
    </div>
    <!-- 手机号验证码方式注册 -->
    <div class="user-form" v-else>
      <van-field maxlength="11" clearable type="tel" v-model="phone" placeholder="请输入手机号码" />
      <van-field maxlength="6" v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" round size="mini" style="width:2rem" type="primary" @click="VerifyCodeCountdown">{{validateBtn}}</van-button>
      </van-field>
    </div>
    <div class="login-btn">
      <van-button :loading="isLoading" @click="onRegister()" loading-text="注册中..." color="#fd7792" round block
        :disabled="isDisabled" type="default">注册</van-button>
    </div>
    <div class="login-tips">
      <span @click="onPhoneLogin">{{isPhoneLogin?'手机号注册':'用户名注册'}}</span>
    </div>
    <div class="protocol">
      <span>注册即代表您同意</span>
      <span class="user-protocol">
        &lt;&lt;
        <a href="#">商城用户协议</a>&gt;&gt;
      </span>
    </div>
    <!-- 退出注册页面 -->
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
        repassword: "", // 再次密码
        phone: "", // 手机号
        sms: "", // 验证码
        isPhoneLogin: false, // 是否为手机号码登录
        isLoading: false, // 登录loading
        validateBtn: "发送验证码",
        isRegisSuccess: true
      };
    },
    created() {},
    methods: {
      //  返回上一页
      handleBack() {
        this.$router.go(-1);
      },
      //  处理注册
      onRegister() {
        if (this.password !== this.repassword) {
          this.$dialog.alert({
            message: "两次输入密码不一致!"
          }).then(() => {
            // on close
          });
          return
        }
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          if (this.userName && this.password) {
            this.$api.register.register(this.userName, this.password).then(({
              data
            }) => {
              console.log('注册')
              console.log(data.success)
              if (data.success === 0) {
                this.isRegisSuccess = false
                this.$dialog.alert({
                  message: '注册失败'
                }).then(() => {})
              }
            })
            if (!this.isRegisSuccess) {
              return
            }
            this.$router.push("/login");
            this.$notify({
              type: "success",
              message: "注册成功"
            });
          }
        }, 1000);
      },
      //  切换手机号注册
      onPhoneLogin() {
        this.isPhoneLogin = !this.isPhoneLogin;
        if (this.isPhoneLogin) {
          this.$toast("手机注册接口功能未开发");
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
      height: 140px;
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
