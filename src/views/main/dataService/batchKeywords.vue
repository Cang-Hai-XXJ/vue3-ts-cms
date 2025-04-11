<template>
  <div class="batch page-bg pd_20">
    <section class="search">
      <Search v-model="formInline"></Search>
    </section>
    <section class="table">
      <div class="title">XXXX</div>
      <div class="content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align="center" prop="index" label="序号" />
          <el-table-column align="center" prop="keywords" label="关键词" />
          <el-table-column align="center" prop="num" label="搜索量" />
          <el-table-column align="center" prop="date" label="搜索时间" />
        </el-table>
        <div class="pagination">
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
        </div>
      </div>
    </section>
    <section class="chart">
      <div class="title">关键词搜索量</div>
      <div class="content">
        <Chart v-model="opt"></Chart>
      </div>
    </section>
    <section class="chart">
      <div class="title">关键词搜索量</div>
      <div class="content">
        <Chart v-model="option"></Chart>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ComponentSize } from 'element-plus'
import { computed, ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
import Search from './cpns/search.vue'
import Chart from './cpns/chart.vue'
import SearchCompare from './cpns/searchCompare.vue'

const tableData = [
  {
    index: '#1',
    date: '2016-05-03',
    keywords: 'Tom',
    num: 'No. 189, Grove St, Los Angeles'
  },
  {
    index: '#1',
    date: '2016-05-03',
    keywords: 'Tom',
    num: 'No. 189, Grove St, Los Angeles'
  },
  {
    index: '#1',
    date: '2016-05-03',
    keywords: 'Tom',
    num: 'No. 189, Grove St, Los Angeles'
  },
  {
    index: '#1',
    date: '2016-05-02',
    keywords: 'Tom',
    num: 'No. 189, Grove St, Los Angeles'
  },
  {
    index: '#1',
    date: '2016-05-04',
    keywords: 'Tom',
    num: 'No. 189, Grove St, Los Angeles'
  },
  {
    index: '#1',
    date: '2016-05-01',
    keywords: 'Tom',
    num: 'No. 189, Grove St, Los Angeles'
  }
]
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

const input = ref('')
const formInline = reactive({
  association: '',
  region: '',
  language: '',
  resource: '',
  keywords: '',
  synonym: ''
})
const onSubmit = () => {
  console.log('submit!')
}

//图表
const option = {
  legend: {},
  tooltip: {},
  dataset: {
    dimensions: ['product', '2015', '2016', '2017'],
    source: [
      { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
      { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
      { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
      { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
}
const opt = {
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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
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
    height: 420px;
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
