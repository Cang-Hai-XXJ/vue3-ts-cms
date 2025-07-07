// 基于element-plus 工具函数
import { ElMessage } from 'element-plus'

export const isObject = (key: any) => {
  return Object.prototype.toString.call(key) === '[object Object]'
}

export const isArray = (key: any) => {
  return Object.prototype.toString.call(key) === '[object Array]'
}

export const isEmpty = (key: any) => {
  if (typeof key === 'undefined' || key === null) {
    return true
  } else if (isObject(key)) {
    return Object.values(key).length <= 0
  } else if (isArray(key)) {
    return key.length <= 0
  } else if (typeof key === 'string') {
    return key.trim().length <= 0
  } else if (typeof key === 'number') {
    return Number.isNaN(key)
  } else {
    return false
  }
}

export const copyToClipboard = (key: string) => {
  if (
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    navigator.clipboard.writeText(key).then(
      () => {
        ElMessage({
          message: '复制文本成功',
          type: 'success'
        })
      },
      () => {
        ElMessage.error('复制文本失败')
      }
    )
  } else if (document.execCommand('copy')) {
    const tempInput = document.createElement('input')
    tempInput.value = key
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    ElMessage({
      message: '复制文本成功',
      type: 'success'
    })
  } else {
    ElMessage.error('浏览器暂不支持')
  }
}
