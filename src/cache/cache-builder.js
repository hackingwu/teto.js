import { cachePool, writeToLocal } from './common'
import Expire from './expire'
import TimeUnit from './time-unit'
import Cache from './cache'
class CacheBuilder {
  static loadByName (name) {
    return cachePool[name]
  }
  static build (name, expiredAfterWrite, loader) {
    let cache = this.loadByName(name)
    let isChange = false
    const isExist = !!cache
    if (isExist) {
      if (expiredAfterWrite &&
           (expiredAfterWrite.time !== cache.expiredAfterWrite.time ||
            expiredAfterWrite.timeUnit !== cache.expiredAfterWrite.timeUnit)) {
        isChange = true
        cache.expiredAfterWrite = expiredAfterWrite
      }
      if (loader && loader !== cache.loader) {
        isChange = true
        cache.loader = loader
      }
      return cache
    } else {
      cache = new Cache(name, expiredAfterWrite || new Expire(1, TimeUnit.MINUTE), loader, {})
      cachePool[name] = cache
    }
    if (!isExist || isChange) writeToLocal()
    return cache
  }
  static newIfNotExist (name, expiredAfterWrite = null, loader = null) {
    let cache = this.loadByName(name)
    if (!cache) {
      cache = new Cache(name, expiredAfterWrite || new Expire(1, TimeUnit.MINUTE), loader, {})
      cachePool[name] = cache
      writeToLocal()
    }
    return cache
  }
}

export default CacheBuilder
