<template>
  <div class="user">
    <MyForm v-bind="searchFormConfig" v-model="formData"></MyForm>
  </div>
</template>

<script lang="ts" setup>
import MyForm from '@/base-ui/form'
import { reactive } from 'vue'
import { searchFormConfig } from './config/search.config'
const formData = reactive({
  dp: '李培培是猪',
  password: '',
  hob: '',
  time: ''
})
</script>

<style scoped></style>
