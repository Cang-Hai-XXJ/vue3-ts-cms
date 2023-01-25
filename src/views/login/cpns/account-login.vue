<template>
  <div class="account-login">
    <el-form :rules="rules" :model="user" ref="ruleFormRef">
      <el-form-item label="账号" prop="account">
        <el-input v-model="user.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineExpose } from 'vue'
import { useStore } from 'vuex'
import type { FormInstance, FormRules } from 'element-plus'

import localCache from '@/utils/localCache'

const ruleFormRef = ref<FormInstance>()
const user = reactive({
  account: localCache.getCache('name') ?? '',
  password: localCache.getCache('pass') ?? ''
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

const store = useStore()
const loginAction = (isKeepPass: boolean) => {
  ruleFormRef.value?.validate((valid, fields) => {
    if (valid) {
      //是否记住密码
      //TODO 加密

      if (isKeepPass) {
        localCache.setCache('name', user.account)
        localCache.setCache('pass', user.password)
        store.dispatch('login/accountLoginAction', { ...user })
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('pass')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

//script setup 语法组件内的属性默认不暴露给其他组件，需要手动暴露
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
