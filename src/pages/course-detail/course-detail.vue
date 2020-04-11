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
        <star :score="courseDetail.course.score"></star>
        <text>{{courseDetail.course.study_count}}人在学</text>
      </view>
      <view class="study-share">
        <image src="/static/images/start_study@2x.png" />
        <button open-type="share" class="share-button"></button>
      </view>
    </view>

    <!-- tabs -->
    <view class="tabs">
      <view class="tabHead">
        <view class="tabHeadItem" @click="currentIndex=1">
          <text :class="{active:currentIndex===1}">目录</text>
        </view>
        <view class="tabHeadItem" @click="currentIndex=2">
          <text :class="{active:currentIndex===2}">讲师介绍</text>
        </view>
        <view class="tabHeadItem" @click="currentIndex=3">
          <text :class="{active:currentIndex===3}">评价({{courseDetail.commentTotal}})</text>
        </view>
      </view>
      <view class="tabBody">
        <view class="videoList" v-if="currentIndex === 1">
          <view v-if="courseVideos==null" class="empty">
            <text>暂无课程视频哦~</text>
          </view>
          <view class="fill" v-else>
            <view v-for="(item, index) in courseVideos" :key="index">
              <text>{{index+1}}. {{item.name}}</text>
            </view>
          </view>
        </view>

        <view class="lecturer-container" v-else-if="currentIndex === 2">
          <view class="block">
            <view v-if="courseDetail.lecturer" class="info">
              <image :src="courseDetail.lecturer.avatar" alt />
              <view class="name-follow">
                <text>{{courseDetail.lecturer.name}}</text>
                <text>关注人数：{{courseDetail.lecturer.follow_count}}</text>
              </view>
              <text
                @click="followOrUnFollow(courseDetail.lecturer.is_follow,courseDetail.lecturer.id)"
                :class="[courseDetail.lecturer.is_follow === 1 ? 'follow' : 'unfollow']"
              >{{courseDetail.lecturer.is_follow === 1 ? '已关注' : '关注'}}</text>
            </view>
            <view v-if="courseDetail.lecturer" class="introduce">
              <text>{{courseDetail.lecturer.introduction}}</text>
            </view>
          </view>

          <view class="empty" v-if="!courseDetail.lecturer">
            <text>暂无讲师简介哦~</text>
          </view>
        </view>

        <view class="comment-container" v-else>
          <view class="comment-item" v-for="item in courseDetail.comments" :key="item.id">
            <view class="info">
              <image :src="item.avatar" alt />
              <view class="nickname-content">
                <view class="nickname">
                  <view style="margin-top:12rpx;">{{item.nickname}}</view>&nbsp;&nbsp;
                  <view style="margin-left:20rpx">
                    <star :score="item.score" />
                  </view>
                </view>
                <view>{{item.content}}</view>
              </view>
              <text class="time">{{item.comment_time}}</text>
            </view>
            <view class="star">
              <image
                :src="item.is_like == 1 ? '/static/images/like_normal@2x.png' : '/static/images/like_highlight@2x.png'"
                alt
              />
            </view>
          </view>
          <view class="empty" v-if="!courseDetail.lecturer">
            <text>暂无评论哦，请学习之后再评价~</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" >
