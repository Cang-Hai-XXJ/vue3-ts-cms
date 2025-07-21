<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/home-icon-black.png" alt="logo" />
      <div v-if="!collapse" class="title">选品大师</div>
    </div>
    <el-menu
      :default-active="defaultMenu"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#ffffff"
      text-color="#4F5B67"
      active-text-color="#4040F2"
    >
      <div class="sort">
        <template v-for="item in userMenus" :key="item.id">
          <!-- 二级菜单 -->
          <template v-if="item.type === 1">
            <!-- 二级菜单的可以展开的标题 -->
            <el-sub-menu :index="item.id + ''">
              <template #title>
                <el-icon class="icon" v-if="item.icon">
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
              <!-- 遍历里面的item -->
              <template v-for="subitem in item.children" :key="subitem.id">
                <el-menu-item
                  :index="subitem.id + ''"
                  @click="handleClickMenuItem(subitem)"
                  class="subItem"
                >
                  <el-icon class="icon" v-if="subitem.icon">
                    <component :is="item.icon"></component>
                  </el-icon>
                  <span>{{ subitem.name }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <!-- 一级菜单 -->
          <template v-else-if="item.type === 2">
            <el-menu-item
              :index="item.id + ''"
              @click="handleClickMenuItem(item)"
            >
              <el-icon class="icon" v-if="item.icon">
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </div>
      <div class="reserve">
        <!-- 一级菜单 倒置 -->
        <template v-for="item in userMenus" :key="item.id">
          <template v-if="item.type === 3">
            <el-menu-item
              :index="item.id + ''"
              @click="handleClickMenuItem(item)"
            >
              <el-icon class="icon" v-if="item.icon">
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useStoreWithModules } from '@/store'
import { pathMap2Menu } from '@/utils/map-menus'

const store = useStoreWithModules()
const userMenus = computed(() => store.state.login.menus)
const route = useRoute()
const menu = pathMap2Menu(userMenus.value, route.path)
let defaultMenu = ref(menu?.id + '')

const handleClickMenuItem = (menu: any) => {
  router.push({
    path: menu.path ?? '/not-found'
  })
}
defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  height: calc(100% - 90px);
  background-color: #fff;
  position: relative;
  // 解决折叠后 reserve 的位置重叠问题
  :deep(ul) {
    height: calc(100% - 90px);
  }
  .reserve {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .logo {
    display: flex;
    height: 88px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: #000;
    padding: 0 20px;

    .img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }

    .title {
      font-size: 28px;
      font-weight: bold;
    }
  }

  .icon {
    margin-right: 20px;
  }
  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  .subItem {
    margin-left: 25px;
  }
  :deep(.el-submenu__title) {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    background-color: #f7f7fb !important; // 菜单
  }
  .el-menu-item.is-active {
    color: #4040f2 !important;
    background-color: #f7f7fb !important;
    border-right: 4px #4040f2 solid;
  }
  :deep(.el-menu-item) {
    font-size: 16px;
    height: 48px !important;
  }
  :deep(.el-sub-menu__title) {
    font-size: 16px;
    height: 48px !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 90px);
}
</style>
