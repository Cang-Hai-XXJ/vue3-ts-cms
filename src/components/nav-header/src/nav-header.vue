<template>
  <div class="nav-header">
    <!-- search -->
    <template v-if="type == 'search'">
      <section class="search">
        <el-input
          v-model="input"
          style="width: 550px; height: 45px"
          placeholder="搜索报告、数据、行业信息"
          class="input-with-select"
          size="large"
        >
          <!-- <template #suffix>
            <el-button class="btn" size="large">发现一下 </el-button>
          </template> -->
        </el-input>
        <!-- <el-button class="btn right"
          ><img src="~img/diamond-icon.png" alt="" />订阅服务</el-button
        > -->
        <div class="opt">
          <div>
            <img
              src="@/assets/img/header2.png"
              alt=""
              @click="isShowDialog = true"
            />升级套餐
          </div>
          <el-popover
            popper-class="custom-popover"
            :content="
              isFirstHover ? '每日100算力已到账' : '其中100算力将在24小时内过期'
            "
            placement="bottom"
            @hide="hide"
          >
            <template #reference>
              <div class="custom" @click="dialogVisible = true">
                <img src="@/assets/img/header1.png" alt="" />剩余算力&nbsp;<span
                  >1000</span
                >
              </div>
            </template>
          </el-popover>
        </div>
      </section>
    </template>
    <!-- default -->
    <template v-else>
      <i class="fold-menu" @click="handleFoldClick">
        <!-- 折叠面板 -->
        <el-icon>
          <template v-if="isFold"><Fold /> </template>
          <template v-else> <Expand /> </template>
        </el-icon>
      </i>
      <div class="content">
        <myBreadcrumb :breadcrumbs="breadcrumbs"></myBreadcrumb>
        <!-- <navUserInfo></navUserInfo> -->
      </div>
    </template>
    <el-dialog
      v-model="dialogVisible"
      width="650"
      style="padding: 30px"
      class="dialog"
    >
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
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
            算力详情
          </h4>
        </div>
      </template>
      <div class="top">
        <div class="left">
          <p>总算力</p>
          <div>80</div>
        </div>
        <div class="right">
          <p>充值算力: 0</p>
          <p>赠送算力: 80</p>
        </div>
      </div>
      <div class="center">
        <el-tabs v-model="activeName" class="demo-tabs" type="">
          <el-tab-pane label="全部" name="all">
            <div
              class="list-item"
              v-for="(item, index) in listAll"
              :key="index"
            >
              <div class="left">
                <p>{{ item.desc }}</p>
                <p>{{ item.date }}</p>
              </div>
              <div class="right" :class="item.isAdd ? 'plus' : 'minus'">
                {{ item.isAdd ? '+' : '-' }}{{ item.num }}
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="消耗" name="pay">
            <div
              class="list-item"
              v-for="(item, index) in listPay"
              :key="index"
            >
              <div class="left">
                <p>{{ item.desc }}</p>
                <p>{{ item.date }}</p>
              </div>
              <div class="right" :class="item.isAdd ? 'plus' : 'minus'">
                {{ item.isAdd ? '+' : '-' }}{{ item.num }}
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="获得" name="get">
            <div
              class="list-item"
              v-for="(item, index) in listGet"
              :key="index"
            >
              <div class="left">
                <p>{{ item.desc }}</p>
                <p>{{ item.date }}</p>
              </div>
              <div class="right" :class="item.isAdd ? 'plus' : 'minus'">
                {{ item.isAdd ? '+' : '-' }}{{ item.num }}
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="bottom">
        <span>仅显示近1个月明细，数据更新可能有延迟</span>
        <span @click="openPage">算力规则</span>
      </div>
    </el-dialog>
  </div>
  <AdPopup :visible="isShowDialog" @close="isShowDialog = false"></AdPopup>
</template>

<script lang="ts" setup>
import AdPopup from '@/base-ui/AdPopup.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

import myBreadcrumb from '@/base-ui/breadcrumb'
import navUserInfo from './nav-user-info.vue'
import { pathMap2Breadcrumb } from '@/utils/map-menus'
import { useStoreWithModules } from '@/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const href = router.resolve({
  name: 'rule', // 这里是跳转页面的name
  path: '/rule'
}).href
const isShowDialog = ref(false)