import Vue from "vue";
import fetch from "../../utils/fetch";
import star from "@/componenets/star/star";
export default Vue.extend({
  components: {
    star
  },
  data() {
    return {
      id: NaN,
      courseDetail: {},
      isPlay: false,
      currentIndex: 1,
      courseVideos: []
    };
  },
  // 页面中分享的一个方法
  onShareAppMessage(obj) {
    console.log(obj);
    return {
      title: "牛逼的课程",
      // path: '/pages/my/index',
      imageUrl:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586498458221&di=df3226496f7162341b8d348bb41ad9a7&imgtype=0&src=http%3A%2F%2Fsh.yuloo.com%2Fd%2Ffile%2Fshaoer%2Fnews%2F2018-03-26%2F52f57bb361b3524d0ac60a70bccddb75.jpg"
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

    // 获取视频列表
    async getCourseVideoList() {
      let res: any = await fetch({
        url: "course/play/" + this.id
      });
      console.log(res);
      this.courseVideos = res.data.message.videos;
    },

    // 播放视频
    playVideo() {
      this.isPlay = true;
    }
  },
  onLoad(options: any) {
    this.id = options.id;
    this.getCourseDetail();
    this.getCourseVideoList();
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

  .tabs {
    position: relative;
    top: 540rpx;
    width: 750rpx;
    background-color: #fff;

    .tabHead {
      display: flex;
      height: 150rpx;
      border-bottom: 1px solid #eee;

      .tabHeadItem {
        flex: 1;
        height: 100%;
        text-align: center;

        text {
          display: inline-block;
          font-size: 14px;
          color: #aaaaaa;
          height: 100%;
          line-height: 150rpx;
        }

        .active {
          font-weight: 700;
          color: #333333;
          border-bottom: 3px solid #f18f41;
        }
      }
    }

    .tabBody {
      .empty {
        width: 750rpx;
        height: 500rpx;
        text-align: center;
        line-height: 500rpx;
        font-size: 14px;
        color: #ccc;
        background-color: #f9f9f9;
      }
      .videoList {
        .fill {
          padding: 30rpx;

          view {
            height: 120rpx;

            text {
              font-size: 16px;
              line-height: 120rpx;
              color: #333;
            }
          }
        }
      }

      .lecturer-container {
        .block {
          padding: 30rpx;
          .info {
            height: 200rpx;
            display: flex;
            align-items: center;
            .name-follow {
              margin-left: 30rpx;
              display: flex;
              flex-direction: column;
              flex: 1;
              text:nth-child(1) {
                font-size: 34rpx;
                color: #333333;
              }
              text:nth-child(2) {
                font-size: 28rpx;
                margin-top: 15rpx;
                color: #a8a8a8;
              }
            }
            image {
              margin-left: 12rpx;
              width: 120rpx;
              height: 120rpx;
            }
            .unfollow {
              width: 136rpx;
              height: 52rpx;
              line-height: 52rpx;
              text-align: center;
              border: 1px solid #a8a8a8;
              border-radius: 26rpx;
              color: #a8a8a8;
              font-size: 28rpx;
            }
            .follow {
              width: 136rpx;
              height: 52rpx;
              line-height: 52rpx;
              text-align: center;
              border: 1px solid #a8a8a8;
              border-radius: 26rpx;
              color: #fff;
              background-color: #a8a8a8;
              font-size: 28rpx;
            }
          }
          .introduce {
            background-color: #ffffff;
            text {
              margin-left: 12rpx;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 20px;
              color: rgba(168, 168, 168, 1);
              opacity: 1;
            }
          }
        }
      }

      .comment-item {
        background-color: #ffffff;
        padding: 30rpx;
        height: 180rpx;
        border-bottom: 2px solid #f1f1f1;
        .info {
          height: 120rpx;
          display: flex;
          align-items: center;
          image {
            margin-left: 6rpx;
            width: 96rpx;
            height: 96rpx;
            border-radius: 50%;
          }
          .nickname-content {
            flex: 1;
            margin-left: 30rpx;
            .nickname {
              color: #333333;
              font-size: 30rpx;
              font-weight: bold;
              align-items: center;
              display: flex;
              view {
                height: 100%;
                display: inline-block;
              }
            }
            view:nth-child(2) {
              margin-top: 16rpx;
              color: #a8a8a8;
              font-size: 12px;
            }
          }
          .time {
            color: #a8a8a8;
            font-size: 11px;
          }
        }
      }

      .star {
        image {
          margin-top: 30rpx;
          width: 44rpx;
          height: 44rpx;
          float: right;
          margin-right: 20rpx;
        }
        image:nth-child(0) {
          margin-right: 20rpx;
        }
      }
    }
  }
}
</style>