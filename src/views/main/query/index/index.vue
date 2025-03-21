<template>
  <div class="queryIndex">
    <div class="tabs">
      <div
        class="tab"
        :class="{ 'is-active': currTab === 1 }"
        @click="clickTab(1)"
      >
        关键词实时动态
      </div>
      <div
        class="tab"
        :class="{ 'is-active': currTab === 2 }"
        @click="clickTab(2)"
      >
        时下流行
      </div>
    </div>

    <div class="form-page" v-if="isForm && currTab === 1">
      <formPage @toggle="toggle"></formPage>
    </div>
    <div v-else class="query-page">
      <section v-show="currTab === 1" class="words">
        <div class="box" v-for="item of arr" :key="item">
          <div class="label">查询词组</div>
          <div class="content">{{ item }}</div>
        </div>
        <div class="box" @click="add">
          <div class="add">+ 添加对比</div>
        </div>
      </section>
      <section class="options">
        <div class="left">
          <el-select
            v-model="value"
            placeholder="Select"
            class="autoWidth"
            :suffix-icon="IconRank"
          >
            <template #prefix>
              {{ (options.find((item) => item.value === value) || {}).label }}
            </template>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="value1"
            placeholder="Select"
            class="autoWidth"
            :suffix-icon="IconRank"
          >
            <template #prefix>
              {{ (options1.find((item) => item.value === value) || {}).label }}
            </template>
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="right">
          <el-select
            v-model="value"
            placeholder="Select"
            class="autoWidth"
            :suffix-icon="IconRank"
          >
            <template #prefix>
              {{ (options.find((item) => item.value === value) || {}).label }}
            </template>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </section>
      <section v-show="currTab === 1" class="charts">
        <div class="box">
          <div class="header">
            <div class="left">
              热度随时间变化趋势
              <el-icon><QuestionFilled /></el-icon>
            </div>
            <div class="right cursor" @click="clickDownload">
              <el-icon><Download /></el-icon>
            </div>
          </div>
          <div class="charts-content" id="hortTime"></div>
        </div>
      </section>
      <section v-show="currTab === 1" class="charts">
        <div class="box">
          <div class="header">
            <div class="left">
              搜索热度（按都市圈）
              <el-icon><QuestionFilled /></el-icon>
            </div>
            <div class="right">
              <section class="options">
                <el-select
                  v-model="value"
                  class="autoWidth"
                  placeholder="Select"
                  :suffix-icon="IconFilter"
                >
                  <template #prefix>
                    {{
                      (options.find((item) => item.value === value) || {}).label
                    }}
                  </template>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </section>
              <el-icon class="cursor" @click="clickDownload"
                ><Download
              /></el-icon>
            </div>
          </div>
          <div class="charts-content" id="hortMap"></div>
        </div>
      </section>
      <section v-show="currTab === 1" class="sort">
        <div class="box">
          <div class="header">
            <div class="left">
              相关主题
              <el-icon><QuestionFilled /></el-icon>
            </div>
            <div class="right">
              <section class="options">
                <el-select
                  v-model="value"
                  class="autoWidth"
                  placeholder="Select"
                  :suffix-icon="IconFilter"
                >
                  <template #prefix>
                    {{
                      (options.find((item) => item.value === value) || {}).label
                    }}
                  </template>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </section>
              <el-icon class="cursor" @click="clickDownload"
                ><Download
              /></el-icon>
            </div>
          </div>
          <div class="sort-content">
            <div class="item" v-for="(v, k) of arrSort" :key="k">
              <div class="left">
                <span>{{ k + 1 }}</span> {{ v.label }}
              </div>
              <div class="right">
                {{ v.value }}
                <el-icon><MoreFilled /></el-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="header">
            <div class="left">
              相关查询
              <el-icon><QuestionFilled /></el-icon>
            </div>
            <div class="right">
              <section class="options">
                <el-select
                  v-model="value"
                  class="autoWidth"
                  placeholder="Select"
                  :suffix-icon="IconFilter"
                >
                  <template #prefix>
                    {{
                      (options.find((item) => item.value === value) || {}).label
                    }}
                  </template>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </section>
              <el-icon class="cursor" @click="clickDownload"
                ><Download
              /></el-icon>
            </div>
          </div>
          <div class="sort-content">
            <div class="item" v-for="(v, k) of arrSort1" :key="k">
              <div class="left">
                <span>{{ k + 1 }}</span> {{ v.label }}
              </div>
              <div class="right">
                {{ v.value }}
                <el-icon><MoreFilled /></el-icon>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section v-show="currTab === 2" class="table">
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          row-key="id"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :header-cell-style="{
            backgroundColor: '#FAFAFA',
            borderRadius: '15px 15px 0 0'
          }"
        >
          <el-table-column
            type="selection"
            :selectable="selectable"
            width="55"
          />
          <el-table-column
            label="趋势（上次更新时间 3月10日14:24）"
            min-width="280"
          >
            <template #default="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column property="name" label="搜索量" width="120" />
          <el-table-column property="address" label="已开始" min-width="120" />
          <el-table-column property="qq" label="趋势细分" min-width="220" />
          <el-table-column property="ee" label="过去24小时" min-width="220" />
        </el-table>
      </section>
      <section v-show="currTab === 2" class="pagination">
        <el-config-provider :locale="zhCn">
          <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[10, 20, 30, 40]"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-config-provider>
      </section>
    </div>
  </div>
  <payPanel
    v-model="isShowPayPanel"
    title="订阅指数"
    desc="获取深度市场洞察和独家报告，助您把握投资先机"
    :radio-group="radioGroupList"
  ></payPanel>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { TableInstance } from 'element-plus'
