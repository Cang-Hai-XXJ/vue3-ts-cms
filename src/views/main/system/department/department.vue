<template>
  <div class="department">
    <el-form label-width="100">
      <el-row>
        <el-col :span="8">
          <el-form-item label="部门">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门">
            <el-select style="width: 100%">
              <el-option>篮球</el-option>
              <el-option>篮球</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门">
            <el-input />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'department',
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
