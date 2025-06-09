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
          <el-row>
            <el-form-item label="地区">
              <el-select
                v-model="formData.region"
                clearable
                placeholder="请选择地区"
                style="width: 150px"
                @change="changeRegion"
              >
                <el-option
                  v-for="item of locationOptions"
                  :key="item"
                  :label="item.locationName"
                  :value="item.locationCode"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="language" label="语言">
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
            <el-form-item v-if="keyWordsType" label="类型">
              <el-select
                v-model="formData.type"
                clearable
                placeholder="请选择类型"
                style="width: 150px"
              >
                <el-option label="web" value="web" />
                <el-option label="news" value="news" />
                <el-option label="ecommerce" value="ecommerce" />
              </el-select>
            </el-form-item>
          </el-row>

          <el-row v-if="deep">
            <el-form-item label="关联深度">
              <el-select
                v-model="formData.deep"
                clearable
                placeholder=""
                style="width: 180px"
              >
                <el-option label="1 – 6 keywords" :value="1" />
                <el-option disabled label="2 – 42 keywords" :value="2" />
                <el-option disabled label="3 – 258 keywords" :value="3" />
                <el-option disabled label="4 – 1554 keywords" :value="4" />
              </el-select>
            </el-form-item>
            <el-form-item label="是否包含种子关键词">
              <el-radio-group v-model="formData.seed">
                <el-radio :value="true">是</el-radio>
                <el-radio :value="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否忽略同义词">
              <el-radio-group v-model="formData.synonym">
                <el-radio :value="true">是</el-radio>
                <el-radio :value="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-form-item v-if="date" label="时间范围">
            <el-date-picker
              v-model="formData.dateRange"
              type="daterange"
              unlink-panels
              range-separator="To"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="YYYY-MM-DD"
              :shortcuts="shortcuts"
            />
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
const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
    require: true
  },
  maxLength: {
    type: Number,
    default: 10
  },
  deep: {
    type: Boolean,
    default: false
  },
  keyWordsType: {
    type: Boolean,
    default: false
  },
  language: {
    type: Boolean,
    default: true
  },
  date: {
    type: Boolean,
    default: false
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
const languageOptions = ref<GetLanguagesRes[]>(
  sessionCache.getCache('locationOptions')
)
const locationOptions = ref<GetLocationsRes[]>(
  sessionCache.getCache('languageOptions')
)

const changeRegion = (val: any) => {
  getLanguages(val).then((res) => {
    formData.language = ''
    languageOptions.value = res
    sessionCache.setCache('languageOptions', res)
  })
}
// 缓存通用数据
import { sessionCache } from '@/utils/localCache'
import { isEmpty } from '@/utils/util'
// if (isEmpty(locationOptions.value)) {
getLocations('').then((res) => {
  // console.log(res)
  locationOptions.value = res
  sessionCache.setCache('locationOptions', res)
})
// }
// if (isEmpty(languageOptions.value)) {
getLanguages('').then((res) => {
  languageOptions.value = res
  sessionCache.setCache('languageOptions', res)
})
// }

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
  min-height: 90px;
  text-align: left;
  margin-left: 20px;
  .form-inline {
    .el-row {
      margin: 15px 0;
    }
  }
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
  .el-radio {
    margin-right: 10px;
  }
}
</style>
