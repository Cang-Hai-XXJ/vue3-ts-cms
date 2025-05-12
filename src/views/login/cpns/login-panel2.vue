<template>
  <div class="login-panel">
    <!-- <el-icon class="close"><Close /></el-icon> -->

    <el-tabs
      v-model="activeName"
      type=""
      class="login-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="手机登录" name="first">
        <section class="phone-login">
          <div class="box">
            <!-- <div class="box-title">手机号登录</div> -->
            <div class="box-content">
              <el-form :rules="rules" :model="userForm" ref="ruleFormRef">
                <el-form-item prop="phone">
                  <el-input
                    placeholder="请输入手机号"
                    :input-style="inputStyle"
                    v-model="userForm.phone"
                    maxLength="11"
                  >
                    <template #prepend>+86</template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="authCode">
                  <el-input
                    :input-style="inputStyle"
                    placeholder="请输入手机验证码"
                    v-model="userForm.authCode"
                  >
                    <template #append>
                      <el-button
                        key="primary"
                        type="primary"
                        class="authCode"
                        color="#4040E9"
                        :text="true"
                        @click="handleSendSms"
                        :disabled="time < 60"
                      >
                        {{ time < 60 ? time + 's' : '获取验证码' }}
                      </el-button>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="captchaCode">
                  <div class="verify-code">
                    <el-input
                      :input-style="inputStyle2"
                      placeholder="请输入图形验证码"
                      v-model="userForm.captchaCode"
                    />
                    <div class="authCode-box" @click="handleGetCaptchaCode">
                      <img :src="captchaCodeSrc" alt="captchaCode" />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="protocol">
                  <div class="box-footer">
                    <el-button
                      class="login-btn"
                      type="primary"
                      @click="loginAction"
                      @keyDown.enter="loginAction"
                      >登录</el-button
                    >
                    <el-checkbox class="protocol" v-model="userForm.protocol"
                      >勾选即代表您阅读并同意
                      <span class="blue">《用户协议》</span>与<span class="blue"
                        >《隐私政策》</span
                      >
                      未注册手机号将自动注册
                    </el-checkbox>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </section>
      </el-tab-pane>
      <el-tab-pane label="扫码登录" name="second">
        <section class="wx-login">
          <div class="box">
            <!-- <img class="box-icon" src="~@/assets/img/home-icon.png" />
            <div class="box-title">欢迎来到选品大师</div>
            <div class="box-desc">可使用微信扫码登录</div> -->
            <vueQr :text="qrCodeUrl" class="box-qr-code" id="wxQr"></vueQr>
            <p>使用微信扫码登录</p>
          </div>
        </section>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'

import {
  captchaCheck,
  getCaptchaCode,
  smsLogin,
  sendSms,
  getWxLoginUrl,
  register
} from '@/service/request/login/login'
import { localCache } from '@/utils/localCache'
import { BASE_REDIRECT } from '@/service/request/config'
import type { TabsPaneContext } from 'element-plus'
import router from '@/router'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
// 短信验证码
const time = ref(60)

const handleSendSms = () => {
  if (/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(userForm.phone)) {
    if (/^[A-z0-9]{1,12}$/.test(userForm.captchaCode)) {
      sendSms({
        imageUuid: uuid.value,
        imageCode: userForm.captchaCode,
        tel: userForm.phone
      })
        .then(() => {
          ElMessage.success('验证码已发送')
          const timer = setInterval(() => {
            time.value--
            console.log(time.value)

            if (time.value <= 0) {
              clearInterval(timer)
              time.value = 60
            }
          }, 1000)
        })
        .catch((err) => {
          ElMessage.error(err)
        })
    } else {
      ElMessage.error('请填写图形验证码')
    }
  } else {
    ElMessage.error('请填写正确的手机号')
  }
}
// 图片验证码逻辑
const captchaCodeSrc = ref('')
const uuid = ref('')
const handleGetCaptchaCode = () => {
  getCaptchaCode()
    .then((res) => {
      // 获取验证码成功
      captchaCodeSrc.value = 'data:image/png;base64,' + res.image
      uuid.value = res.uuid
    })
    .catch(() => {
      // 获取验证码失败
      ElMessage.error('获取验证码失败')
    })
}
handleGetCaptchaCode()

