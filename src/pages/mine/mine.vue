<template>
  <view>
    <view class="bgBlock">
      <view class="avatar">
        <image :src="userInfo.avatar" alt />
      </view>
      <view class="nickname">
        <text>{{userInfo.nickname}}</text>
      </view>
    </view>
    <view class="infoTab">
      <view class="left">
        <view class="tips">{{userInfo.study_hour}}</view>
        <view class="smalTips">累计学习小时</view>
      </view>
      <view class="middle">
        <view class="tips">{{userInfo.follow_count}}</view>
        <view class="smalTips">我的关注</view>
      </view>
      <view class="right">
        <view class="tips">{{userInfo.course_count}}</view>
        <view class="smalTips">我的课程</view>
      </view>
    </view>

    <view class="cells">
      <view class="cell">
        <view>学习历史</view>
        <img src="/static/images/arrow@2x.png" alt />
      </view>
      <view class="cell">
        <view>消息提醒</view>
        <img src="/static/images/arrow@2x.png" alt />
      </view>
      <view @click="clearCache" class="cell">
        <view>清除缓存</view>
        <img src="/static/images/arrow@2x.png" alt />
      </view>
      <view class="cell">
        <view>商务合作</view>
        <img src="/static/images/arrow@2x.png" alt />
      </view>
      <view @click="contact" class="cell">
        <view>在线客服</view>
        <img src="/static/images/arrow@2x.png" alt />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import fetch from "../../utils/fetch";
export default Vue.extend({
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    // 获取用户个人信息
    async getUserInfo() {
      let res: any = await fetch({ url: "my/info" });

      this.userInfo = res.data.message;
    },

    //清理缓存
    clearCache() {
      uni.showLoading({
        title: "正在清理缓存..."
      });
      setTimeout(() => {
        uni.hideLoading();
        uni.showToast({
          title: "缓存已清理!",
          icon: "success",
          duration: 1500
        });
      }, 2000);
    },

    // 联系客服
    contact() {
      uni.makePhoneCall({
        phoneNumber: "17573201630"
      });
    }
  },
  onLoad() {
    this.getUserInfo();
  }
});
</script>

<style lang="less" scoped>
.bgBlock {
  position: relative;
  width: 100%;
  height: 460rpx;
  background-color: #f18f4d;
  overflow: hidden;

  .avatar {
    width: 180rpx;
    height: 180rpx;
    border-radius: 50%;
    overflow: hidden;
    margin: 100rpx auto 40rpx;

    image {
      width: 180rpx;
      height: 180rpx;
    }
  }

  .nickname {
    text-align: center;
    font-size: 24px;
    color: #fff;
  }
}

.infoTab {
  display: flex;
  position: absolute;
  top: 420rpx;
  left: 50%;
  width: 92%;
  height: 180rpx;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;

  .left,
  .middle,
  .right {
    flex: 1;
  }

  .middle {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 30rpx;
      height: 62rpx;
      width: 3rpx;
      background-color: #ebebeb;
    }

    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50rpx;
      height: 62rpx;
      width: 3rpx;
      background-color: #ebebeb;
    }
  }

  view {
    text-align: center;
  }
  .tips {
    height: 110rpx;
    font-size: 24px;
    line-height: 130rpx;
  }
  .smalTips {
    font-size: 13px;
    font-weight: 700;
    color: #abaaa9;
  }
}

.cells {
  position: absolute;
  top: 630rpx;
  left: 50%;
  width: 92%;
  height: 600rpx;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 30rpx;

  .cell {
    height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f8f8f8;
    padding: 0rpx 20rpx;
    view {
      font-size: 30rpx;
      color: #333333;
    }
    img {
      width: 48rpx;
      height: 48rpx;
    }
  }
}
</style>