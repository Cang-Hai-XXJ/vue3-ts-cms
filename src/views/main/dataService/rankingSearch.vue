<template>
  <div class="batch page-bg pd_20">
    <section class="search">
      <SearchCompare
        v-model="formInline"
        @submit="submit"
        :date="false"
      ></SearchCompare>
    </section>

    <section class="chart">
      <div class="title">ASIN付款量</div>
      <div class="content">
        <Chart v-if="loaded" v-model.sync="option"></Chart>
        <div v-else class="empty">暂无数据</div>
      </div>
    </section>
    <section class="chart">
      <div class="title">ASIN搜索量</div>
      <div class="content">
        <Chart v-if="loaded" v-model.sync="option1"></Chart>
        <div v-else class="empty">暂无数据</div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ComponentSize } from 'element-plus'
import { ref, reactive } from 'vue'
import SearchCompare from './cpns/searchCompare.vue'
import Chart from './cpns/chart.vue'
import { amazonProductRankOverviewLive } from '@/service/request/dataService'
interface ItableData {
  keyword: string
  seType: string
  searchVolume: number
}
//图表
const option = ref({
  title: {
    subtext: ''
  },
  legend: {},
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['pos1', 'pos2_3', 'pos4_10', 'pos11_100']
  },
  yAxis: {},
  series: [] as any
})
const option1 = ref({
  title: {
    subtext: ''
  },
  legend: {},
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['pos1', 'pos2_3', 'pos4_10', 'pos11_100']
  },
  yAxis: {},
  series: [] as any
})
const loaded = ref(false)

const formInline = ref({
  region: '',
  language: '',
  keywords: []
})
const submit = () => {
  loaded.value = false
  amazonProductRankOverviewLive([
    {
      asins: formInline.value.keywords,
      locationCode: formInline.value.region,
      languageCode: formInline.value.language
    }
  ]).then((res) => {
    //图表
    option.value.title.subtext = ''
    option1.value.title.subtext = ''

    option.value.series = res.tasks[0].result[0].items.map((item) => {
      const { pos1, pos23, pos410, pos11100 } = item.metrics.amazonPaid
      option.value.title.subtext += `${item.asin}付款总量${item.metrics.amazonPaid.searchVolume}\n`

      return {
        type: 'bar',
        name: item.asin,
        data: [pos1, pos23, pos410, pos11100]
      }
    })

    option1.value.series = res.tasks[0].result[0].items.map((item) => {
      const { pos1, pos23, pos410, pos11100 } = item.metrics.amazonSerp
      option1.value.title.subtext += `${item.asin}搜索总量${item.metrics.amazonPaid.searchVolume}\n`

      return {
        type: 'bar',
        name: item.asin,
        data: [pos1, pos23, pos410, pos11100]
      }
    })

    loaded.value = true
  })
}
</script>

<style scoped lang="less">
.batch {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color) !important;
  gap: 20px;
  section {
    width: 100%;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    background-color: #fff;
    padding: 20px;
    .title {
      font-size: 18px;
      color: #000000;
    }
  }
  .search {
    .btn {
      width: 90px !important;
      margin-right: -15px;
      height: 40px;
    }
    .form-inline {
      width: 600px;
      margin-top: 35px;
      text-align: left;
    }
  }
  .table {
    text-align: left;
    // height: 420px;
    .title {
      margin-bottom: 10px;
    }
    .pagination {
      margin-top: 30px;
    }
  }
  .chart {
    text-align: left;
  }
}
</style>
