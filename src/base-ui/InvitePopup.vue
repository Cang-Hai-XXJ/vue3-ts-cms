<template>
  <div v-if="visible" class="popup-overlay">
    <div class="popup-content">
      <span class="close-button" @click="close">
        <!-- <el-icon><Close /></el-icon> -->
      </span>
      <img src="@/assets/img/invite.png" alt="" />
      <div class="customButton" @click="copy"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { copyToClipboard } from '@/utils/util.ts'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const close = () => {
      emit('close', false)
    }
    const copy = () => {
      copyToClipboard('url')
    }
    return {
      close,
      copy
    }
  }
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow: hidden; /* Prevent scrolling */
  /* pointer-events: none; */
}

.popup-content {
  /* background-color: white; */
  /* padding: 20px;
  border-radius: 5px; */
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
  width: auto;
  position: relative;
  /* pointer-events: all; */

  img {
    width: 604px;
    height: 543px;
  }
  .customButton {
    position: absolute;
    bottom: 48px;
    /* background-color: red; */
    left: 50%;
    width: 265px;
    height: 46px;
    transform: translate(-50%);
    cursor: pointer;
  }
}

.close-button {
  position: absolute;
  top: 22px;
  right: 32px;
  cursor: pointer;
  font-size: 20px;
  color: #fff;
  /* background-color: rgba(0, 0, 0, 0.2); */
  width: 30px;
  height: 30px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
