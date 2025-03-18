<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts" setup()>
import { defineComponent } from 'vue'
import loginPanel from './cpns/login-panel2.vue'
export default defineComponent({
  components: { loginPanel }
})
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('assets/img/x13jqd.jpg');
  // background-image: url('assets/img/login-bg.svg');
  background-size: cover;
}
</style>
