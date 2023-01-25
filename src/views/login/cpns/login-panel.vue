<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" class="demo-tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <account-login />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机号登录</span>
          </span>
        </template>
        <phone-login />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPass">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary">立即登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import accountLogin from './account-login.vue'
import phoneLogin from './phone-login.vue'
import { ref } from 'vue'
const isKeepPass = ref(true)
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-top: -220px;
  .demo-tabs {
    box-shadow: 0px 0px 32px -10px;
    border-radius: 3px;
  }
  .title {
    text-align: center;
  }
  .custom-tabs-label {
    display: flex;
    align-items: center;
    .el-icon {
      margin-right: 5px;
    }
  }
  .account-control {
    display: flex;
    justify-content: space-between;
    // padding: 0 20px;
  }
  .login-btn {
    width: 100%;
    margin-top: 5px;
  }
}
</style>
