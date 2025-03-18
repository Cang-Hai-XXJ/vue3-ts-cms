<template>
  <img :src="src" alt="filter" />
</template>

<script setup>
import { computed } from 'vue'
const prefix = '~@/assets/img/'
const suffix = '.png'
const src = computed(() => prefix + props.iconName.value + suffix)

const props = defineProps({
  iconName: {
    type: String,
    require: true
  }
})
</script>
<style scoped lang="less">
img {
  width: 16px;
  height: 16px;
}
</style>