import type { ComponentSize } from 'element-plus'

import payPanel from '@/components/pay-panel/src/pay-panel.vue'
import IconFilter from '../cpns/icon-filter.vue'
import IconRank from '../cpns/icon-rank.vue'
import formPage from '../cpns/form.vue'
import { radioItem } from '@/components/pay-panel/src/type'

const isShowPayPanel = ref(false)
const clickDownload = () => {
  isShowPayPanel.value = true
}
const isForm = ref(true)
const toggle = (val: boolean) => {
  isForm.value = val
}
const value = ref('am')
const value1 = ref('1')
const currTab = ref(1)

// 支付组件数据
const radioGroupList: radioItem[] = [
  {
    title: '订阅方式',
    radio: [
      {
        label: ['100次/月', '29.9'],
        value: '1'
      },
      {
        label: ['100次/月', '39.9'],
        value: '2'
      }
    ]
  },
  {
    title: '订阅渠道',
    radio: [
      {
        label: '短信',
        value: '1'
      },
      {
        label: '公众号',
        value: '2'
      },
      {
        label: '小程序',
        value: '3'
      }
    ]
  },
  {
    title: '订阅阈值',
    radio: [
      {
        label: '当超过基准值（5%）预警推送',
        value: '1'
      },
      {
        label: '当超过基准值（5%）预警推送',
        value: '2'
      }
    ]
  },
  {
    title: '推送频率设置',
    radio: [
      {
        label: '每天',
        value: '1'
      },
      {
        label: '每周',
        value: '2'
      },
      {
        label: '每月',
        value: '3'
      },
      {
        label: '自定义',
        value: '4'
      }
    ]
  }
]
// 表格数据
interface Goods {
  id: number
  date: string
  name: string
  address: string
}

const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<Goods[]>([])

const selectable = (row: Goods) => ![1, 2].includes(row.id)

const handleSelectionChange = (val: Goods[]) => {
  multipleSelection.value = val
}

const tableData: Goods[] = [
  {
    id: 1,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 5,
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 6,
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 7,
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
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
// 更改分页文字
// zhCn.el.pagination.total = '共 `{total} 条`';
// zhCn.el.pagination.goto = '跳至';
// zhCn.el.pagination.pagesize = '条/页';
// zhCn.el.pagination.pageClassifier = '页';

//
const clickTab = (e: number) => {
  currTab.value = e
}
const arr = ['Building block toy', 'Jigsaw puzzle']
const arrSort = [
  {
    label: 'Jigsaw puzzle',
    value: '+100%'
  },
  {
    label: 'Jigsaw puzzle',
    value: '+90%'
  },
  {
    label: 'Jigsaw puzzle',
    value: '+80%'
  },
  {
    label: 'Jigsaw puzzle',
    value: '+70%'
  }
]
const arrSort1 = [
  {
    label: 'Toy box',
    value: '+100%'
  },
  {
    label: 'LEGO toys',
    value: '+90%'
  },
  {
    label: 'Interactive toy',
    value: '+80%'
  },
  {
    label: 'Remote-controlled toy',
    value: '+70%'
  }
]
const options = [
  {
    label: '美国',
    value: 'am'
  },
  {
    label: '圣多美和普林西',
    value: 'ee'
  }
]
const options1 = [
  {
    label: '美国',
    value: '2'
  },
  {
    label: 'Google网页搜索',
    value: '1'
  }
]
const add = () => {
  alert('add')
}

watchEffect(
  () => {
    if (isForm.value) return
    var myChart = echarts.init(document.getElementById('hortTime'))
    // 绘制图表
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Nov'
        ]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 132, 101, 134, 90, 230, 210],
          type: 'line',
          smooth: true
        },
        {
          data: [220, 282, 201, 234, 290, 430, 410],
          type: 'line',
          smooth: true
        }
      ]
    })
  },
  {
    flush: 'post'
  }
)
</script>

