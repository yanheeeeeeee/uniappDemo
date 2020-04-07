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
      <input class="vcode" placeholder="请输入验证码" type="number" />
    </div>
    <div class="phone-login">
      <img src="/static/images/phone_login@2x.png" alt />
    </div>
  </div>
</template>

<script>
import fetch from "../../utils/fetch";
export default {
  data() {
    return {
      tips: "获取验证码",
      phone: "",
      vcode: "",
      isCountDown: false
    };
  },
  methods: {
    async getVcode() {
      // 验证手机号是否合法
      const reg = /^1[3456789][0-9]{9}$/;
      if (!reg.test(this.phone)) {
        return uni.showToast({
          title: "手机号不合法!",
          icon:"none"
        });
      }

      // 发送请求获取验证码
      let res = await fetch({
        url: "user/vcode",
        data: {
          phone: this.phone
        }
      });

      console.log(res);
    }
  }
};
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