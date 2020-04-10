<template>
  <view class="course-container">
    <view
      v-for="item in courses"
      :key="item.id"
      class="course-item"
      @click="toCourseDetail(item.id)"
    >
      <image :src="item.icon" mode />
      <view class="title">{{item.title}}</view>
      <view class="subtitle">{{item.subtitle}}</view>
      <view class="level" v-if="item.level === 1">初级</view>
      <view class="level" v-else-if="item.level === 2">中级</view>
      <view class="level" v-else-if="item.level === 3">高级</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      default: []
    }
  },
  methods: {
    toCourseDetail(id) {
      uni.navigateTo({
        url: "/pages/course-detail/course-detail?id=" + id
      });
    }
  }
};
</script>

<style lang="less" scoped>
.course-container {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 32rpx;
}
.course-item {
  margin-left: 32rpx;
  margin-top: 32rpx;
  border-radius: 12rpx;
  background-color: white;
  width: 333rpx;
  height: 368rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  image {
    margin-top: 58rpx;
    width: 124rpx;
    height: 124rpx;
  }
  .title {
    margin-top: 28rpx;
    color: #333333;
    font-weight: bold;
    font-size: 32rpx;
  }
  .subtitle {
    color: #a8a8a8;
    font-size: 22rpx;
    margin-top: 12rpx;
  }
  .level {
    margin-top: 20rpx;
    color: #ffb37a;
    text-align: center;
    font-size: 24rpx;
    line-height: 32rpx;
    width: 92rpx;
    height: 32rpx;
    border: 2rpx solid rgba(255, 179, 122, 1);
    opacity: 1;
    border-radius: 16rpx;
  }
}
</style>