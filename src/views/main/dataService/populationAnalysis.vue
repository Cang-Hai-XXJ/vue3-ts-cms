<template>
  <div class="batch page-bg pd_20">
    <section class="search">
      <SearchCompare
        v-model="formInline"
        @submit="submit"
        :language="false"
        keyWordsType
        date
        :maxLength="5"
      ></SearchCompare>
    </section>
    <div class="chart-box">
      <section class="chart">
        <div class="title">年龄分布</div>
        <div class="content">
          <Chart v-if="loaded" v-model="option"></Chart>
          <div v-else class="empty">暂无数据</div>
        </div>
      </section>
      <section class="chart">
        <div class="title">性别分布</div>
        <div class="content">
          <Chart v-if="loaded" v-model="option1"></Chart>
          <div v-else class="empty">暂无数据</div>
        </div>
      </section>
      <section class="chart">
        <div class="title">性别比较</div>
        <div class="content flex_gap_20">
          <section v-if="loaded">
            <Chart v-model="option2male"></Chart>
          </section>
          <section v-if="loaded">
            <Chart v-model="option2female"></Chart>
          </section>
          <div v-else class="empty">暂无数据</div>
        </div>
      </section>
      <section class="chart">
        <div class="title">年龄比较</div>
        <div class="content">
          <Chart v-if="loaded" v-model="opt"></Chart>
          <div v-else class="empty">暂无数据</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
import Chart from './cpns/chart.vue'
import SearchCompare from './cpns/searchCompare.vue'
import { dataforseoTrendsDemographyLive } from '@/service/request/dataService'

interface IData {
  keywords: string[]
  seType: string
  searchVolume: number
}
const chartData = ref<IData>()
const loaded = ref(false)
const formInline = ref({
  region: 2840,
  keywords: ['computer', ' mouse'],
  type: 'web',
  dateFrom: '',
  dateTo: '',
  dateRange: []
})
const submit = () => {
  loaded.value = false
  dataforseoTrendsDemographyLive([
    {
      keywords: formInline.value.keywords,
      locationCode: formInline.value.region,
      // languageCode: formInline.value.language,
      type: formInline.value.type,
      dateFrom: formInline.value.dateRange[0],
      dateTo: formInline.value.dateRange[1]
      // timeRange: formInline.value.dateRange.join(' ')
    }
  ]).then((res) => {
    const keywords = res.tasks[0].result[0].items[0].keywords
    const demography = res.tasks[0].result[0].items[0].demography
    const demographyComparison =
      res.tasks[0].result[0].items[0].demographyComparison
    //图表
    option.value.dataset.dimensions =
      option.value.dataset.dimensions.concat(keywords)
    option.value.dataset.source = demography.age.reduce((acc, cur) => {
      option.value.series.push({ type: 'bar' })
      opt.value.series.push({ type: 'bar' })
      return cur.values.map((item, idx) => {
        return {
          ageRange: item.type,
          [cur.keyword]: item.value,
          ...acc[idx]
        }
      })
    }, [] as any)

    opt.value.dataset.dimensions = opt.value.dataset.dimensions.concat(keywords)
    opt.value.dataset.source = Object.keys(demographyComparison.age).map(
      (key) => {
        return {
          ageRange: key,
          ...demographyComparison.age[key].reduce(
            (acc: any, it: any, i: any) => {
              return {
                [keywords[i]]: it,
                ...acc
              }
            },
            {}
          )
        }
      }
    )

    const arr = demography.gender.map((item) => {
      const female = {
        name: item.keyword,
        value:
          item.values[item.values.findIndex((i) => i.type === 'female')].value
      }
      const male = {
        name: item.keyword,
        value:
          item.values[item.values.findIndex((i) => i.type === 'male')].value
      }

      return {
        female,
        male
      }
    })

    option2male.value.series[0].data = arr.map((item) => item.male)
    option2female.value.series[0].data = arr.map((item) => item.female)

    loaded.value = true
  })
}

//图表
const option = ref({
  legend: {},
  tooltip: {},
  dataset: {
    dimensions: ['ageRange'],
    source: [] as any
  },
  xAxis: { type: 'category' },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [] as any
})
const opt = ref({
  legend: {},
  tooltip: {},
  dataset: {
    dimensions: ['ageRange'],
    source: [] as any
  },
  yAxis: { type: 'category' },
  xAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [] as any
})

// TODO
const option1 = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
}
const option2male = ref({
  title: {
    text: '男性分布',
    left: 'center',
    bottom: '16%'
  },

  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '男性分布',
      type: 'pie',
      radius: '50%',
      data: [] as any,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
const option2female = ref({
  title: {
    text: '女性分布',
    left: 'center',
    bottom: '16%'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '女性分布',
      type: 'pie',
      radius: '50%',
      data: [] as any,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
</script>

<style scoped lang="less">
.empty {
  height: 100%;
}
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
      margin-bottom: 20px;
    }
  }

  .chart-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    section {
      width: calc(50% - 10px);
    }
  }
  .chart {
    text-align: left;
  }
}
.flex_gap_20 {
  display: flex;
  gap: 20px;
  section {
    padding: 0;
    border: none;
  }
}
</style>