// 验证码验证
const validateCode = () => {
  return new Promise((resolve, reject) => {
    captchaCheck({
      imageUuid: uuid.value,
      imageCode: userForm.captchaCode
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

//登录
const ruleFormRef = ref<FormInstance>()
const loginAction = () => {
  ruleFormRef.value?.validate(async (valid, fields) => {
    if (valid) {
      validateCode()
        .then(() => {
          smsLogin(BASE_REDIRECT, {
            tel: userForm.phone,
            authCode: userForm.authCode,
            wxInfoId: localCache.getCache('user')?.wxId
          })
            .then((res) => {
              //token
              localCache.setCache('token', res.jwtToken.token)
              // 用户信息
              localCache.setCache('user', { ...res.user, wxId: res.wxInfoId })
              router.push('main/index')
            })
            .catch(() => {
              ElMessage.error('登陆失败，请稍后重试')
            })
        })
        .catch((err) => {
          ElMessage.error(err.message)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 表单数据+验证
const userForm = reactive({
  phone: '',
  authCode: '',
  captchaCode: '',
  protocol: ''
})
const rules = reactive<FormRules>({
  phone: [
    {
      required: true,
      message: '请输入手机号'
    },
    {
      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      message: '请输入正确的手机号'
    }
  ],
  authCode: [
    {
      required: true,
      message: '请输入手机验证码'
    }
    // {
    //   pattern: /^[A-z0-9]{6,12}$/,
    //   message: '请输入6到12位数的字母数字组合~'
    // }
  ],
  captchaCode: [
    {
      required: true,
      message: '请输入图像验证码'
    }
  ],
  protocol: [
    {
      validator: (rule, val, cb) => {
        if (val) {
          cb()
        } else {
          cb(new Error('请勾选同意协议!'))
        }
      }
    }
  ]
})

//wx二维码
const qrCodeUrl = ref('')
getWxLoginUrl(BASE_REDIRECT).then((res) => {
  qrCodeUrl.value = res.data
})

// onMounted(() => {
//   const s = document.createElement('script')
//   s.type = 'text/javascript'
//   s.src = 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
//   const wxElement = document.body.appendChild(s)
//   // eslint-disable-next-line no-undef
//   const obj = new WxLogin({
//     id: 'wxQr', // 需要显示的容器id
//     appid: '"wx015f3d5f5d78f1"', // 公众号appid wx*******
//     scope: 'snsapi_login', // 网页默认即可
//     redirect_uri: '"http://www.vosd.com"', // 授权成功后回调的url
//     state: Math.ceil(Math.random() * 1000), // 可设置为简单的随机数加session用来校验
//     style: 'black', // 提供"black"、"white"可选。二维码的样式
//     stylelite: 1
//     // href: 'https://www.baidu.com/pcScan.css' // 外部css文件url，需要https
//   })
// })

const inputStyle = {
  width: '100%',
  height: '50px'
}
const inputStyle2 = {
  width: '80%',
  height: '50px'
}
</script>

<style lang="less" scoped>
//tabs style
:deep(.el-tabs__header) {
  border: none;
  margin-top: 50px;
}
:deep(.el-tabs__nav-wrap:after) {
  width: 0;
}
:deep(.el-tabs__active-bar) {
  background-color: #4040f2;
}
:deep(.el-tabs__nav) {
  height: 45px;
  border: none !important;
  padding-left: 45px;
}
:deep(.el-tabs__item) {
  font-size: 24px;
  font-weight: bold;
  color: #9ca3af;
}
:deep(.is-active) {
  color: #4040f2 !important;
}
:deep(.el-form-item) {
  margin-bottom: 20px;
}
.login-panel {
  font-family: Inter;
  // position: absolute;
  // left: 283px;
  // top: 201px;
  width: 500px;
  height: 600px;
  border-radius: 20px;
  opacity: 1;
  background-color: #fff;
  /* 自动布局 */
  display: flex;
  flex-direction: column;
  section {
    width: 100%;
    height: 500px;
  }
  .box-footer {
    margin-top: 30px;
  }
  .wx-login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    // border-radius: 20px 0 0 20px;
    // background-image: url('assets/img/image27.png');
    // background-color: var(--main-color);
    .box {
      display: flex;
      width: 100%;
      height: 100%;
      padding: 100px 50px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      bottom: 30px;
      p {
        font-family: Inter;
        font-size: 20px;
        font-weight: normal;
        text-align: center;
        color: #333333;
      }
      .box-icon {
        width: 90px;
        height: 90px;
      }
      .box-title {
        font-size: 28px;
        font-weight: 600;
      }
      .box-desc {
        font-size: 16px;
      }
      .box-qr-code {
        width: 220px;
        height: 220px;
        // overflow: hidden;
        /deep/ iframe {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .phone-login {
    width: 100%;
    .box {
      display: flex;
      width: 100%;
      height: 100%;
      padding: 50px;
      flex-direction: column;
      align-items: center;
      color: #000;
      gap: 40px;
      &-title {
        font-size: 36px;
      }
      &-content {
        width: 100%;
        .authCode {
          width: 100px;
        }
        // width: 100%;
        .verify-code {
          width: 100%;
          display: flex;
          gap: 15px;
        }
        .authCode-box {
          width: 164px;
          height: 50px;
          border-radius: 3px;
          border: 1px solid #d4d4d4;
          img {
            width: 100%;
            height: 100%;
          }
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
        .protocol {
          position: relative;
          top: 10px;
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
