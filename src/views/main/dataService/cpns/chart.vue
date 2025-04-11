<template>
  <div :style="{ height }" class="chart"></div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import * as echarts from 'echarts'
import { themeColors } from '@/config/constant'
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
    require: true
  },
  height: {
    type: String,
    default: '450px'
  }
})

onMounted(() => {
  const instance = getCurrentInstance()
  const el = instance?.proxy?.$el
  // console.log(root.value)
  // console.log(instance?.proxy?.$el)

  const opt = {
    color: themeColors,
    ...props.modelValue
  }
  echarts.init(el).setOption(opt)
  window.addEventListener('resize', () => {
    echarts.init(el).resize()
  })
})
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
}
</style>
