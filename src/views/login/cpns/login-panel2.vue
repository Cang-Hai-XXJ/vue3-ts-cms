<template>
  <div class="login-panel">
    <el-icon class="close"><Close /></el-icon>
    <section class="wx-login">
      <div class="box">
        <div class="box-icon"></div>
        <div class="box-title">欢迎来到选品大师</div>
        <div class="box-desc">可使用微信扫码登录</div>
        <div class="box-qr-code" id="wxQr"></div>
      </div>
    </section>
    <section class="phone-login">
      <div class="box">
        <div class="box-title">手机号登录</div>
        <div class="box-content">
          <el-form :rules="rules" :model="user" ref="ruleFormRef">
            <el-form-item prop="phone">
              <el-input
                placeholder="请输入手机号"
                :input-style="inputStyle"
                v-model="user.phone"
              >
                <template #prepend>+86</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                :input-style="inputStyle"
                placeholder="请输入手机验证码"
                v-model="user.password"
              >
                <template #append>
                  <el-button
                    key="primary"
                    type="primary"
                    color="#4040E9"
                    :text="true"
                  >
                    获取验证码
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="authCode">
              <div class="verify-code">
                <el-input
                  :input-style="inputStyle2"
                  placeholder="请输入图形验证码"
                  v-model="user.authCode"
                />
                <el-input :input-style="inputStyle3" v-model="user.authCode" />
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="box-footer">
          <el-button class="login-btn" type="primary" @click="handleClickLogin"
            >登录</el-button
          >
          <el-checkbox class="checked2" v-model="checked2"
            >勾选即代表您阅读并同意
            <span class="blue">《用户协议》</span>与<span class="blue"
              >《隐私政策》</span
            >
            未注册手机号将自动注册
          </el-checkbox>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const user = reactive({
  phone: '',
  password: '',
  authCode: ''
})
const checked2 = ref<boolean>()
const rules = reactive<FormRules>({
  phone: [
    {
      required: true,
      message: '请输入手机号'
    },
    {
      pattern: /^[A-z0-9]{3,12}$/,
      message: '请输入正确的手机号'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入手机验证码'
    },
    {
      pattern: /^[A-z0-9]{6,12}$/,
      message: '请输入6到12位数的字母数字组合~'
    }
  ]
})

const handleClickLogin = () => {
  console.log('handleClickLogin')
}
onMounted(() => {
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.src = 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
  const wxElement = document.body.appendChild(s)
  // eslint-disable-next-line no-undef
  const obj = new WxLogin({
    id: 'wxQr', // 需要显示的容器id
    appid: '"wx015f3d5f5d78f1"', // 公众号appid wx*******
    scope: 'snsapi_login', // 网页默认即可
    redirect_uri: '"http://www.vosd.com"', // 授权成功后回调的url
    state: Math.ceil(Math.random() * 1000), // 可设置为简单的随机数加session用来校验
    style: 'black', // 提供"black"、"white"可选。二维码的样式
    stylelite: 1
    // href: 'https://www.baidu.com/pcScan.css' // 外部css文件url，需要https
  })
})

const inputStyle = {
  width: '100%',
  height: '36px'
}
const inputStyle2 = {
  width: '80%',
  height: '36px'
}
const inputStyle3 = {
  flex: 1
}
</script>

<style lang="less" scoped>
.login-panel {
  font-family: Inter;
  position: absolute;
  left: 283px;
  top: 201px;
  width: 880px;
  height: 622px;
  border-radius: 20px;
  opacity: 1;
  background-color: #fff;
  /* 自动布局 */
  display: flex;
  .wx-login {
    width: 400px;
    height: 100%;
    border-radius: 20px 0 0 20px;
    background-image: url('assets/img/image27.png');
    background-color: var(--main-color);
    .box {
      display: flex;
      width: 100%;
      height: 100%;
      padding: 100px 50px;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      .box-icon {
        width: 56px;
        height: 56px;
        background-image: url('assets/img/image22.png');
      }
      .box-title {
        font-size: 28px;
        font-weight: 600;
      }
      .box-desc {
        font-size: 16px;
      }
      .box-qr-code {
        width: 200px;
        height: 200px;
        background-color: #fff;
        // overflow: hidden;
        /deep/ iframe {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .phone-login {
    width: 480px;
    .box {
      display: flex;
      width: 100%;
      height: 100%;
      padding: 100px 50px;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      color: #000;
      &-title {
        font-size: 36px;
      }
      &-content {
        // width: 100%;
        .verify-code {
          display: flex;
          gap: 15px;
        }
      }
      &-footer {
        width: 100%;
        .login-btn {
          width: 100%;
          height: 50px;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 5px;
          // border-radius: 3px;
          background: var(--main-color);
        }
        .blue {
          color: var(--main-color);
        }
        .checked2 {
          white-space: break-spaces;
          padding: 25px 0px;
          font-size: 12px;
          font-weight: normal;
          /deep/ .el-checkbox__label {
            line-height: 1.5;
          }
        }
      }
    }
  }
  .close {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 30px;
  }
  .close:hover {
    cursor: pointer;
  }
}
</style>
