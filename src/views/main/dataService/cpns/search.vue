<template>
  <div class="search">
    <el-input
      v-model="input"
      style="width: 800px; height: 40px"
      placeholder="通过关键词、商品名称、商品ID或链接搜索您想要查询的商品"
      class="input-with-select"
      size="large"
    >
      <template #suffix>
        <el-button class="btn" size="large" @click="onSubmit">搜索 </el-button>
      </template>
    </el-input>
    <el-form :inline="true" :model="formData" class="form-inline">
      <el-form-item label="国家/地区">
        <el-select
          v-model="formData.region"
          clearable
          placeholder="国家"
          style="width: 100px"
        >
          <el-option label="上海111" value="shanghai" />
          <el-option label="北京" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="语言">
        <el-select
          v-model="formData.language"
          clearable
          placeholder=""
          style="width: 100px"
        >
          <el-option label="上海" value="shanghai" />
          <el-option label="北京" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="关联深度">
        <el-select
          v-model="formData.association"
          clearable
          placeholder=""
          style="width: 100px"
        >
          <el-option label="上海2222222" value="shanghai" />
          <el-option label="北京111111111111" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="包含种子关键词">
        <el-input v-model="formData.keywords" placeholder="关键词" clearable />
      </el-form-item>
      <el-form-item label="是否忽略同义词">
        <el-radio-group v-model="formData.synonym">
          <el-radio value="1">是</el-radio>
          <el-radio value="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
    require: true
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])
const formData = reactive({ ...props.modelValue })

watch(
  formData,
  (newValue) => {
    console.log('v-model更新')
    emit('update:modelValue', newValue)
  },
  { deep: true }
)

//
const input = ref('')
const onSubmit = () => {
  emit('submit')
}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 190px;

  .btn {
    width: 90px !important;
    margin-right: -15px;
    height: 40px;
  }
  .form-inline {
    width: 600px;
    margin-top: 35px;
    text-align: left;
  }
}
</style>
