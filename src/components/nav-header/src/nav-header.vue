<template>
  <div class="nav-header">
    <i class="fold-menu" @click="handleFoldClick">
      <!-- 折叠面板 -->
      <el-icon>
        <template v-if="isFold"><Fold /> </template>
        <template v-else> <Expand /> </template>
      </el-icon>
    </i>
    <div class="content">
      <myBreadcrumb :breadcrumbs="breadcrumbs"></myBreadcrumb>
      <navUserInfo></navUserInfo>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

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
