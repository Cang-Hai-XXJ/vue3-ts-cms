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

export const isObject = (key: any) => {
  return Object.prototype.toString.call(key) === '[object Object]'
}

export const isArray = (key: any) => {
  return Object.prototype.toString.call(key) === '[object Array]'
}
