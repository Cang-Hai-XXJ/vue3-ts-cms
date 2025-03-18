<template>
  <div class="my-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="formItemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  v-model="formData[item.field]"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.field]"
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  v-bind="item.attrs"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.label }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="formData[item.field]"
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  v-bind="item.attrs"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { PropType, reactive, watch } from 'vue'
import { IFormItem } from '../types'
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
    require: true
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  },
  formItemStyle: {
    type: Object,
    default: () => ({
      padding: '10px 30px'
    })
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
.my-form {
  padding-top: 20px;
}
</style>
