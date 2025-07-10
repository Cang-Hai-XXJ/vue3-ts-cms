<template>
  <div v-if="visible" class="popup-overlay">
    <div class="popup-content">
      <span class="close-button" @click="close">
        <el-icon><Close /></el-icon>
      </span>
      <h2 v-if="title">Ad Title</h2>
      <p v-if="content">This is an ad popup.</p>
      <img src="@/assets/img/get100.png" alt="" />
      <div class="customButton" @click="invite"></div>
    </div>
  </div>
  <InvitePopup :visible="visible1" @close="close1"></InvitePopup>
</template>

<script>
import { ref } from 'vue'
import InvitePopup from './InvitePopup.vue'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: Boolean,
      required: true
    },
    content: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  components: {
    InvitePopup
  },
  setup(props, { emit }) {
    const visible1 = ref(false)
    const close = () => {
      emit('close', false)
    }
    const close1 = () => {
      visible1.value = false
    }
    const invite = () => {
      emit('close', false)
      visible1.value = true
    }
    return {
      close,
      close1,
      invite,
      InvitePopup,
      visible1
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
  max-width: 400px;
  width: 90%;
  position: relative;
  /* pointer-events: all; */

  img {
    width: 400px;
    height: 681.28px;
  }
  .customButton {
    position: absolute;
    bottom: 126px;
    /* background-color: red; */
    left: 50%;
    width: 300px;
    height: 60px;
    transform: translate(-50%);
    cursor: pointer;
  }
}

.close-button {
  position: absolute;
  top: 105px;
  right: -30px;
  cursor: pointer;
  font-size: 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
  width: 30px;
  height: 30px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
