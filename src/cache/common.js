const BASIC_KEY = 'teToCache'
const cachePool = {}
const serialize = () => {
  let result = {}
  Object.keys(cachePool).forEach(key => {
    result[key] = {expiredAfterWrite: cachePool[key].expiredAfterWrite, data: cachePool[key].data}
  })
  return JSON.stringify(result)
}
let start = null
let timer = null
const delay = 1000
const mustRunInterval = 5000
const writeToLocal = cache => {
  if (cache) cachePool[cache.name] = cache
  if (timer) clearTimeout(timer)
  const curr = Date.now()
  if (!start) start = curr
  if (curr - start >= mustRunInterval) {
    localStorage.setItem(BASIC_KEY, serialize())
    start = curr
  } else {
    timer = setTimeout(localStorage.setItem(BASIC_KEY, serialize()), delay)
  }
}

export default {
  BASIC_KEY,
  cachePool,
  writeToLocal
}
