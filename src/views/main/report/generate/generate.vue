<template>
  <div class="generate">
    <div v-if="paySuccess" class="success-box">
      <img src="~@/assets/img/paySuccess.png" alt="paySuccess" />
      <div class="title">支付成功</div>
      <div class="desc">
        报告生成需3～5个工作日，请耐心等待，生成后会以短信形式通知您
        请登录网站下载报告
      </div>
      <el-button class="btn" type="primary" @click="backHome"
        >返回首页</el-button
      >
    </div>
    <div v-else class="form-box">
      <div class="title">创建选品报告</div>
      <div class="content">
        <el-form
          :model="form"
          label-width="auto"
          label-position="top"
          style="max-width: 600px"
        >
          <el-form-item label="商品名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="国家" label-width="50">
            <el-select v-model="form.region" placeholder=" ">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="地区">
            <el-select v-model="form.region" placeholder=" ">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="版本">
            <el-radio-group v-model="form.resource" class="radio-group">
              <el-radio-button value="Sponsor">普通版</el-radio-button>
              <el-radio-button value="Venue">高级版</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="其他要求">
            <el-input
              v-model="form.desc"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 7 }"
            />
          </el-form-item>

          <el-form-item>
            <el-checkbox class="checked2" v-model="checked"
              >我已阅读并同意
              <span class="blue" @click.prevent>《用户协议》</span>
            </el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button class="btn" type="primary" @click="onSubmit"
              >生成报告</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <payPanel v-model="visible"></payPanel>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import payPanel from '@/components/pay-panel'
import router from '@/router'
// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
const checked = ref(false)
const visible = ref(false)
const paySuccess = ref(false)

const onSubmit = () => {
  paySuccess.value = true
}
const backHome = () => {
  paySuccess.value = false
  // router.go(-1)
}
</script>

<style scoped lang="less">
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
    p6 {
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

.generate {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(269deg, #d3e3ff 1%, #f3fbff 99%);
  .success-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 450px;
    height: 450px;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      position: relative;
      top: 60px;
      width: 176px;
      height: 176px;
    }
    .title {
      font-family: Microsoft YaHei;
      font-size: 20px;
      font-weight: bold;
      line-height: 36px;
      text-align: center;
      letter-spacing: 0px;
    }
    .desc {
      font-family: PingFang HK;
      font-size: 14px;
      font-weight: normal;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0px;
    }
    .btn {
      width: 450px;
      height: 46px;
    }
  }
  .form-box {
    width: 546px;
    height: 709px;
    border-radius: 3px;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    text-align: start;
    padding: 40px;
    .title {
      font-size: 24px;
      font-weight: bold;
      line-height: 28.8px;
      margin-bottom: 20px;
    }
    .content {
      .radio-group {
        gap: 20px;
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
      .btn {
        height: 45px;
        font-size: 16px;
      }
      .blue {
        color: var(--main-color);
      }
      .checked2 {
        white-space: break-spaces;
        font-size: 12px;
        font-weight: normal;
        /deep/ .el-checkbox__label {
          line-height: 1.5;
        }
      }
    }
  }
}
</style>
