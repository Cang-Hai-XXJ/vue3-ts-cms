<template>
  <div class="batch page-bg pd_20">
    <section class="search">
      <el-input
        v-model="input"
        style="width: 800px; height: 40px"
        placeholder="通过关键词、商品名称、商品ID或链接搜索您想要查询的商品"
        class="input-with-select"
        size="large"
      >
        <template #suffix>
          <el-button class="btn" size="large" @click="onSubmit"
            >搜索
          </el-button>
        </template>
      </el-input>
      <el-form :inline="true" :model="formInline" class="form-inline">
        <el-form-item label="国家/地区">
          <el-select
            v-model="formInline.region"
            clearable
            placeholder="国家"
            style="width: 100px"
          >
            <el-option label="上海111" value="shanghai" />
            <el-option label="北京" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="语言">
          <el-select
            v-model="formInline.language"
            clearable
            placeholder=""
            style="width: 100px"
          >
            <el-option label="上海" value="shanghai" />
            <el-option label="北京" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="关联深度">
          <el-select
            v-model="formInline.association"
            clearable
            placeholder=""
            style="width: 100px"
          >
            <el-option label="上海2222222" value="shanghai" />
            <el-option label="北京111111111111" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="包含种子关键词">
          <el-input
            v-model="formInline.keywords"
            placeholder="关键词"
            clearable
          />
        </el-form-item>
        <el-form-item label="是否忽略同义词">
          <el-radio-group v-model="formInline.synonym">
            <el-radio value="1">是</el-radio>
            <el-radio value="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
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
      <div class="content" id="chart"></div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ComponentSize } from 'element-plus'
import { computed, ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'

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
onMounted(() => {
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
  echarts.init(document.getElementById('chart')).setOption(opt)
  window.addEventListener('resize', () => {
    echarts.init(document.getElementById('chart')).resize()
  })
})
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
    height: 190px;
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
    height: 500px;
    .content {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
