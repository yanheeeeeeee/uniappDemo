<template>
  <view class="container">
    <view v-if="!isPlay" class="playImg" @click="playVideo">
      <image :src="courseDetail.course.cover_image_url" alt />
      <view class="play">
        <image src="/static/images/play@2x.png" mode />
        <text>{{courseDetail.course.title}}</text>
      </view>
    </view>
    <view v-else class="video">
      <video :src="courseDetail.course.course_video_url" controls autoplay="true"></video>
    </view>
    <view class="introduction">
      <view class="title-price">
        <text>{{courseDetail.course.title}}</text>
        <text>￥{{courseDetail.course.price}}</text>
      </view>
      <view class="introduce">{{courseDetail.course.introduction}}</view>
      <view class="star">
        <text>{{courseDetail.course.study_count}}人在学</text>
      </view>
      <view class="study-share">
        <image src="/static/images/start_study@2x.png" />
        <view class="share-button" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" >
import Vue from "vue";
import fetch from "../../utils/fetch";
export default Vue.extend({
  data() {
    return {
      id: NaN,
      courseDetail: {},
      isPlay: false
    };
  },
  methods: {
    // 获取课程详情
    async getCourseDetail() {
      let res: any = await fetch({
        url: "course/" + this.id
      });

      this.courseDetail = res.data.message;
    },

    // 播放视频
    playVideo() {
      this.isPlay = true;
    }
  },
  onLoad(options: any) {
    this.id = options.id;
    this.getCourseDetail();
  }
});
</script>

<style lang="less" scoped>
.container {
  .playImg {
    position: relative;
    width: 750rpx;
    height: 430rpx;
    border-radius: 16rpx;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    image {
      width: 750rpx;
      height: 430rpx;
    }

    .play {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;

      image {
        width: 164rpx;
        height: 164rpx;
      }
      text {
        margin-top: 10rpx;
        color: #e9e9e9;
        font-size: 30rpx;
      }
    }
  }
  .video {
    width: 750rpx;
    height: 430rpx;
    border-radius: 16rpx;
    margin: 0 auto;
    overflow: hidden;

    video {
      width: 750rpx;
      height: 430rpx;
    }
  }

  .introduction {
    z-index: 3;
    position: absolute;
    margin-top: 0rpx;
    border-radius: 16px 16px 0px 0px;
    left: 0;
    right: 0;
    height: 452rpx;
    background-color: #ffffff;
    padding: 20rpx 30rpx;
    .title-price {
      margin-top: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text:nth-child(1) {
        font-size: 24px;
        color: #343434;
        font-weight: Bold;
      }
      text:nth-child(2) {
        font-size: 22px;
        color: #ee3939;
      }
    }
    .introduce {
      color: #818181;
      font-size: 12px;
      margin-top: 100rpx;
    }
    .star {
      display: flex;
      margin-top: 20rpx;
      text {
        height: 50rpx;
        line-height: 50rpx;
        margin-left: 20rpx;
        font-size: 12px;
        color: #fe8e38;
      }
    }
    .study-share {
      margin-top: 42rpx;
      margin-bottom: 52rpx;
      image:nth-child(1) {
        width: 568rpx;
        height: 92rpx;
      }
      .share-button {
        border: none;
        width: 92rpx;
        height: 92rpx;
        background-color: #fff;
        border-radius: 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        float: right;
        background-image: url(../../static/images/share@2x.png);
        background-repeat: no-repeat;
        background-size: 34rpx 34rpx;
        background-position: 30rpx 30rpx;
      }
    }
  }
}
</style>