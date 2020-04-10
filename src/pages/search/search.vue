<template>
  <view class="search-container">
    <!-- 搜索框 -->
    <view class="search-head">
      <uniSearchBar
        radius="100"
        placeholder="请输入搜索内容"
        cancelButton="always"
        maxlength="100"
        @confirm="search"
        @cancel="cancel"
        bgcolor="#ff9a29"
      ></uniSearchBar>
    </view>
    <!-- 搜索结果列表 -->
    <view class="search-body">
      <view v-if="searchResults.length!==0">
        <courseList :courses="searchResults" />
      </view>
      <view class="empty" v-else>
        <text class="title">暂无内容哦~</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import fetch from "../../utils/fetch";
import courseList from "../../componenets/courseList/courseList";
import { uniSearchBar } from "@dcloudio/uni-ui";
export default {
  components: { uniSearchBar, courseList },
  data() {
    return {
      searchResults: []
    };
  },
  methods: {
    // 搜索事件
    async search(e: any) {
      console.log(e.value);
      const res: any = await fetch({
        url: "course/search",
        data: {
          name: e.value
        }
      });

      console.log(res);
      this.searchResults = res.data.message;
    },

    // 取消搜索事件
    cancel() {
      uni.navigateBack();
    }
  }
};
</script>

<style lang="less" scoped>
.search-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.search-body {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 32rpx;
  width: 100%;
  height: 100%;
}

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600rpx;
}

.empty .title {
  font-size: 14px;
  color: gray;
}
</style>
