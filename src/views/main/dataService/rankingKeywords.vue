<template>
  <div class="batch page-bg pd_20">
    <section>
      <Search></Search>
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
          <el-table-column
            align="center"
            prop="keyword"
            label="绝对排名/相对排名"
          />
          <el-table-column
            align="center"
            prop="searchVolume"
            label="查询ID
"
          />
          <el-table-column align="center" prop="seType" label="关键词信息" />
          <el-table-column align="center" prop="seType" label="排名信息" />
        </el-table>
      </div>
    </section>

    <section class="chart">
      <div class="title">关键词搜索量</div>
      <div class="content">
        <div class="box" v-for="(item, index) in new Array(5)" :key="index">
          <img class="left" src="~img/Frame.png" />
          <div class="center">
            <div class="top">
              <el-tag
                v-for="item in items"
                class="tag"
                :key="item.label"
                effect="dark"
              >
                <img v-if="item.icon" :src="item.icon" alt="" />{{ item.label }}
              </el-tag>
            </div>
            <div class="center">
              Sy world Designer Casual Tops Women's T-shirt Men's Shorts Central
              Cee Clothing Uk Drill Hairstyle Streetwear Summer Clothes
            </div>
            <div class="bottom">
              <div class="price">$44.99-$51.60</div>
              <div class="label">8.8折</div>
              <div class="font_14">
                <span class="hint">查询总数：</span>9.9w
              </div>
              <div class="font_14">
                <span class="hint">查询总数：</span>123123
              </div>
            </div>
          </div>
          <div class="right">
            <p>95%</p>
            <p>好评率</p>
          </div>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="100"
          :page-size="5"
          @current-change="handleCurrentChange"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TagProps } from 'element-plus'
type Item = { type: TagProps['type']; label: string; icon?: string }
interface ItableData {
  keyword: string
  seType: string
  searchVolume: number
}
const tableData = ref<ItableData[]>()
import Search from './cpns/search.vue'

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
const items = ref<Array<Item>>([
  {
    type: 'primary',
    label: '官方推荐',
    icon: require('@/assets/img/icon/xin.png')
  },
  {
    type: 'success',
    label: '最佳卖家',
    icon: require('@/assets/img/icon/zan.png')
  },
  { type: 'info', label: 'Tag 3' },
  { type: 'warning', label: 'Tag 4' },
  { type: 'danger', label: 'Tag 5' }
])
</script>

<style scoped lang="less">
.batch {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color) !important;
  gap: 20px;
  text-align: left;
  section {
    width: 100%;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    background-color: #fff;
    padding: 20px;
    .title {
      font-size: 18px;
      color: #000000;
      margin-bottom: 30px;
      font-weight: 500;
    }
    .content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      .box {
        width: 100%;
        height: 150px;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        .left {
          width: 96px;
          height: 96px;
          object-fit: cover;
          margin-right: 20px;
        }
        .center {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 10px;
          .top {
            display: flex;
            gap: 10px;
            .tag {
              display: flex;
              align-items: center;
              border: 1px solid #fff;
              img {
                width: 10px;
                margin-right: 5px;
              }
              &:nth-child(1) {
                background: linear-gradient(90deg, #ff8746 0%, #ffce46 100%);
              }
              &:nth-child(2) {
                background: linear-gradient(90deg, #3bb330 0%, #46e57b 100%);
              }
            }
          }
          .center {
            font-size: 16px;
            line-height: 24px;
            color: #1f2937;
          }
          .bottom {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .price {
              font-size: 18px;
              font-size: 18px;
              color: #e83e3e;
              margin-right: 5px;
            }
            .label {
              width: 40px;
              font-size: 12px;
              line-height: 18px;
              text-align: center;
              color: #fff;
              background-color: var(--main-color);
              margin-right: 150px;
            }
            .font_14 {
              margin-right: 150px;
            }
          }
        }
        .right {
          width: 150px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          p {
            margin: 2px;
          }
          p:nth-child(1) {
            font-size: 24px;
            font-weight: 500;
            text-align: center;
            color: #4040f2;
          }
          p:nth-child(2) {
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            color: #6b7280;
          }
        }
      }
    }
  }
}
</style>
