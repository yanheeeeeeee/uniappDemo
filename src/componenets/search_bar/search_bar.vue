<template>
  <view class="searchBar">
    <icon class="searchBarIcon" type="search" color="#ff8d44" size="15"></icon>
    <view class="searchBarInput">
      <text>{{placeholder}}</text>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    placeholder: {
      type: String,
      default: "请输入搜索内容"
    }
  }
});
</script>

<style scoped>
/* components/search-bar/search-bar.wxss */
.searchBar {
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  margin-bottom: 8px;
}

.searchBarIcon {
  position: absolute;
  left: 8px;
  top: 7px;
}

.searchBarInput {
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  color: #999;
}
</style>