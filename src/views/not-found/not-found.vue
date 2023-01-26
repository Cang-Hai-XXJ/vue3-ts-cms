<template>
  <div class="not-found">
    <div class="not-found-img"></div>
    <div class="not-found-desc">页面未找到~</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.not-found {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  align-items: center;
  .not-found-img {
    width: 700px;
    height: 300px;
    margin-top: 30px;
    margin-bottom: 20px;
    background-image: url('assets/img/Not-Found.jpg');
    background-size: cover;
    background-position: center;
  }
}
</style>
