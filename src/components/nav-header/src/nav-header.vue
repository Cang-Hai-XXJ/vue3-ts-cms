<template>
  <div class="nav-header">
    <i class="fold-menu" @click="handleFoldClick">
      <el-icon>
        <template v-if="isFold"><Fold /> </template>
        <template v-else> <Expand /> </template>
      </el-icon>
    </i>
    <div class="content">
      <div>面包削</div>
      <div>
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, computed } from 'vue'
import { useStoreWithModules } from '@/store'

const emit = defineEmits(['foldChange'])
const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
const store = useStoreWithModules()
const user = computed(() => store.state.login.userInfo.name)
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
    .userInfo {
      display: flex;
      align-items: center;
      cursor: pointer;
      .avatar {
        margin-right: 10px;
        height: 35px;
        width: 35px;
      }
    }
  }
}
</style>
