<template>
  <div class="batch page-bg pd_20">
    <section>
      <Search></Search>
    </section>
    <section class="chart">
      <div class="title">年龄分布</div>
      <div class="content">
        <Chart v-model="opt"></Chart>
      </div>
    </section>
    <section class="chart">
      <div class="title">性别分布</div>
      <div class="content">
        <Chart v-model="option1"></Chart>
      </div>
    </section>
    <section class="chart">
      <div class="title">XXX分布</div>
      <div class="content">
        <Chart v-model="option2"></Chart>
      </div>
    </section>
    <section class="chart">
      <div class="title">XXX分布</div>
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
const option2 = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
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
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
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
      margin-bottom: 20px;
    }
  }

  .chart {
    text-align: left;
  }
}
</style>