<style scoped lang="less">
.queryIndex {
  text-align: start;
  section {
    margin: 30px 0;
  }
  .cursor {
    cursor: pointer;
  }
  .form-page {
    margin-top: 10px;
    height: calc(100vh - 80px);
  }
  .query-page {
    padding: 0 20px 30px;
  }
  .tabs {
    height: 70px;
    display: flex;
    gap: 15px;
    font-size: 18px;
    padding: 20px;
    .tab {
      height: 48px;
      line-height: 32px;
      padding: 7px 20px;
      border: 1px solid #eaecee;
      border-radius: 22px;
      text-align: center;
    }
    .is-active {
      background: #f7f7fb;
      font-weight: bold;
    }
  }
  .options {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      gap: 15px;
    }
  }
  //
  .autoWidth {
    min-width: 80px; //设置最小的宽度
    text-align: start;
  }
  .autoWidth /deep/ .el-input__prefix {
    // 这里直接时复制原来的input的样式，给.el-input__prefix加上
    position: relative;
    box-sizing: border-box;
    border: 1px solid #ffffff00;
    // padding: 0 40px;
    height: 40px;
    line-height: 40px;
    color: #606266;
    left: 0;
    visibility: hidden;
  }
  .sort .autoWidth /deep/ .el-input__prefix {
    height: 20px;
    line-height: 20px;
  }
  .autoWidth /deep/ .el-input__wrapper {
    border-radius: 20px;
  }
  .autoWidth /deep/ .el-input__prefix-inner {
    // 没有内容时suffix的展位
    min-width: 40px;
  }
  .autoWidth /deep/ .el-input__inner {
    position: absolute;
    padding: 1px 11px;
  }

  .words {
    display: flex;
    gap: 15px;

    .box {
      width: 321px;
      height: 120px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 24px 24px;
      background: #ffffff;
      border: 1px solid #eaecee;
      .label {
        font-family: Microsoft YaHei;
        font-size: 18px;
        font-weight: normal;

        /* Gray/700 */
        color: #373f47;
      }
      .content {
        width: 100%;
        height: 100%;
        font-family: Microsoft YaHei;
        font-size: 28px;
        font-weight: normal;
        color: #242d35;
      }
      .add {
        font-family: Inter;
        font-size: 28px;
        font-weight: normal;
        line-height: 70px;
        color: #4040f2;
      }
      .add:hover {
        cursor: pointer;
      }
    }
  }
  .charts {
    .box {
      width: 100%;
      height: 500px;
      border-radius: 12px;
      border: 1px solid #eaecee;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        padding: 0 20px;
        font-size: 18px;
        color: #373f47;
        background: #fafafa;
        border-radius: 12px 12px 0 0;
        box-shadow: inset 0px -1px 0px 0px #f1f1f1;
        .left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      }
      .charts-content {
        width: 100%;
        height: 100%;
        padding-bottom: 50px;
      }
    }
  }
  .sort {
    display: flex;
    justify-content: space-between;
    .box {
      width: 49%;
      border-radius: 12px;
      border: 1px solid #eaecee;
      /deep/ .el-icon {
        font-size: 18px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        padding: 0 20px;
        font-size: 14px;
        color: #4f5b67;
        background: #fafafa;
        border-radius: 12px 12px 0 0;
        box-shadow: inset 0px -1px 0px 0px #f1f1f1;
        .left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      }
      .sort-content {
        width: 100%;
        // 滚动展示
        // max-height: 200px;
        // overflow-y: scroll;
        .item {
          width: 100%;
          height: 60px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          font-family: Microsoft YaHei;
          font-size: 14px;
          padding: 0 20px;
          border-bottom: 1px solid #f1f1f1;
          .left {
            display: flex;
            align-items: center;
            gap: 10px;
            span {
              font-weight: bold;
            }
          }
          .right {
            display: flex;
            align-items: center;
            gap: 20px;
          }
        }
      }
    }
  }
  .table {
    border: 1px solid #eaecee;
    // border-radius: 15px;
  }
}
</style>