const openPage = () => {
  window.open(href, '_blank')
}
const emit = defineEmits(['foldChange'])
const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
const input = ref('')
const activeName = ref('all')
const listAll = ref([
  {
    desc: '每日免费算力',
    date: '2025-06-14 14:51',
    num: '100',
    isAdd: true
  },
  {
    desc: '邀请好友注册',
    date: '2025-06-14 14:51',
    num: '100',
    isAdd: true
  },
  {
    desc: '算力到期清零',
    date: '2025-06-14 14:51',
    num: '100',
    isAdd: false
  },
  {
    desc: '算力到期清零',
    date: '2025-06-14 14:51',
    num: '100',
    isAdd: false
  },
  {
    desc: '算力到期清零',
    date: '2025-06-14 14:51',
    num: '100',
    isAdd: false
  },
  {
    desc: '订阅关键词',
    date: '2025-06-14 14:51',
    num: '90',
    isAdd: false
  }
])
const listGet = computed(() => {
  return listAll.value.filter((item) => item.isAdd)
})
const listPay = computed(() => {
  return listAll.value.filter((item) => !item.isAdd)
})
defineProps({
  type: {
    type: String,
    default: 'default'
  }
})
//面包削
const breadcrumbs = computed(() => {
  const menus = useStoreWithModules().state.login.menus
  const path = useRoute().path
  return pathMap2Breadcrumb(menus, path)
})

const isFirstHover = ref(true)
const hide = () => {
  isFirstHover.value = false
}
const dialogVisible = ref(false)
const ruleVisible = ref(false)
</script>

<style scoped lang="less">
.dialogAd {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  img {
    width: 400px;
    height: 681.28px;
  }
}
.dialog {
  .top {
    width: 592px;
    height: 124px;
    border-radius: 12px;
    background: #f9fafb;
    margin: 30px 0;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left,
    .right {
      width: 100px;
      p {
        font-size: 16px;
        color: #666666;
      }
      div {
        font-size: 30px;
        color: #000000;
      }
    }
    .left {
      margin-top: -10px;
    }
  }
  .center {
    width: 592px;
    .demo-tabs {
      width: 100%;
      height: 400px;
      &:deep(.el-tabs__content) {
        overflow-y: auto;
        /* 隐藏默认的滚动条样式 */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
      }
      .list-item {
        width: 592px;
        height: 76px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 10px 5px;
        padding-right: 0;
        .right {
          font-size: 16px;
          &.plus {
            color: #165dff;
          }
          &.minus {
            color: #6b7280;
          }
        }
        .left {
          font-size: 16px;
          color: #111827;
          text-align: left;
          p:last-child {
            font-size: 14px;
            color: #6b7280;
          }
        }
      }
    }
  }
  .bottom {
    width: 592px;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 14px;
      &:first-child {
        color: #6b7280;
      }
      &:last-child {
        color: #165dff;
        cursor: pointer;
      }
    }
  }
}
.custom-popover {
  color: #fff;
  background-color: var(--main-color);
}
.custom:hover {
  cursor: pointer;
}
.nav-header {
  display: flex;
  width: 100%;
  .search {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .btn {
      width: 110px !important;
      margin-right: -15px;
      height: 40px;
      img {
        width: 16px;
        height: 16px;
        position: relative;
        right: 5px;
      }
    }
    .opt {
      display: flex;
      gap: 20px;
      font-size: 14px;

      img {
        width: 16px;
        height: 16px;
        margin: 0 15px;
      }
      div {
        display: flex;
        align-items: center;
        height: 40px;
        border-radius: 55px;
      }
      div:first-child {
        width: 129px;
        color: #4040f2;
        background-color: #f5f5ff;
      }
      div:last-child {
        width: 168px;
        color: #000;
        background-color: #ffffff;
        border: 1px solid #e5e7eb;
        span {
          color: #ffb622;
        }
      }
    }
  }
  .fold-menu {
    font-size: 30px;
    padding-top: 8px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
