<template>
  <div class="generator-panel">
    <div class="left">
      <div class="title">选品大师</div>
      <div class="desc">
        <p>选品难题一扫而空</p>
        <p>精准数据助您赢在起点</p>
      </div>
      <div class="footer">
        <el-button
          type="primary"
          color="#4040F2"
          round
          size="large"
          @click="generate"
          >创建选品报告 &nbsp;<el-icon class="el-icon-Right"><Right /></el-icon
        ></el-button>
      </div>
    </div>
    <div class="right">
      <img class="image" src="~@/assets/img/report-bg.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
const generate = () => {
  router.push({
    name: 'generate'
  })
}
</script>

<style lang="less" scoped>
.generator-panel {
  width: 100%;
  height: 420px;
  background: linear-gradient(269deg, #d3e3ff 0%, #f3fbff 99%);
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
  .left {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 300px;
    text-align: start;
    height: 100%;
    gap: 20px;
    .title {
      font-size: 58px;
      color: var(--font-color);
      font-family: PingFangSCBold;
    }
    .desc {
      font-size: 24px;
      color: #787878;
      font-family: Montserrat;
    }
    .footer {
      font-size: 16px;
      color: #ffffff;
      font-family: PingFangSCBold;
    }
  }
  .right {
    .image {
      width: 400px;
      height: 400px;
      object-fit: cover;
    }
  }
}
</style>
