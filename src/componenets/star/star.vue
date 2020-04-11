<template>
  <view>
    <!-- 空心星星 -->
    <view class="emptyStar">
      <image
        v-for="(item, index) in 5"
        :key="index"
        src="../../static/images/star_empty@2x.png"
        style="width:{{size}}px;height:{{size}}px"
      />

      <!-- 实心星星 -->
      <view class="fillStar">
        <image
          v-for="(item, index) in score"
          :key="index"
          src="../../static/images/star_fill@2x.png"
          style="width:{{size}}px;height:{{size}}px"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    score: { type: Number, default: 5 },
    size: { type: Number, default: 16 }
  },
  data() {
    return {
      myScore: this.score
    };
  }
});
</script>

<style scoped>
.emptyStar {
  position: relative;
  top: 6rpx;
  z-index: 1;
}
.fillStar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>