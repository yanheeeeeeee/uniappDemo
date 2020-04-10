<template>
  <view class="mp-circle-container">
    <canvas :canvas-id="canvasId" style="width:{{width}}px;height:{{height}}px" class="mp-circle"></canvas>
  </view>
</template>

<script>
export default {
  props: {
    // 画布id
    canvasId: Number,
    // 画布的长
    width: { style: Number, default: 100 },
    // 画布的高
    height: { style: Number, default: 100 },
    // 线宽
    lineWidth: {
      style: Number,
      default: 5
    },
    // 进度条背景色
    backgroundColor: {
      type: String,
      default: "#f3f3f3"
    },
    // 已完成进度条背景色
    foregroundColor: {
      type: String,
      default: "#B4D66E"
    },
    // 进度值
    progress: {
      type: Number,
      value: 100
    }
  },
  data() {
    return {
      myforegroundColor: this.foregroundColor
    };
  },
  methods: {
    // 绘制进度条
    drawProgress() {
      if (this.progress <= 30) {
        this.myforegroundColor = "#ff0000";
      } else if (this.progress <= 60) {
        this.myforegroundColor = "#FF783B";
      } else {
        this.myforegroundColor = "#B4D66E";
      }

      // 1.拿到绘图上下文
      const ctx = uni.createCanvasContext(this.canvasId, this);

      // 2.画背景圆
      ctx.beginPath();
      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.backgroundColor;
      ctx.arc(
        this.width / 2,
        this.height / 2,
        this.width / 2 - this.lineWidth,
        0,
        2 * Math.PI
      );
      ctx.stroke();

      // 3.画进度
      ctx.beginPath();
      ctx.lineWidth = this.lineWidth;
      ctx.lineCap = "round";
      ctx.strokeStyle = this.myforegroundColor;
      const endAngle = (this.progress / 100) * 2 * Math.PI - Math.PI * 0.5;
      ctx.arc(
        this.width / 2,
        this.height / 2,
        this.width / 2 - this.lineWidth,
        -Math.PI * 0.5,
        endAngle
      );
      ctx.stroke();

      // 4.画文字
      ctx.beginPath();
      ctx.fillStyle = this.myforegroundColor;
      ctx.font = "12px Helvetica";
      if (this.progress >= 99) {
        ctx.fillText(
          this.progress + "%",
          this.width / 2 - 14,
          this.height / 2 + 6
        );
      } else {
        ctx.fillText(
          this.progress + "%",
          this.width / 2 - 10,
          this.height / 2 + 6
        );
      }

      // 5.draw()
      ctx.draw();
    }
  },
  mounted() {
    this.drawProgress();
  }
};
</script>

<style>
.mp-circle-container {
  position: relative;
}

.mp-circle {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
</style>