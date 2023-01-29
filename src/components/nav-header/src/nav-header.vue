<template>
  <div class="nav-header">
    <i class="fold-menu" @click="handleFoldClick">
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
import { defineEmits, ref } from 'vue'
import myBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import navUserInfo from './nav-user-info.vue'

const emit = defineEmits(['foldChange'])
const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}

const breadcrumbs: IBreadcrumb[] = []
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
