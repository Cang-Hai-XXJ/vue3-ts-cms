<template>
  <div class="nav-user">
    <img class="avatar" src="~@/assets/img/logo.svg" alt="avatar" />
    <div v-if="!collapse" class="name">果果果果</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useStoreWithModules } from '@/store'
import { pathMap2Menu } from '@/utils/map-menus'

const store = useStoreWithModules()

defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="less" scoped>
.nav-user {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  color: #4f5b67;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0 20px;
  gap: 20px;
  border-top: 1px solid var(--border-color);
  font-size: 16 px;
  .avatar {
    width: 32px;
    height: 32px;
    img {
      object-fit: contain;
    }
  }
}
</style>
