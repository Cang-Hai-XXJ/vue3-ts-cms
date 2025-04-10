<template>
  <div class="nav-header">
    <!-- search -->
    <template v-if="type == 'search'">
      <section class="search">
        <el-input
          v-model="input"
          style="width: 800px; height: 45px"
          placeholder="搜索报告、数据、行业信息"
          class="input-with-select"
          size="large"
        >
          <template #suffix>
            <el-button class="btn" size="large">发现一下 </el-button>
          </template>
        </el-input>
        <el-button class="btn right"
          ><img src="~img/diamond-icon.png" alt="" />订阅服务</el-button
        >
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
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

import myBreadcrumb from '@/base-ui/breadcrumb'
import navUserInfo from './nav-user-info.vue'
import { pathMap2Breadcrumb } from '@/utils/map-menus'
import { useStoreWithModules } from '@/store'
const emit = defineEmits(['foldChange'])
const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
const input = ref('')

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
</script>

<style scoped lang="less">
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
