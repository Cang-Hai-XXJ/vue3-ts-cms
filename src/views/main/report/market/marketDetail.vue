<template>
  <div class="marketDetail">
    <section class="content">
      <div class="header">
        <div class="left">2025 中国新能源汽车行业深度研究报告</div>
        <div class="right">
          <el-button>
            <div class="center">
              <el-icon><Star /></el-icon>收藏报告
            </div>
          </el-button>
          <el-button class="btn">
            <div class="center">
              <el-icon><Download /></el-icon>下载报告
            </div>
          </el-button>
        </div>
      </div>
      <div class="desc">
        <div>发布时间：2025-01-15</div>
        <div>页数：128页</div>
        <div>格式：PDF</div>
        <div>大小：15.8MB</div>
        <div class="center">
          <el-icon><Star /></el-icon>2,456次收藏
        </div>
      </div>
      <img class="content" src="~img/detail.png" />
      <div class="footer">
        <div class="left">此报告还剩88页，如需下载请订阅。</div>
        <div class="right">
          <el-button class="btn"
            ><img src="~img/diamond-icon.png" alt="" />订阅服务</el-button
          >
        </div>
      </div>
    </section>
    <section class="aside">
      <div class="header">相关推荐</div>
      <div class="content">
        <div class="content-box" v-for="i of new Array(6)" :key="i">
          <div class="title" @click="turnToDetail(i)">
            2025
            中国新能源汽车行业深度中国新能源汽车行业中国新能源汽车行业深度深度
            研究报告
          </div>
          <div class="content">
            <div>2025-01-15</div>
            <div class="center">
              <el-icon><Star /></el-icon>2,456
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
const turnToDetail = (i: any) => {
  console.log(i)
}
</script>

<style scoped lang="less">
.marketDetail {
  display: flex;
  width: 100%;
  padding: 15px 40px;
  overflow: hidden;
  .center {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .content {
    width: 826px;
    height: 724px;
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    .header {
      width: 100%;
      height: 40px;
      margin: 20px 0;
      .left {
        float: left;
      }
      .right {
        display: flex;
        gap: 15px;
        float: right;
        .el-button {
          width: 110px;
          height: 40px;
          border-radius: 4px;
          font-size: 14px;
        }
      }
    }
    .desc {
      display: flex;
      gap: 30px;
      margin: 20px 0;
      color: #6b7280;
      font-size: 14px;
      font-weight: normal;

      div {
        font-size: 14px;
      }
    }
    .content {
      width: 100%;
      height: auto;
      width: 100%;
      object-fit: cover;
    }
    .footer {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 20px;
      padding-right: 10px;
      box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.3);
      border: 1px solid var(--border-color);
      .left {
        font-size: 14px;
        color: #6b7280;
        font-weight: normal;
      }
      .right {
        .btn {
          width: 110px;
          height: 40px;
          img {
            width: 16px;
            height: 16px;
            position: relative;
            right: 5px;
          }
        }
      }
    }
  }
  .aside {
    width: 300px;
    height: 100%;
    padding: 20px;
    text-align: start;
    .header {
      font-size: 18px;
      font-weight: bolder;
      margin-bottom: 50px;
    }
    .content {
      width: 100%;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 30px;
      .content-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: start;
        width: 100%;
        .title {
          width: 100%;
          height: 48px;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-clamp: 2;
          box-orient: vertical;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 1.4;
          color: #000;
          font-weight: normal;
          cursor: pointer;
        }
        .content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          font-size: 14px;
          padding: 0;
          div {
            color: #6b7280;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
