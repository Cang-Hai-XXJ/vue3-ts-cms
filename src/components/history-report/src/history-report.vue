<template>
  <div class="page">
    <section class="wait-generate">
      <div class="title">等待生成</div>
      <div class="content">
        <div class="content-box">
          <div class="content-box-top">
            <img src="~@/assets/img/Frame.png" alt="" />
            <div class="content-box-top-right">
              <div class="content-box-top-right-title">商品名商品名.pdf</div>
              <div class="content-box-top-right-desc">创建时间：2025-02-24</div>
            </div>
          </div>
          <div class="content-box-bottom">报告生成中，请等待...</div>
        </div>
        <div class="content-box">
          <div class="content-box-top">
            <img src="~@/assets/img/Frame.png" alt="" />
            <div class="content-box-top-right">
              <div class="content-box-top-right-title">商品名商品名.pdf</div>
              <div class="content-box-top-right-desc">创建时间：2025-02-24</div>
            </div>
          </div>
          <div class="content-box-bottom">报告生成中，请等待...</div>
        </div>
      </div>
    </section>
    <section class="history">
      <div class="title">历史报告</div>
      <div class="content">
        <div class="content-box">
          <div class="content-box-top">
            <img src="~@/assets/img/Frame.png" alt="" />
            <div class="content-box-top-right">
              <div class="content-box-top-right-title">商品名商品名.pdf</div>
              <div class="content-box-top-right-desc">创建时间：2025-02-24</div>
            </div>
            <div class="operation-box">
              <el-button round
                ><el-icon><View /></el-icon>&nbsp;&nbsp;预览</el-button
              >
              <el-button round
                ><el-icon><Download /></el-icon>&nbsp;&nbsp;下载</el-button
              >
            </div>
          </div>
        </div>
        <div class="content-box">
          <div class="content-box-top">
            <img src="~@/assets/img/Frame.png" alt="" />
            <div class="content-box-top-right">
              <div class="content-box-top-right-title">商品名商品名.pdf</div>
              <div class="content-box-top-right-desc">创建时间：2025-02-24</div>
            </div>
            <div class="operation-box">
              <el-button round
                ><el-icon><View /></el-icon>&nbsp;&nbsp;预览</el-button
              >
              <el-button round
                ><el-icon><Download /></el-icon>&nbsp;&nbsp;下载</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped lang="less">
.page {
  width: 100%;
  padding: 36px;
  text-align: start;
}

section {
  margin: 40px 0;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.content {
  position: relative;
  display: flex;
  width: 100%;
  gap: 15px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.content-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 49%;
  height: 130px;
  padding: 20px;
  border: 1px solid #eaecee;
  border-radius: 8px;
}

.history .content-box {
  width: 100%;
  height: auto;
  padding: 10px 20px;
}

.operation-box {
  position: absolute;
  right: 20px;
  display: flex;
  .el-button {
    width: 100px;
    height: 36px;
    border: 1px solid #fff;
    font-size: 14px;
    &:nth-child(1) {
      color: #0f5b1d;
      background: #e6fbd9;
    }
    &:nth-child(2) {
      color: #0256ff;
      background: #d8d8fe;
    }
  }
}

.content-box-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  gap: 15px;
}

.content-box-top img {
  width: 45px;
  background-color: rgba(0, 0, 0, 0.1);
}

.content-box-top-right {
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.content-box-top-right-title {
  font-size: 18px;
}

.content-box-top-right-desc {
  font-size: 14px;
}

.content-box-bottom {
  font-size: 14px;
  color: #3333d1;
}
</style>
