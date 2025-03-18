<template>
  <div class="account-login">
    <el-form :rules="rules" :model="phone" :ref="ruleFormRef">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="verify-code">
          <el-input v-model="phone.code" />
          <el-button class="btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const phone = reactive({
  num: '',
  code: ''
})
const rules = reactive<FormRules>({
  num: [
    {
      required: true,
      message: '请输入手机号码~'
    },
    {
      pattern: /^1[0-9]{10}$/,
      message: '请输入11位手机号码~'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入密码~'
    },
    {
      pattern: /^[A-z0-9]{4}$/,
      message: '请输入4位数的验证码~'
    }
  ]
})
const loginAction = () => {
  console.log('手机登录', phone.num, phone.code)
}
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.verify-code {
  display: flex;
  .btn {
    margin-left: 15px;
  }
}
</style>
