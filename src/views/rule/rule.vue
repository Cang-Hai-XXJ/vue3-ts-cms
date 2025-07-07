<template>
  <div class="rule">
    <h2>算力规则说明</h2>
    <h4 class="title">1. 什么是算力？</h4>
    <div class="content">
      算力是用户在使用我们平台时的重要权益，可通过多种方式获取。
      每位用户每天都可以获得免费算力，开通会员后可获得更多算力奖励。算力可用于平台内的各项服务和功能使用。
    </div>
    <h4 class="title">2. 算力的类别、获取方式和有效期</h4>
    <div class="content">
      <el-descriptions
        direction="vertical"
        column="4"
        border
        style="width: 1000px"
      >
        <el-descriptions-item
          :rowspan="2"
          :width="180"
          label="算力类别"
          align="center"
          >赠送算力
        </el-descriptions-item>
        <el-descriptions-item label="获取方式" :width="240" align="center"
          >登录平台</el-descriptions-item
        >

        <el-descriptions-item label="有效期" align="center" :width="240"
          >当日 24:00 清零</el-descriptions-item
        >
        <el-descriptions-item label="数量" align="center"
          >每日 100 算力</el-descriptions-item
        >
        <el-descriptions-item align="center"
          >邀请新用户注册登录</el-descriptions-item
        >
        <el-descriptions-item align="center">有效期XX月</el-descriptions-item>
        <el-descriptions-item align="center">赠送100 算力</el-descriptions-item>
        <el-descriptions-item :rowspan="3" :width="140" align="center"
          >充值算力
        </el-descriptions-item>
        <el-descriptions-item :rowspan="3" :width="140" align="center"
          >充值获得
        </el-descriptions-item>
        <el-descriptions-item :rowspan="3" :width="140" align="center"
          >有效期XX月
        </el-descriptions-item>
        <el-descriptions-item align="center"
          >1000算力-¥39.9</el-descriptions-item
        >
        <el-descriptions-item align="center"
          >1500算力-¥XXX</el-descriptions-item
        >
        <el-descriptions-item align="center"
          >1500算力-¥XXX11</el-descriptions-item
        >
      </el-descriptions>
    </div>
    <h4 class="title">3. 算力消耗顺序</h4>
    <div class="content">
      按照算力有效期，优先消耗即将过期的算力。默认消耗顺序依次为：每日免费算力、邀请算力、充值算力
    </div>
    <h4 class="title">4. 算力充值说明</h4>
    <div class="content">
      用户可以通过充值获得算力，如您选择通过人民币充值获得算力，需要提示您算力充值服务为收费服务，
      算力为虚拟商品采用先收费后服务的方式。请您仔细阅读以下内容，并在理解和同意的
      前提下继续使用本产品：算力充值成功后，将不支持退款或兑换为人民币。
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  const list = document.querySelectorAll('tbody tr')
  Array.from(list).forEach((item, index) => {
    if ([3, 5, 7, 9].includes(index + 1)) {
      console.log(item)

      item.innerHTML = ''
    }
  })
})
</script>

<style lang="less" scoped>
.rule {
  padding: 0 30px;
  h2 {
    text-align: center;
    margin-bottom: 50px;
    margin-top: 40px;
  }
  .content {
    margin-bottom: 40px;
    font-size: 16px;
    color: #374151;
  }
}
</style>
