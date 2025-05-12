<template>
  <div class="search">
    <div class="flex gap-2">
      <div class="flex-line">
        <span>关键词</span>
        <el-tag
          v-for="(tag, index) in formData.keywords"
          class="tag"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
          size="large"
          :style="{ color: themeColors[index] }"
          color="#fff"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          style="width: 200px"
          placeholder="输入关键词，按回车确认"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else-if="!inputValue && formData.keywords.length < maxLength"
          class="button-new-tag"
          @click="showInput"
        >
          + 添加对比
        </el-button>
        <el-button class="btn" @click="submit"> 确定 </el-button>
      </div>
      <div>
        <el-form :inline="true" :model="formData" class="form-inline">
          <el-form-item label="地区">
            <el-select
              v-model="formData.region"
              clearable
              placeholder="请选择地区"
              style="width: 150px"
            >
              <el-option
                v-for="item of locationOptions"
                :key="item"
                :label="item.locationName"
                :value="item.locationCode"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="语言">
            <el-select
              v-model="formData.language"
              clearable
              placeholder="请选择语言"
              style="width: 150px"
            >
              <el-option
                v-for="item of languageOptions"
                :key="item"
                :label="item.languageName"
                :value="item.languageCode"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue'
import type { InputInstance } from 'element-plus'
import { themeColors } from '@/config/constant'
import { getLocations, getLanguages } from '@/service/request/dataService'
import {
  GetLanguagesRes,
  GetLocationsRes
} from '@/service/request/dataService/type'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
    require: true
  },
  maxLength: {
    type: Number,
    default: 10
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
const inputValue = ref('')
// const formData.keywords = ref<string[]>([])
const inputVisible = ref(false)
const InputRef = ref<InputInstance>()
const languageOptions = ref<GetLanguagesRes[]>()
const locationOptions = ref<GetLocationsRes[]>()
getLocations('').then((res) => {
  // console.log(res)
  locationOptions.value = res
})
getLanguages('').then((res) => {
  languageOptions.value = res
})

const handleClose = (tag: string) => {
  formData.keywords.splice(formData.keywords.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const submit = () => {
  emit('submit')
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    formData.keywords.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 140px;
  text-align: left;
  margin-left: 20px;
  .flex-line {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }
  span {
    color: #4b5563;
    font-size: 14px;
    // margin-right: 20px;
  }
  .tag {
    margin-right: 5px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .btn {
    width: 80px !important;
    margin-left: 30px;
  }
}
</style>
