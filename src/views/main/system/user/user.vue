<template>
  <div class="user">
    <MyForm v-bind="searchFormConfig"></MyForm>
  </div>
</template>

<script lang="ts" setup>
import MyForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'
</script>

<style scoped></style>
