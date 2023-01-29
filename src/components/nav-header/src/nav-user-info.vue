<template>
  <div class="nav-user-info">
    <el-dropdown>
      <span class="userInfo">
        <el-avatar
          class="avatar"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        >
        </el-avatar>
        <span>{{ user }} </span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStoreWithModules } from '@/store'

const store = useStoreWithModules()
const user = computed(() => store.state.login.userInfo.name)
</script>

<style lang="less" scoped>
.userInfo {
  display: flex;
  align-items: center;
  cursor: pointer;
  .avatar {
    margin-right: 10px;
    height: 35px;
    width: 35px;
  }
  .el-icon--right {
    margin-left: 8px;
  }
}
</style>
