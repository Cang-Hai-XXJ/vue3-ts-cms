<template>
  <div class="batch page-bg pd_20">
    <section class="search">
      <SearchCompare v-model="formInline" @submit="submit" deep></SearchCompare>
    </section>
    <section class="table">
      <div class="title"></div>
      <div class="content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            align="center"
            type="index"
            width="100"
            label="序号"
          />
          <el-table-column align="center" prop="keyword" label="关键词" />
          <el-table-column align="center" prop="searchVolume" label="搜索量" />
          <el-table-column align="center" prop="seType" label="搜索平台" />
        </el-table>
        <!-- <div class="pagination">
          <el-config-provider :locale="zhCn">
            <el-pagination
              v-model:current-page="currentPage4"
              v-model:page-size="pageSize4"
              :page-sizes="[10]"
              :size="size"
              :disabled="disabled"
              :background="background"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-config-provider>
        </div> -->
      </div>
    </section>
    <section class="chart">
      <div class="title">关键词搜索量</div>
      <div class="content">
        <Chart v-if="loaded" v-model.sync="opt"></Chart>
        <div v-else class="empty">暂无数据</div>
      </div>
    </section>
    <!-- <section class="chart">
      <div class="title">关键词搜索量</div>
      <div class="content">
        <Chart v-if="loaded" v-model.sync="opt1"></Chart>
        <div v-else class="empty">暂无数据</div>
      </div>
    </section> -->
  </div>
</template>

<script lang="ts" setup>
import { ComponentSize } from 'element-plus'
import { ref, reactive } from 'vue'
import SearchCompare from './cpns/searchCompare.vue'
import Chart from './cpns/chart.vue'
import { amazonRelatedKeywordsLive } from '@/service/request/dataService'
interface ItableData {
  keyword: string
  seType: string
  searchVolume: number
}
const tableData = ref<ItableData[]>()
const opt = reactive({
  color: ['#4040e9'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: tableData.value?.map((item) => item.keyword),
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '搜索量',
      type: 'bar',
      barWidth: '60%',
      data: tableData.value?.map((item) => item.searchVolume)
    }
  ]
})
const opt1 = reactive({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: tableData.value?.map((item) => item.keyword)
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
})
const loaded = ref(false)
const formInline = ref({
  region: 2840,
  language: 'en',
  keywords: ['computer', ' mouse'],
  deep: 1,
  seed: true,
  synonym: true
})
const submit = () => {
  loaded.value = false
  amazonRelatedKeywordsLive([
    {
      keyword: formInline.value.keywords.join(''),
      locationCode: formInline.value.region,
      languageCode: formInline.value.language,
      depth: formInline.value.deep,
      includeSeedKeyword: formInline.value.seed,
      ignoreSynonyms: formInline.value.synonym
    }
  ]).then((res) => {
    tableData.value = res.tasks[0].result[0].items.map((item) => {
      return {
        seType: item.keywordData.keywordInfo.seType,
        keyword: item.keywordData.keyword,
        searchVolume: item.keywordData.keywordInfo.searchVolume
      }
    })
    //图表
    opt.xAxis[0].data = tableData.value?.map((item) => item.keyword)
    opt.series[0].data = tableData.value?.map((item) => item.searchVolume)
    loaded.value = true
  })
}

// 分页
const currentPage4 = ref(4)
const pageSize4 = ref(10)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
// 分页文案
// 引入 ElConfigProvider 组件
import { ElConfigProvider } from 'element-plus'
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
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
