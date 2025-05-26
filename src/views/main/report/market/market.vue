<template>
  <div class="market">
    <section class="filter">
      <div class="box" v-for="item of arr" :key="item.title">
        <span class="title">{{ item.title }}：</span>
        <span
          class="content"
          v-for="i of item.content"
          :key="i.value"
          @click="changeColor($event.target, i)"
        >
          {{ i.label }}
        </span>
      </div>
    </section>
    <section class="banner">
      <div class="box">
        <div class="title">依据您的个性化需求，针对性完成市场研究</div>
        <div class="content">
          <div>市场专项</div>
          <div>行业专题</div>
          <div>竞争格局</div>
          <div>商业计划</div>
          <div>产业趋势</div>
          <div>定期监测</div>
          <div>区域发展</div>
          <div>项目规划</div>
        </div>
        <el-button class="btn">点击详情了解更多</el-button>
      </div>
    </section>
    <section class="cards">
      <div class="box">
        <div class="title">
          <span>综合排序</span>
          <span>
            价格
            <span class="icons">
              <el-icon
                ><ArrowUpBold @click="ascending('price', $event)"
              /></el-icon>
              <el-icon
                ><ArrowDownBold @click="descending('price', $event)"
              /></el-icon>
            </span>
          </span>
          <span>
            时间
            <span class="icons">
              <el-icon
                ><ArrowUpBold @click="ascending('time', $event)"
              /></el-icon>
              <el-icon
                ><ArrowDownBold @click="descending('time', $event)"
              /></el-icon>
            </span>
          </span>
          <span class="right">{{ currPage }} / {{ totalPage }} </span>
        </div>
        <div class="content">
          <el-card
            v-for="item of reports"
            :key="item"
            class="el-card"
            shadow="hover"
            @click="gotoDetail(item)"
          >
            <el-icon class="view"
              ><View /><span class="text"
                >&nbsp;{{
                  item.reportUserBehaviorSummaryResponse?.view || '22w'
                }}</span
              ></el-icon
            >
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            />
            <template #footer>
              <div class="header">
                {{ item.reportTitle }}
              </div>
              <div class="footer">
                <div>{{ item.createTime?.split(' ')[0] }}</div>
                <div>
                  <el-icon><Star /></el-icon
                  >{{ item.reportUserBehaviorSummaryResponse?.follow || 11 }}
                  <el-icon><Pointer /></el-icon
                  >{{ item.reportUserBehaviorSummaryResponse?.thumbUp || 12 }}
                </div>
              </div>
            </template>
          </el-card>
        </div>
        <div class="pagination">
          <el-pagination
            size="small"
            background
            layout="prev, pager, next"
            :total="totalPage"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import router from '@/router'
import { getReportPage } from '@/service/request/report'
import { ViewRes } from '@/service/request/report/type'

const arr = reactive([
  {
    title: '所属行业',
    content: [
      {
        value: 0,
        label: '全部'
      },
      {
        value: 1,
        label: '交通设备'
      },
      {
        value: 1,
        label: '交通运输'
      },
      {
        value: 1,
        label: '信息技术'
      },
      {
        value: 1,
        label: '公用事业'
      },
      {
        value: 1,
        label: '农林牧渔'
      },
      {
        value: 1,
        label: '化石能源'
      },
      {
        value: 1,
        label: '医药生物'
      },
      {
        value: 1,
        label: '商贸零售'
      },
      {
        value: 1,
        label: '国防军工'
      }
    ]
  },
  {
    title: '所属机构',
    content: [
      {
        value: 0,
        label: '全部'
      },
      {
        value: 0,
        label: 'CBNData'
      },
      {
        value: 1,
        label: 'IT桔子'
      },
      {
        value: 1,
        label: '上上咨询'
      },
      {
        value: 1,
        label: '东E智库'
      },
      {
        value: 1,
        label: '而且智库'
      },
      {
        value: 1,
        label: '东湖智库'
      },
      {
        value: 1,
        label: '众诚智库'
      },
      {
        value: 1,
        label: '卓越咨询'
      }
    ]
  }
])

const currPage = ref(1)
const totalPage = ref(0)

const reports = ref<ViewRes[]>([])
getReportPage(currPage.value, 12, {}).then((res) => {
  reports.value = res.records
  totalPage.value = res.total
  console.log(reports.value)
})
type sortType = 'price' | 'time'

const changeColor = (element: any, i: any) => {
  document.querySelectorAll('.filter .content').forEach((item: any) => {
    item.style.color = '#6b7280'
  })
  element.style.color = '#4169E1'

  console.log(i)
}

const ascending = (type: sortType, event: any) => {
  document.querySelectorAll('.icons svg').forEach((item: any) => {
    item.style.color = '#6b7280'
  })
  event.target.style.color = '#4169E1'
  switch (type) {
    case 'price':
      // router.go(-1)
      break
    case 'time':
      // router.go(-1)
      break
  }
}
const gotoDetail = (item: any) => {
  router.push(`marketDetail/${item?.reportId}`)
}
const descending = (type: sortType, event: any) => {
  event.target.style.color = '#4169E1'
  switch (type) {
    case 'price':
      // router.go(-1)
      break
    case 'time':
      // router.go(-1)
      break
  }
}
</script>

<style scoped lang="less">
.market {
  width: 100%;
  overflow: hidden;
  section {
    margin: 15px 40px;
  }

  .filter {
    width: 100%;
    margin-top: 30px;
    .box {
      margin: 20px 0;
      font-family: Roboto;
      font-size: 16px;
      font-weight: normal;
      color: #6b7280;
      text-align: start;
      display: flex;
      gap: 10px;
      .selected {
        color: var(--main-color);
      }
      .content {
        cursor: pointer;
      }
    }
  }
  .banner {
    .box {
      width: 100%;
      height: 180px;
      background: url('@/assets/img/banner-bg.png');
      border-radius: 10px;
      background-size: cover;
      .title {
        font-size: 24px;
        font-weight: bold;
        color: #1f2937;
        padding-top: 30px;
      }
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
        width: 100%;
        gap: 20px;
        font-size: 16px;
        font-weight: normal;
        color: #4b5563;
      }
      .btn {
        width: auto !important;
        height: 40px;
      }
    }
  }
  .cards {
    text-align: start;
    .box {
      .title {
        position: relative;
        font-size: 16px;
        font-weight: normal;
        color: #4b5563;
        margin: 15px 0;
        display: flex;
        gap: 22px;
        span {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .right {
          position: absolute;
          right: 0;
          top: 0;
        }
        .icons {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 5px;
          i {
            font-size: 10px;
          }
        }
      }
      .content {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        .el-card {
          position: relative;
          width: 260px;
          :hover {
            cursor: pointer;
          }
          .view {
            .text {
              font-size: 14px;
              font-style: normal;
            }
            position: absolute;
            top: 5px;
            right: 5px;
            z-index: 9;
            background: #000;
            color: #fff;
            width: 84px;
            height: 28px;
            border-radius: 84px;
            opacity: 0.7;
          }
          img {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
          :deep(.el-card__body) {
            padding: 0;
          }
          :deep(.el-card__footer) {
            padding: 7px 0;
          }
          .header {
            height: 46px;
            font-size: 16px;
            font-weight: 500;
            color: #1f2937;
            padding: 7px 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            line-clamp: 2;
            box-orient: vertical;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #6b7280;
            padding: 7px 15px;
            div {
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 5px;
            }
          }
        }
      }
      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      }
    }
  }
}
</style>
