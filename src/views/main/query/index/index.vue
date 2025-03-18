<template>
  <div class="queryIndex">
    <section class="words">
      <div class="box" v-for="item of arr" :key="item">
        <div class="label">查询词组</div>
        <div class="content">{{ item }}</div>
      </div>
      <div class="box" @click="add">
        <div class="add">+ 添加对比</div>
      </div>
    </section>
    <section class="options">
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
    </section>
    <section class="charts">
      <div class="box">
        <div class="header">
          <div class="left">
            热度随时间变化趋势
            <el-icon><QuestionFilled /></el-icon>
          </div>
          <div class="right">
            <el-icon><Download /></el-icon>
          </div>
        </div>
        <div class="charts-content" id="hortTime"></div>
      </div>
    </section>
    <section class="charts">
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
            <el-icon><Download /></el-icon>
          </div>
        </div>
        <div class="charts-content" id="hortMap"></div>
      </div>
    </section>
    <section class="sort">
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
            <el-icon><Download /></el-icon>
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
            <el-icon><Download /></el-icon>
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
  </div>
</template>

<script lang="ts" setup>
import generatorPanel from '@/components/generator-panel'
import introducePanelPanel from '@/components/introduce-panel'
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
import IconFilter from '../cpns/icon-filter.vue'
import IconRank from '../cpns/icon-rank.vue'
const value = ref('am')
const value1 = ref('1')
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

onMounted(() => {
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
})
</script>

<style scoped lang="less">
.queryIndex {
  padding: 20px 30px;
  text-align: start;
  section {
    margin: 30px 0;
  }
  .options {
    display: flex;
    gap: 15px;
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
}
</style>
