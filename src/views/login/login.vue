<template>
  <div class="header">
    <img class="icon" src="~img/home-icon-black.png" />
    <div class="title">选品大师</div>
  </div>
  <div class="login">
    <img src="@/assets/img/login-icon.png" alt="" />
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
.header {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 80px;
  background: #ffffff;
  border-bottom: 1px solid var(--border-color);
  padding-left: 70px;
  img {
    width: 30px;
    height: 30px;
    margin-right: 15px;
  }
  .title {
    font-family: Microsoft YaHei;
    font-size: 28px;
    font-weight: bold;
    color: #0d0d54;
  }
}
.login {
  height: calc(100% - 80px);
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-image: url('assets/img/login-bg.png');
  background-color: linear-gradient(269deg, #d3e3ff 0%, #f3fbff 99%);
  background-size: cover;
  img {
    width: 500px;
    height: 500px;
  }
}
</style>
