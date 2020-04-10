<template>
  <view>
    <courseList :courses="courseList"></courseList>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import fetch from "../../utils/fetch";
import courseList from "../../componenets/courseList/courseList";
export default Vue.extend({
  components: {
    courseList
  },
  data() {
    return {
      courseList: []
    };  
  },
  methods: {
    async getCourseList() {
      let res: any = await fetch({
        url: "course/list"
      });

      this.courseList = res.data.message;
    }
  },
  onLoad() {
    this.getCourseList();
  }
});
</script>

<style>
</style>