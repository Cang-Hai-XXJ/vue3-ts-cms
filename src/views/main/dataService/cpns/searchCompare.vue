<template>
  <div class="search">
    <div class="flex gap-2">
      <div>
        <span>关键词</span>
        <el-tag
          v-for="(tag, index) in dynamicTags"
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
          v-else-if="!inputValue && dynamicTags.length < 3"
          class="button-new-tag"
          @click="showInput"
        >
          + 添加对比
        </el-button>
        <el-button class="btn" @click="submit"> 确定 </el-button>
      </div>
      <div>
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
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue'
import type { InputInstance } from 'element-plus'
import { themeColors } from '@/config/constant'

const inputValue = ref('')
const dynamicTags = ref([])
const inputVisible = ref(false)
const InputRef = ref<InputInstance>()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const submit = () => {
  console.log(1)
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
    require: true
  }
})

const emit = defineEmits(['update:modelValue'])
const formData = reactive({ ...props.modelValue })

watch(
  formData,
  (newValue) => {
    console.log('v-model更新')
    emit('update:modelValue', newValue)
  },
  { deep: true }
)
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 140px;
  text-align: left;
  margin-left: 20px;
  span {
    color: #4b5563;
    font-size: 14px;
    margin-right: 20px;
  }
  .tag {
    margin-right: 20px;
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
