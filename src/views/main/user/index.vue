<template>
  <div class="page-bg">
    <el-container class="common-layout">
      <el-aside width="160px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item
            v-for="(item, index) in arr"
            :key="index"
            :index="index"
            @click="handleClick(item.index)"
          >
            <!-- <el-icon><setting /></el-icon> -->
            <img :src="item.icon" alt="" />
            <span>{{ item.label }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <section v-if="currIndex == 2">
          <div class="header">个人信息</div>
          <div class="content">
            <div class="info">
              <div style="height: 80px" class="box">
                <div class="left">头像</div>
                <div class="center">
                  <img src="~img/Frame.png" alt="" />
                </div>
                <div class="right"></div>
              </div>
              <div class="box">
                <div class="left">账号ID</div>
                <div class="center">747578</div>
                <div @click="copy('747578')" class="right">复制</div>
              </div>
              <div class="box">
                <div class="left">绑定微信</div>
                <div class="center">已绑定微信</div>
                <div class="right">更换</div>
              </div>
              <div class="box">
                <div class="left">手机号码</div>
                <div class="center">153****7257</div>
                <div class="right">更换</div>
              </div>
            </div>
          </div>
        </section>
        <section v-else-if="currIndex == 4">
          <div class="header">我的阅读</div>
          <div class="content">
            <div class="read">
              <div
                class="box"
                v-for="(item, index) in new Array(8)"
                :key="index"
              >
                <div class="header">
                  <img src="~img/icon/time.png" alt="" />
                  <div>&nbsp;2025-03-25</div>
                </div>
                <div class="content">
                  <div class="left">
                    <div class="title">2024 中国新能源汽车行业深度研究报告</div>
                    <div class="desc">
                      <div>发布时间：2024-01-15</div>
                      <div>页数：128页</div>
                      <div>格式：PDF</div>
                      <div>大小：15.8MB</div>
                      <div class="center">
                        <el-icon><Star /></el-icon>2,456次收藏
                      </div>
                    </div>
                  </div>
                  <div class="right">
                    <el-button class="btn">
                      <div class="center">
                        <el-icon><Download /></el-icon>下载报告
                      </div>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const currIndex = ref(1)
const handleClick = (key: string) => {
  console.log(key)
  currIndex.value = parseInt(key)
}
const copy = (key: string) => {
  navigator.clipboard.writeText(key).then(
    () => {
      ElMessage({
        message: '复制文本成功',
        type: 'success'
      })
    },
    () => {
      ElMessage.error('复制文本失败')
    }
  )
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const arr = [
  {
    label: '成为 VIP',
    icon: require('@/assets/img/icon/VIP@2x.png'),
    index: '1'
  },
  {
    label: '个人信息',
    icon: require('@/assets/img/icon/个人信息@2x.png'),
    index: '2'
  },
  {
    label: '我的订单',
    icon: require('@/assets/img/icon/订单@2x.png'),
    index: '3'
  },
  {
    label: '我的阅读',
    icon: require('@/assets/img/icon/阅读@2x.png'),
    index: '4'
  },
  {
    label: '我的收藏',
    icon: require('@/assets/img/icon/收藏@2x.png'),
    index: '5'
  },
  {
    label: '我的下载',
    icon: require('@/assets/img/icon/下载@2x.png'),
    index: '6'
  },
  {
    label: '我的订阅',
    icon: require('@/assets/img/icon/订阅@2x.png'),
    index: '7'
  }
]
</script>

<style scoped lang="less">
.page-bg {
  background-color: #f5f6f7 !important;
}
.common-layout {
  padding: 15px;
  aside {
    height: 600px;
    .el-menu {
      border: none;
      li {
        font-size: 16px;
        img {
          width: 18px;
          height: 18px;
          object-fit: contain;
          margin-right: 5px;
        }
      }
    }
  }
  main {
    min-height: 600px;
    max-height: 100%;
    margin-left: 15px;
    background-color: #fff;
    padding: 5px 25px;
    section {
      width: 100%;
      max-height: calc(100vh - 110px);
      text-align: start;
      .header {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 600;
        // margin-bottom: 20px;
        color: #3d3d3d;
      }
      .content {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        border-top: 1px solid #f5f7f9;
        .info {
          .box {
            width: 450px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            div {
              flex: 1;
            }
            .left {
              color: #4b5563;
            }
            .center {
              color: #1f2937;
              // font-weight: 600;
              img {
                width: 60px;
                height: 60px;
                border-radius: 30px;
              }
            }
            .right {
              cursor: pointer;
              color: var(--main-color);
            }
          }
        }

        .read {
          margin: 20px 0;
          .box {
            border: 1px solid var(--border-color);
            border-radius: 10px;
            margin-bottom: 20px;
            .header {
              height: 36px;
              display: flex;
              justify-content: start;
              align-items: center;
              background: #f0f0ff;
              gap: 5px;
              padding: 0 12px;
              border-radius: 10px 10px 0 0;
            }
            .content {
              height: 90px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              padding: 0 12px;
              .left {
                display: flex;
                flex-direction: column;
                gap: 10px;
                .title {
                  font-size: 20px;
                  color: #000000;
                  font-weight: 500;
                }
                .desc {
                  display: flex;
                  gap: 20px;
                  color: #6b7280;
                  font-size: 14px;
                  .center {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                  }
                }
              }
              .right {
                margin-right: 5px;
                .center {
                  display: flex;
                  align-items: center;
                  gap: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
