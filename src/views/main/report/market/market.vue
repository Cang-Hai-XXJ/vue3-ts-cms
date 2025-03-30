<template>
  <div class="market">
    <section class="search">
      <el-input
        v-model="input"
        style="width: 800px; height: 45px"
        placeholder="请输入关键词搜索（多个关键词用空格分开）"
        class="input-with-select"
        size="large"
      >
        <template #suffix>
          <el-button class="btn" size="large">发现一下 </el-button>
        </template>
      </el-input>
    </section>
    <section class="filter">
      <div class="box" v-for="item of arr" :key="item.title">
        <span class="title">{{ item.title }}：</span>
        <span class="content" v-for="i of item.content" :key="i.value">
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
              <el-icon><ArrowUpBold /></el-icon>
              <el-icon><ArrowDownBold /></el-icon>
            </span>
          </span>
          <span>
            时间
            <span class="icons">
              <el-icon><ArrowUpBold /></el-icon>
              <el-icon><ArrowDownBold /></el-icon>
            </span>
          </span>
          <span class="right">{{ currPage }} / {{ totalPage }} </span>
        </div>
        <div class="content">
          <el-card
            class="el-card"
            shadow="hover"
            v-for="item of new Array(8)"
            :key="item"
          >
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            />
            <template #footer>
              <div class="header">2025年中国新能源汽车行业深度研究报告</div>
              <div class="footer">
                <div>2025-01-15</div>
                <div>202</div>
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
import { Search } from '@element-plus/icons-vue'
import router from '@/router'

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
const input = ref('')
const currPage = ref(1)
const totalPage = ref(500)

const backHome = () => {
  // router.go(-1)
}
</script>

<style scoped lang="less">
.market {
  width: 100%;
  overflow: hidden;
  section {
    margin: 15px 40px;
  }

  .search {
    .btn {
      width: 100px !important;
      margin-right: -15px;
    }
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
      :nth-child(2) {
        color: #4169e1;
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
        gap: 20px;
        .el-card {
          width: 260px;
          :hover {
            cursor: pointer;
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
            font-size: 16px;
            font-weight: 500;
            color: #1f2937;
            padding: 7px 15px;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #6b7280;
            padding: 7px 15px;
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
