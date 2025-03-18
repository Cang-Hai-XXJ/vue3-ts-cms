<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :collapse="isCollapse" />
        <nav-user :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header v-show="isShowHeader" class="page-header">
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-bg">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import navMenu from '@/components/nav-menu'
import navUser from '@/components/nav-user'
import navHeader from '@/components/nav-header'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

console.log(router, route.meta)

const isCollapse = ref(false)
const isShowHeader = computed(() => !router.currentRoute.value.meta.noHeader)
const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main-content,
.page {
  height: 100%;
}
.page-content {
  width: 100%;
  height: 100%;
  .page-bg {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 5px;
  }
}
.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-header {
  height: var(--header-height) !important;
}
.el-aside {
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #fff;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  border-right: 1px solid var(--border-color);
  &::-webkit-scrollbar {
    display: none;
  }
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #fff;
  padding: 0 !important;
}
</style>
