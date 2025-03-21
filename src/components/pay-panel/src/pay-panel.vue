<template>
  <div>
    <el-dialog
      v-model="visible"
      :show-close="false"
      :width="width"
      class="pay-panel"
    >
      <template #header="{ close }">
        <div class="my-header">
          <img class="diamond" src="~@/assets/img/diamond.png" alt="diamond" />
          <el-icon @click="close" class="el-icon-close"
            ><CircleCloseFilled
          /></el-icon>
        </div>
      </template>
      <h4 class="titleClass">{{ title }}</h4>
      <div class="descClass">{{ desc }}</div>
      <h4 v-if="!isColumn" class="titleClass">支付方式</h4>

      <div class="content" :class="{ 'height-425px': isColumn }">
        <div v-if="isColumn" class="radioBox">
          <div
            v-for="(items, index) in radioGroup"
            :key="index"
            class="radioItem"
          >
            <p class="title">{{ items.title }}</p>
            <el-radio-group v-model="payType" class="radio-group">
              <el-radio-button
                v-for="(item, index) in items.radio"
                :key="index"
                :value="item.value"
                :style="{ height: Array.isArray(item.label) ? '60px' : '40px' }"
              >
                <template v-if="Array.isArray(item.label)">
                  <p>{{ item.label[0] }}</p>
                  <p class="red">{{ item.label[1] }}</p>
                </template>
                <p v-else>{{ item.label }}</p>
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <el-divider
          v-if="isColumn"
          direction="vertical"
          style="height: 100%; margin-right: 40px"
        />
        <div class="payBox" :class="{ 'flex-column': isColumn }">
          <img
            src="~@/assets/img/qrCode.png"
            alt="qrCode"
            :class="{ order1: isColumn }"
          />
          <div class="contentClass">
            <p>在线支付</p>
            <el-radio-group v-model="payType" class="radio-group">
              <el-radio-button value="Al">支付宝</el-radio-button>
              <el-radio-button value="Wx">微信</el-radio-button>
            </el-radio-group>
            <p>应付金额 <span>¥999.00</span></p>
            <p class="tips">剩余支付时间6时55分52秒，否则订单将自动失效</p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
const payType = ref('')
import { ref, watch, toRefs, computed, PropType } from 'vue'
const emit = defineEmits(['update:modelValue'])
import { radioItem } from './type'

const props = defineProps({
  modelValue: {
    type: Boolean,
    require: true
  },
  // width: {
  //   type: Number,
  //   default: 650
  // },
  title: {
    type: String,
    require: true
  },
  desc: {
    type: String,
    require: true
  },
  radioGroup: {
    type: Array as PropType<radioItem[]>,
    default: () => {
      return []
    }
  }
})

const visible = ref(false)
const { modelValue } = toRefs(props)
const isColumn = computed(() => !!props.radioGroup.length)
const width = computed(() => (isColumn.value ? 1050 : 650))

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
// 支付组件样式,需要外层添加DIV否则不生效，teleport
/deep/.el-dialog {
  padding-left: 40px;
  background: linear-gradient(180deg, #d8d8fe 0%, #ffffff 50%);
  text-align: start;
  padding-bottom: 50px;
}
.radio-group {
  gap: 20px;
  margin: 18px 0px 20px;
  color: #000;
  .red {
    font-size: 18px !important;
    color: #ff513a !important;
    margin-top: 2px !important;
  }
  // TODO: css
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
    background-color: #fff;
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
  /deep/ .el-radio-button__inner {
    min-height: 40px;
    width: auto;
    height: auto;
    line-height: 20px;
    min-width: 120px;
  }
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
  &:nth-child(1) {
    margin-top: 0;
  }
}
.descClass {
  font-family: PingFang HK;
  font-size: 14px;
  font-weight: normal;
  line-height: 24px;
  color: #333333;
}
.height-425px {
  height: 425px !important;
}
.content {
  height: 225px;
  display: flex;

  .radioBox {
    width: 540px;
    margin-top: 40px;
    .radioItem {
      .title {
        font-weight: 600;
      }
      p {
        color: #333333;
        font-size: 16px;
        font-weight: 500;
        margin: 0;
      }
      .radio-group {
        display: flex;
        gap: 12px;
      }
    }
  }
  .flex-column {
    flex-direction: column;
    align-items: start !important;
    margin-top: 54px;
  }
  .order1 {
    order: 1;
  }
  .payBox {
    // width: 100%;
    flex: 1;
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
        margin: 0;
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
      .tips {
        font-family: PingFang HK;
        font-size: 14px;
        font-weight: normal;
        line-height: 24px;
        color: #333333;
        margin: 0;
        margin-top: 5px;
      }
    }
  }
}
</style>
