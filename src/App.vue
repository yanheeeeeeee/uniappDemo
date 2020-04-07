<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  mpType: "app",
  onLaunch() {
    console.log("App Launch");
    if (uni.getStorageSync("my_token")) {
      uni.reLaunch({
        url: "/pages/home/home"
      });
    }
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  }
});
</script>

<style>
/*每个页面公共css */
</style>
