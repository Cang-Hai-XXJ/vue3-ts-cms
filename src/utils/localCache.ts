class localCache {
  setCache(key: string, val: any) {
    window.localStorage.setItem(key, JSON.stringify(val))
  }
  getCache(key: string) {
    const val = window.localStorage.getItem(key)
    if (val) {
      return JSON.parse(val)
    }
  }
  clearCache() {
    window.localStorage.clear()
  }
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
}

export default new localCache()
