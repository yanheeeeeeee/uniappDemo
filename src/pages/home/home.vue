<template>
  <view class="home-container">
    <search_bar placeholder="请输入搜索课程"></search_bar>
    <!-- 1.0 轮播图 -->
    <swiper
      :indicator-dots="true"
      :circular="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
    >
      <swiper-item v-for="item in swipers" :key="item.id">
        <image :src="item.img_url" mode />
      </swiper-item>
    </swiper>
    <view class="tips">
      <text>推荐课程</text>
      <image src="/static/images/arrow@2x.png" mode />
    </view>
    <!-- 2.0 推荐课程 -->
    <scroll-view :scroll-x="true" class="course-container">
      <view class="course-item" v-for="item in courseList" :key="item.id">
        <image :src="item.icon" mode />
      </view>
    </scroll-view>
    <view class="tips">
      <text>热门视频</text>
      <image src="/static/images/arrow@2x.png" mode />
    </view>
    <!-- 3.0 热门视频 -->
    <view class="hot-video">
      <view class="video-item" v-for="item in videoList" :key="item.id">
        <image :src="item.cover_photo_url" mode />
        <view class="title">{{item.name}}</view>
        <view class="subtitle">{{item.view_count}}人次已观看</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import fetch from "../../utils/fetch";
import search_bar from "../../componenets/search_bar/search_bar";
export default Vue.extend({
  components: {
    search_bar
  },
  data() {
    return {
      swipers: [],
      courseList: [],
      videoList: []
    };
  },
  methods: {
    // 获取轮播图数据
    async getSwipers() {
      const res: any = await fetch({
        url: "home/swipers"
      });

      if (res.data.status === 0) {
        this.swipers = res.data.message;
      }
    },

    // 获取推荐课程
    async getCourse() {
      const res: any = await fetch({
        url: "home/course"
      });

      if (res.data.status === 0) {
        this.courseList = res.data.message;
      }
    },

    // 获取热门视频
    async getVideo() {
      const res: any = await fetch({
        url: "home/video"
      });

      if (res.data.status === 0) {
        this.videoList = res.data.message;
      }
    }
  },
  created() {
    this.getSwipers();
    this.getCourse();
    this.getVideo();
  }
});
</script>

<style lang="less" scoped>
.home-container {
  padding: 20rpx;
  background-color: #fff;
}
swiper {
  width: 100%;
  height: 342rpx;
  swiper-item {
    width: 100%;
    height: 100%;
  }
  image {
    width: 100%;
    height: 100%;
  }
}
.tips {
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text {
    font-size: 36rpx;
    font-weight: 700;
    color: #212121;
  }
  image {
    width: 48rpx;
    height: 48rpx;
  }
}
.course-container {
  height: 170rpx;
  white-space: nowrap;
  .course-item {
    width: 296rpx;
    height: 168rpx;
    display: inline-block;
    margin-right: 32rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.hot-video {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .video-item {
    width: 340prx;
    image {
      width: 340rpx;
      height: 210rpx;
      border-radius: 12rpx;
    }
    .title {
      margin-top: 15rpx;
      color: #262626;
      font-size: 26rpx;
    }
    .subtitle {
      margin-top: 15rpx;
      margin-bottom: 15rpx;
      color: #959595;
      font-size: 18rpx;
    }
  }
}
</style>
