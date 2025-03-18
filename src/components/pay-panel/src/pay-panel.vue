<template>
  <el-dialog v-model="visible" :show-close="false" :width="width">
    <template #header="{ close }">
      <div class="my-header">
        <img class="diamond" src="~@/assets/img/diamond.png" alt="diamond" />
        <el-icon @click="close" class="el-icon-close"
          ><CircleCloseFilled
        /></el-icon>
      </div>
    </template>
    <h4 class="titleClass">高级版本订单详情</h4>
    <div class="descClass">高级版本，专属定制化报告，更详细全面的分析</div>
    <h4 class="titleClass">支付方式</h4>
    <div class="payBox">
      <img src="~@/assets/img/qrCode.png" alt="qrCode" />
      <div class="contentClass">
        <p>在线支付</p>
        <el-radio-group v-model="payType" class="radio-group">
          <el-radio-button value="Al">支付宝</el-radio-button>
          <el-radio-button value="Wx">微信</el-radio-button>
        </el-radio-group>
        <p>应付金额 <span>¥999.00</span></p>
        <p>剩余支付时间6时55分52秒，否则订单将自动失效</p>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
const payType = ref('')
import { ref, watch, toRefs } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    require: true
  },
  width: {
    type: Number,
    default: 650
  }
})
const visible = ref(false)
const { modelValue } = toRefs(props)

watch(
  modelValue,
  (newValue: boolean) => {
    visible.value = newValue
  },
  { deep: true }
)
watch(
  visible,
  (newValue: boolean) => {
    console.log('v-model更新', newValue)
    emit('update:modelValue', newValue)
  },
  { deep: true }
)
</script>

<style lang="less" scoped>
// 支付组件
/deep/.el-dialog {
  padding-left: 40px;
  background: linear-gradient(180deg, #d8d8fe 0%, #ffffff 50%);
  text-align: start;
  padding-bottom: 50px;
}
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  .diamond {
    width: 40px;
    height: 30px;
    position: relative;
    top: 20px;
  }
  .el-icon-close {
    font-size: 30px;
    color: rgb(128, 128, 128);
  }
}
.titleClass {
  font-family: Microsoft YaHei;
  font-size: 20px;
  font-weight: bold;
  line-height: 36px;
  margin-bottom: 10px;
  color: #373f47;
}
.descClass {
  font-family: PingFang HK;
  font-size: 14px;
  font-weight: normal;
  line-height: 24px;
  color: #333333;
}
.payBox {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  gap: 20px;
  img {
    width: 180px;
    height: 180px;
    border-radius: 3px;
    background: #ffffff;
    border: 1px solid #d4d4d4;
    padding: 15px;
  }
  .contentClass {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    p {
      font-family: PingFang HK;
      font-size: 16px;
      font-weight: 600;
      line-height: 16px;
      color: #333333;
      span {
        font-family: PingFang HK;
        font-size: 26px;
        font-weight: 600;
        line-height: 26px;
        color: #ff513a;
        position: relative;
        top: 3px;
        margin-left: 5px;
      }
    }
    p {
      font-family: PingFang HK;
      font-size: 14px;
      font-weight: normal;
      line-height: 24px;
      color: #333333;
      margin: 0;
      margin-top: 5px;
    }
    .radio-group {
      gap: 20px;
      margin: 10px 0px 15px;
      color: #000;
      /deep/.el-radio-button__inner {
        width: 113px;
        height: 36px;
        border-radius: 3px;
        font-family: PingFang SC;
        font-size: 14px;
        font-weight: 500;
        line-height: 18px;
        text-align: center;
        border: 1px solid #d4d4d4;
        box-sizing: content-box;
      }
      /deep/.el-radio-button.is-active
        .el-radio-button__original-radio:not(:disabled)
        + .el-radio-button__inner {
        background-color: #d8d8fe;
        border-color: #4040f2;
        color: #000;
      }
      /deep/.el-radio-button__inner:hover {
        color: #4040f2;
      }
    }
  }
}
</style>
