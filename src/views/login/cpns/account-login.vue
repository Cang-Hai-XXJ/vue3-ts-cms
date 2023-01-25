<template>
  <div class="account-login">
    <el-form :rules="rules" :model="user" :ref="ruleFormRef">
      <el-form-item label="账号" prop="account">
        <el-input v-model="user.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const user = reactive({
  account: '',
  password: ''
})
const rules = reactive<FormRules>({
  account: [
    {
      required: true,
      message: '请输入账号~'
    },
    {
      pattern: /^[A-z0-9]{3,6}$/,
      message: '请输入3到6位数的字母数字组合~'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码~'
    },
    {
      pattern: /^[A-z0-9]{6,12}$/,
      message: '请输入6到12位数的字母数字组合~'
    }
  ]
})
</script>

<style lang="less" scoped></style>
