import CacheBuilder from './cache-builder'
import Cache from './cache'
import Expire from './expire'
import TimeUnit from './time-unit'
import { BASIC_KEY, cachePool } from './common'
const init = () => {
  const data = JSON.parse(localStorage.getItem(BASIC_KEY))
  if (data) {
    Object.keys(data).forEach(key => {
      cachePool[key] = new Cache(key, data[key].expiredAfterWrite, null, data[key].data)
    })
  }
}
init()
export default {
  CacheBuilder,
  Cache,
  Expire,
  TimeUnit
}
