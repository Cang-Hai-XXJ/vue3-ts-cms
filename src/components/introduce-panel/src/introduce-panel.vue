<template>
  <div class="introduce-panel">
    <div class="title">我们能为你做什么？</div>
    <div class="box-container">
      <div class="box">
        <div class="header">
          <img
            class="image"
            src="~@/assets/img/Customization@1x.png"
            alt="定制化报告服务"
          />
          <div class="name">定制化报告服务</div>
        </div>
        <div class="desc">
          <p>用户输入关键词、品类或市场信息，生成专属全面的选品报告。</p>
        </div>
      </div>
      <div class="box">
        <div class="header">
          <img
            class="image"
            src="~@/assets/img/Frame@1x.png"
            alt="定制化报告服务"
          />
          <div class="name">市场趋势分析</div>
        </div>
        <div class="desc">
          <p>提供实时市场趋势数据，帮助商家把握最新商机。</p>
        </div>
      </div>
      <div class="box">
        <div class="header">
          <img
            class="image"
            src="~@/assets/img/Vector@1x.png"
            alt="定制化报告服务"
          />
          <div class="name">竞争分析工具</div>
        </div>
        <div class="desc">
          <p>分析竞争对手的产品、定价、评价等数据。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const generate = () => {
  alert('generate')
}
</script>

<style lang="less" scoped>
.introduce-panel {
  width: 80%;
  height: 300px;
  background: #fff;
  padding: 0 36px;

  .title {
    font-family: Microsoft YaHei;
    font-size: 20px;
    font-weight: bold;
    color: #373f47;
    text-align: start;
    margin-bottom: 30px;
  }
  .box-container {
    display: flex;
    justify-content: space-between;
    text-align: start;
    .box {
      width: 210px;
      height: 100px;
      .header {
        display: flex;
        align-items: center;
        gap: 20px;
        .image {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
        .name {
          font-family: PingFang SC;
          font-size: 16px;
          font-weight: 600;
          line-height: 22px;
          letter-spacing: 0px;
          color: #373f47;
        }
      }

      .desc {
        color: #787878;
        font-family: Montserrat;
        font-size: 16px;
        font-weight: normal;
        line-height: 22px;
      }
    }
  }
}
</style>
