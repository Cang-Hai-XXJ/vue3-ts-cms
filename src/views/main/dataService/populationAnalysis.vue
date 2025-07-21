<template>
  <div class="batch page-bg pd_20">
    <el-tabs class="demo-tabs">
      <el-tab-pane>
        <template #label>
          <myBreadcrumb :breadcrumbs="breadcrumbs"></myBreadcrumb>
        </template>
        <template v-if="isShowBreadcrumbs">
          <el-table
            :data="tableData"
            style="width: 100%"
            class="subscribeTable"
            row-key="keyword"
            :preserve-expanded-content="false"
          >
            <el-table-column type="expand">
              <template #default="props">
                <div class="box">
                  <div class="top">
                    <div class="left">阈值设置</div>
                    <div class="right">
                      <div
                        class="btn_clear"
                        @click="clearConfigs(props.row.configs)"
                      >
                        <img src="@/assets/img/清空.png" alt="" />
                        清空数据
                      </div>
                    </div>
                  </div>
                  <div
                    class="center"
                    v-for="(item, index) in props.row.configs"
                    :key="index"
                  >
                    <div class="center-item">
                      <div class="type">
                        <el-select v-model="item.type" style="width: 80px">
                          <el-option
                            v-for="item in typeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                        <el-select
                          v-model="item.typeValue"
                          style="width: 100px; margin-left: 10px"
                        >
                          <el-option
                            v-for="i in getOptions(item.type)"
                            :key="i.value"
                            :label="i.label"
                            :value="i.value"
                          />
                        </el-select>
                      </div>
                      <div class="max">
                        <span>最大值</span>
                        <el-input-number
                          v-model="item.maxValue"
                          :min="item.minValue"
                          :max="1000"
                          :step="1"
                        />
                      </div>
                      <div class="min">
                        <span>最小值</span>
                        <el-input-number
                          v-model="item.minValue"
                          :min="1"
                          :max="item.maxValue"
                          :step="1"
                        />
                      </div>
                      <div class="btns">
                        <div
                          class="add"
                          @click="addConfig(props.row.configs, item.type)"
                        >
                          添加
                        </div>
                        <div
                          class="delete"
                          @click="deleteConfig(props.row.configs, index)"
                        >
                          删除
                        </div>
                      </div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                  <div class="footer" @click="addConfigs(props.row.configs)">
                    <img src="@/assets/img/添加指标.png" alt="" />
                    <div>添加阈值指标</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column type="selection" width="55" />
            <el-table-column label="关键词" property="keyword" width="180">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <span style="font-size: 18px; font-weight: bold">{{
                    scope.row.keyword
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column property="country" label="国家" />
            <el-table-column property="date" label="时间" />
            <el-table-column label="推送频次">
              <template #default="scope">
                <el-select
                  v-model="scope.row.frequencyNum"
                  placeholder="Select"
                  style="width: 100px"
                >
                  <el-option
                    v-for="item in frequencyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="订阅周期">
              <template #default="scope">
                <el-select
                  v-model="scope.row.period"
                  placeholder="Select"
                  style="width: 100px"
                >
                  <el-option
                    v-for="item in periodOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="推送方式" width="400">
              <template #default="scope">
                <div class="flex-center">
                  <el-select
                    v-model="scope.row.pushType"
                    placeholder="Select"
                    style="width: 100px"
                  >
                    <el-option
                      v-for="item in pushTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <template v-if="scope.row.pushType == 1">
                    <el-input
                      v-model="scope.row.phone"
                      style="width: 140px"
                      placeholder="Please input"
                    />
                  </template>
                  <template v-else-if="scope.row.pushType == 2">
                    点击放大二维码
                    <img
                      style="width: 50px; height: 50px; cursor: pointer"
                      src="@/assets/img/qrCode.png"
                      alt=""
                      @click="scaleImg"
                    />
                  </template>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="footer-fixed">
            <span>消耗算力</span>
            <span class="num">200</span>
            <div class="btnD" @click="subscribePay">订阅</div>
          </div>
          <el-dialog
            v-model="isShowDialog"
            width="800"
            style="padding: 20px"
            class="dialog"
          >
            <template #header="{ titleId, titleClass }">
              <div class="my-header">
                <img src="@/assets/img/diamond.png" alt="" />
                <h4
                  :id="titleId"
                  :class="titleClass"
                  style="
                    text-align: left;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    margin-top: 0;
                    margin-bottom: 10px;
                  "
                >
                  购买套餐
                </h4>
              </div>
            </template>
            <el-steps class="steps" :active="1" align-center>
              <el-step title="确认订单" />
              <el-step title="在线支付" />
              <el-step title="完成订购" />
            </el-steps>
            <div class="my-body">
              <div class="box">
                <div class="box-title">选择套餐</div>
                <div class="box-content">
                  <div
                    class="content-box"
                    :class="{ active: item?.isActive }"
                    v-for="(item, index) in payList"
                    :key="index"
                    @click="selectBox(item, payList)"
                  >
                    <span>{{ item.name }}</span>
                    <span>¥{{ item.price }}<span>/月</span></span>
                    <span>{{ item.value }} 算力</span>
                  </div>
                </div>
              </div>
              <div class="box">
                <div class="box-title">订单详情</div>
                <div class="box-content">
                  <div class="order-box">
                    <div class="order-box-top">
                      <img src="@/assets/img/detail.png" alt="" />
                      <div class="user">
                        <div class="name">果果汤</div>
                        <div class="id">ID: 32973087</div>
                      </div>
                    </div>
                    <div class="order-box-bottom">
                      <div>
                        <span>服务开始时间</span>
                        <span>{{ currDate }}</span>
                      </div>
                      <div>
                        <span>服务结束时间</span>
                        <span>{{ endDate }}</span>
                      </div>
                      <div>
                        <span>订单金额</span>
                        <span>¥{{ currPrice }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="desc">
                    套餐说明：
                    <li>订购后，每月获得 {{ currCP }} 算力</li>
                  </div>
                  <div class="protocol">
                    我已完全阅读并同意
                    <a href="#">《服务使用须知》</a>
                  </div>
                  <div class="btn">立即支付</div>
                </div>
              </div>
            </div>
          </el-dialog>
        </template>

        <template v-else>
          <section class="search">
            <SearchCompare
              v-model="formInline"
              @submit="submit"
              @subscribe="subscribe"
              date
              :maxLength="5"
            ></SearchCompare>
          </section>
          <div v-if="loaded" class="chart-box">
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
          <empty v-else></empty>
        </template>
      </el-tab-pane>
      <el-tab-pane v-if="isShowSM" label="订阅管理" name="second"
        >订阅管理</el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { useStoreWithModules } from '@/store'
import * as echarts from 'echarts'
import Chart from './cpns/chart.vue'
import SearchCompare from './cpns/searchCompare.vue'
import myBreadcrumb from '@/base-ui/breadcrumb'
import { pathMap2BreadcrumbForDataService } from '@/utils/map-menus'
import { dataforseoTrendsDemographyLive } from '@/service/request/dataService'
import empty from './cpns/empty.vue'
import { useRoute } from 'vue-router'
interface IData {
  keywords: string[]
  seType: string
  searchVolume: number
}
const chartData = ref<IData>()
const loaded = ref(false)
const formInline = ref({
  region: '',
  keywords: [],
  type: '',
  dateFrom: '',
  dateTo: '',
  dateRange: []
})
//面包削
const breadcrumbs = computed(() => {
  const menus = useStoreWithModules().state.login.menus.find(
    (item) => item.id == 12
  )?.children
  const path = useRoute().path

  return menus?.length
    ? pathMap2BreadcrumbForDataService(menus, path, isShowBreadcrumbs.value)
    : []
})
// 订阅
const isShowSM = ref(false)
const isShowBreadcrumbs = ref(false)
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

//订阅关键词
interface config {
  type: number
  typeValue: number
  maxValue: number
  minValue: number
}
const subscribe = () => {
  isShowBreadcrumbs.value = true
}
const addConfigs = (item: config[]) => {
  item.push({
    type: 1,
    typeValue: 1,
    maxValue: 1000,
    minValue: 1
  })
}
const addConfig = (item: config[], type: number) => {
  item.push({
    type: type,
    typeValue: 1,
    maxValue: 1000,
    minValue: 1
  })
}
const deleteConfig = (item: config[], index: number) => {
  item.splice(index, 1)
}
const clearConfigs = (item: config[]) => {
  item.splice(0, item.length)
}
const tableData = reactive([
  {
    keyword: '儿童',
    country: '美国',
    date: '3天',
    frequencyNum: 1,
    period: 1,
    pushType: 1,
    phone: '15542345678',
    configs: [
      {
        type: 1,
        typeValue: 1,
        maxValue: 1111,
        minValue: 111
      },
      {
        type: 2,
        typeValue: 2,
        maxValue: 1111,
        minValue: 111
      }
    ]
  },
  {
    keyword: '女装',
    country: '中国',
    date: '31天',
    frequencyNum: 1,
    period: 1,
    pushType: 2,
    configs: []
  }
])
const frequencyOptions = [
  {
    value: 1,
    label: '24小时'
  }
]
const periodOptions = [
  {
    value: 1,
    label: '7天'
  }
]
const pushTypeOptions = [
  {
    value: 1,
    label: '手机号'
  },
  {
    value: 2,
    label: '公众号'
  }
]

//订阅关键词阈值设置
const getOptions = (key: number) => {
  if (key == 1) {
    return ageOptions
  } else if (key == 2) {
    return sexOptions
  } else {
    return []
  }
}
const typeOptions = [
  {
    value: 1,
    label: '年龄'
  },
  {
    value: 2,
    label: '性别'
  }
]
const ageOptions = [
  {
    value: 1,
    label: '18-24'
  },
  {
    value: 2,
    label: '0-18'
  }
]
const sexOptions = [
  {
    value: 1,
    label: '男'
  },
  {
    value: 2,
    label: '女'
  }
]
const scaleImg = () => {
  alert(1)
}
const isShowDialog = ref(false)
const subscribePay = () => {
  isShowDialog.value = true
}
const selectBox = (item: any, arr: { isActive: boolean }[]) => {
  arr.forEach((element: { isActive: boolean }) => {
    element.isActive = false
  })
  currPrice.value = item.price
  currCP.value = item.value
  item.isActive = true
}
import dayjs from 'dayjs'

const currDate = dayjs().format('YYYY-MM-DD')
const endDate = dayjs().add(1, 'month').format('YYYY-MM-DD')
const payList = reactive([
  {
    name: '体验版',
    price: '39',
    value: '1000',
    isActive: true
  },
  {
    name: '基础版',
    price: '139',
    value: '3000',
    isActive: false
  },
  {
    name: '专家版',
    price: '239',
    value: '11000',
    isActive: false
  }
])
const currPrice = ref(payList[0].price)
const currCP = ref(payList[0].value)

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
:deep(.el-tabs__nav-wrap:after) {
  height: 0px;
}
:deep(.el-tabs__header) {
  margin-bottom: 25px;
}

.dialog {
  .my-header {
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 38.95px;
      height: 32.75px;
    }
  }
  .steps {
    max-width: 600px;
  }
  .my-body {
    display: flex;
    gap: 0px;
    .box {
      flex: 1;
      margin-top: 20px;
      .box-title {
        font-size: 18px;
        color: #000000;
        margin: 10px 0;
        font-weight: 500;
        text-align: left;
      }
      .box-content {
        .active {
          border: 1px solid #6060ff !important;
          background: #f8f9ff;
        }
        .content-box {
          width: 350px;
          height: 152px;
          box-sizing: border-box;
          border: 1px solid #e5e5e5;
          display: flex;
          border-radius: 10px;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 20px;
          padding: 20px;
          margin: 15px 0;
          cursor: pointer;

          span {
            font-size: 16px;
            color: #6b7280;
          }
          & > span:nth-child(1) {
            font-size: 18px;
            color: #000000;
          }
          & > span:nth-child(2) {
            font-size: 24px;
            color: #000000;
            font-weight: bolder;
          }
        }

        .order-box {
          height: 246px;
          background: #f9fafb;
          padding: 20px;
          &-top {
            display: flex;
            gap: 10px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 20px;
            img {
              width: 40px;
              height: 40px;
              border-radius: 9999px;
            }
            .user {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: center;
              text-align: left;
              gap: 4px;
              .name {
                font-size: 16px;
                font-weight: bold;
                color: #000000;
              }
              .id {
                color: #6b7280;
                font-size: 14px;
              }
            }
          }
          &-bottom {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px 0;
            font-size: 16px;
            div {
              display: flex;
              align-items: center;
              justify-content: space-between;
              span {
                color: #6b7280;
              }
              span:last-child {
                color: #000000;
              }
            }
            div:last-child {
              margin-top: 20px;
              span:last-child {
                color: #000000;
                font-size: 24px;
              }
            }
          }
        }
        .desc {
          text-align: left;
          font-size: 14px;
          line-height: 2;
          color: #000000;
          margin: 40px 0;
          li {
            color: #6b7280;
          }
        }
        .protocol {
          text-align: left;
          font-size: 14px;
          margin: 40px 0;
          a {
            color: #4f46e5;
            cursor: pointer;
          }
        }
        .btn {
          display: flex;
          width: 300px;
          height: 48px;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
.empty {
  height: 100%;
}
.batch {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color) !important;
  gap: 20px;
  .demo-tabs {
    .footer-fixed {
      padding: 30px 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;
      span:first-child {
        font-size: 16px;
        font-weight: 600;
      }
      .num {
        font-size: 26px;
        font-weight: 600;
        color: #4040f2;
      }
      .btnD {
        height: 50px;
        width: 230px;
        background: #4040f2;
        color: #ffffff;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
  .subscribeTable {
    .flex-center {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 20px;
    }
    .box {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-height: 200px;
      padding: 15px;
      padding-left: 115px;
      gap: 10px;
      .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .left {
          font-size: 16px;
          color: #374151;
        }
        .btn_clear {
          width: 100px;
          height: 34px;
          color: #fd5d52;
          cursor: pointer;
          background: #fff4f3;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          gap: 4px;
          align-items: center;
          img {
            width: 14px;
            height: 14px;
          }
        }
      }
      .center {
        .center-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          span {
            margin-right: 10px;
          }
          .btns {
            float: right;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            div {
              width: 72px;
              height: 34px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 4px;
            }
            .add {
              background: #f5f5ff;
              color: #4040f2;
            }
            .delete {
              color: #fd5d52;
              background: #fff4f3;
              margin-left: 10px;
            }
          }
        }
      }
      .footer {
        width: 115px;
        height: 74px;
        border-radius: 5px;
        background: #f5f7fa;
        text-align: center;
        padding: 10px;
        cursor: pointer;
        margin-top: 20px;
        img {
          width: 27px;
          height: 28px;
          margin: 0 auto;
          margin-bottom: 5px;
        }
        div {
          font-size: 14px;
          color: #3d3d3d;
        }
      }
    }
  }
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
