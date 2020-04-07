<template>
  <div class="phone-login-container">
    <p class="phone-validate">手机号验证</p>
    <p class="subtitle">用于即使获取课程最新信息</p>
    <div class="content">
      <input v-model="phone" class="phone" placeholder="请输入您的手机号" type="number" />
      <div
        @click="getVcode"
        class="get_vcode"
        :style="{color: isCountDown ? '#ccc' : 'black'}"
      >{{tips}}</div>
      <input class="vcode" v-model="vcode" placeholder="请输入验证码" type="number" />
    </div>
    <div class="phone-login" @click="toLogin">
      <img src="/static/images/phone_login@2x.png" alt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import fetch from "../../utils/fetch";
export default Vue.extend({
  data() {
    return {
      tips: "获取验证码",
      phone: "",
      vcode: "",
      count: 60,
      isCountDown: false,
      timerId: NaN
    };
  },
  methods: {
    async getVcode() {
      // 验证是否在倒计时状态
      if (this.isCountDown) return;

      // 验证手机号是否合法
      const reg = /^1[3456789][0-9]{9}$/;
      if (!reg.test(this.phone)) {
        return uni.showToast({
          title: "手机号不合法!",
          icon: "none"
        });
      }

      this.isCountDown = true;
      this.tips = `${this.count}`;

      this.timerId = setInterval(() => {
        this.count--;
        this.tips = `${this.count}`;

        if (this.count === 0) {
          clearInterval(this.timerId);
          this.count = 60;
          this.isCountDown = false;
          this.tips = "获取验证码";
        }
      }, 1000);

      // 发送请求获取验证码
      const res: any = await fetch({
        url: "user/vcode",
        data: {
          phone: this.phone
        }
      });

      console.log(res);

      if (res.data.status === 0) {
        // 显示验证码
        uni.showToast({
          title: `${res.data.vcode}`, // title的属性值必须是string , 不能直接将res.data.vcode赋值给它, 因为它是一个数值类型
          icon: "none",
          duration: 1000
        });
      }
    },

    // 发送请求进行登录
    async toLogin() {
      let res: any = await fetch({
        url: "user/login",
        method: "POST",
        data: {
          phone: this.phone,
          vcode: this.vcode
        }
      });

      console.log(res);

      // 登录成功则
      if (res.data.status === 0) {
        // 显示提示消息
        uni.showToast({
          title: "登录成功!",
          icon: "none",
          duration: 1500
        });

        // 将返回的token到本地
        uni.setStorageSync({ my_token: res.data.token });

        // 跳转至首页
        uni.reLaunch({
          url: "/pages/home/home"
        });
      }
    }
  }
});
</script>

<style lang="less" scoped>
.phone-login-container {
  padding: 0rpx 68rpx;
  .phone-validate {
    margin-top: 100rpx;
    color: #393939;
    font-size: 43px;
  }
  .subtitle {
    margin-top: 20rpx;
    color: #a8a8a8;
    font-size: 30rpx;
  }
  .content {
    margin-top: 150rpx;
    height: 250rpx;
    position: relative;
    .phone {
      height: 100rpx;
      font-size: 15px;
      // background-color: green;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        background-color: #e9e9e9;
        left: 0;
        right: 0;
        height: 1px;
        bottom: 1px;
      }
    }
    .get_vcode {
      position: absolute;
      right: 0;
      top: 20rpx;
      width: 164rpx;
      height: 56rpx;
      text-align: center;
      line-height: 56rpx;
      font-size: 24rpx;
      color: #a8a8a8;
      border: 1px solid rgba(168, 168, 168, 1);
      border-radius: 20px;
      z-index: 2;
    }
    .vcode {
      margin-top: 30px;
      height: 100rpx;
      font-size: 15px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        background-color: #e9e9e9;
        left: 0;
        right: 0;
        height: 1px;
        bottom: 1px;
      }
    }
  }
  .phone-login {
    margin-top: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 568rpx;
      height: 98rpx;
    }
  }
}
</style>