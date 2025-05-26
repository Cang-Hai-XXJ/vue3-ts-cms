<template>
  <img v-if="iconName" :src="src" alt="filter" />
</template>

<script setup>
import { computed } from 'vue'
const prefix = '~@/assets/img/'
const suffix = '.png'
const props = defineProps({
  iconName: {
    type: String,
    require: true
  }
})
const src = computed(() => prefix + props.iconName.value + suffix)
</script>
<style scoped lang="less">
img {
  width: 16px;
  height: 16px;
}
</style>
