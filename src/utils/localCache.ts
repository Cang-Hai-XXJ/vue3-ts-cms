class LocalCache {
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

class SessionCache {
  setCache(key: string, val: any) {
    window.sessionStorage.setItem(key, JSON.stringify(val))
  }
  getCache(key: string) {
    const val = window.sessionStorage.getItem(key)
    if (val) {
      return JSON.parse(val)
    }
  }
  clearCache() {
    window.sessionStorage.clear()
  }
  deleteCache(key: string) {
    window.sessionStorage.removeItem(key)
  }
}

export const sessionCache = new SessionCache()
export const localCache = new LocalCache()
