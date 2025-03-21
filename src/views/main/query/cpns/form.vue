<template>
  <div class="form">
    <div class="box">
      <div class="box-title">行业指数 精准导航</div>
      <div class="box-content">
        <el-form
          :rules="rules"
          :model="form"
          ref="ruleFormRef"
          label-position="top"
          label-width="auto"
          style="max-width: 600px"
        >
          <el-form-item
            prop="keywords"
            :label="index === 0 ? '关键词' : ''"
            v-for="(item, index) of form.keywords"
            :key="index"
          >
            <el-input
              style="width: 75%; height: 36px"
              placeholder="请仔细核对关键词大小写及拼写"
              v-model="form.keywords[index]"
            >
            </el-input>
            <el-button
              style="width: 23%; height: 36px; margin-left: 2%"
              class="gap"
              :class="index === form.keywords.length - 1 ? 'blue' : 'red'"
              :type="index === form.keywords.length - 1 ? 'primary' : 'danger'"
              plain
              @click="handleClickInput(index)"
            >
              <el-icon class="btn-icon"
                ><component
                  :is="
                    index === form.keywords.length - 1 ? 'Plus' : 'DeleteFilled'
                  "
                ></component>
              </el-icon>
              <span>{{
                index === form.keywords.length - 1 ? '添加' : '移除'
              }}</span>
            </el-button>
          </el-form-item>
          <el-form-item label="国家">
            <el-select
              style="width: 100%; height: 36px"
              v-model="form.country"
              placeholder="Activity zone"
              clearable
            >
              <el-option label="美国" value="am" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-select
              style="width: 100%; height: 36px"
              v-model="form.date"
              placeholder="Activity zone"
              clearable
            >
              <el-option label="过去3个月" value="shanghai" />
              <el-option label="过去1个月" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="box-footer">
        <el-button class="login-btn" type="primary" @click="handleClickQuery"
          >查询</el-button
        >
        <el-button class="login-btn" type="primary" @click="handleClickReset"
          >重置</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const form = reactive({
  keywords: [''],
  country: '',
  date: ''
})
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

// 当不再需要此侦听器时:
// stop()
const emit = defineEmits(['toggle'])
const val = ref(false)
const handleClickQuery = () => {
  console.log('handleClickQuery')
  emit('toggle', false)
}
const handleClickReset = () => {
  form.country = ''
  form.date = ''
  form.keywords = ['']
}
const handleClickInput = (index: number) => {
  if (index === form.keywords.length - 1) {
    form.keywords.push('')
  } else {
    form.keywords.splice(index, 1)
  }
}

const inputStyle = {
  width: '90%',
  height: '36px'
}
</script>

<style lang="less" scoped>
.form {
  width: 100%;
  height: 100%;
  background: linear-gradient(269deg, #d3e3ff 1%, #f3fbff 99%);
  .blue {
    color: #4040f2;
  }
  .red {
    color: #ff513a;
  }
  /deep/ .el-input__inner {
    height: 36px;
  }
  .btn-icon {
    font-size: 18px;
    gap: 10px;
  }
  .flex {
    gap: 10px;
  }
  .box {
    position: absolute;
    left: 290px;
    top: 135px;
    width: 400px;
    height: 550px;
    &-title {
      font-size: 40px;
      font-weight: bold;
      color: #4040f2;
      margin-bottom: 40px;
    }
    &-content {
      width: 100%;
    }
    &-footer {
      display: flex;
      width: 100%;
      margin-top: 70px;
      column-count: 2;
      column-gap: 10px;
      /deep/ .el-button {
        width: 100%;
        height: 46px;
        border-radius: 3px;
        font-size: 16px;
        border-color: #d4d4d4;
        &:nth-child(1) {
          color: #ffffff;
          background: #4040f2;
        }
        &:nth-child(2) {
          color: #333333;
          background: #ffffff;
        }
      }
    }
  }
}
</style>
