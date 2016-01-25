import { writeToLocal } from './common'
class Cache {
  name = null;
  expiredAfterWrite = null;
  periodAfterWrite = null;
  data = {};
  loader = null;
  // protected
  constructor (name, expiredAfterWrite, loader, data) {
    this.name = name
    this.expiredAfterWrite = expiredAfterWrite
    this.loader = loader
    this.data = data
    this.periodAfterWrite = this.expiredAfterWrite.time * this.expiredAfterWrite.timeUnit
  }

  get (key, defaultValue = null) {
    const o = this.data[key]
    let value = defaultValue
    if (o) {
      if (Date.now() <= this.periodAfterWrite + o.insertedAt) {
        return o.value
      } else {
        this.invalidate(key)
      }
    }
    if (this.loader) {
      value = this.loader(key)
      this.put(key, value)
    }
    return value || defaultValue
  }
  put (key, value) {
    if (key && value) {
      this.data[key] = {value: value, insertedAt: Date.now()}
      writeToLocal(this)
    }
  }
  invalidate (key) {
    delete this.data[key]
    writeToLocal(this)
  }
  invalidateAll () {
    this.data = {}
    writeToLocal(this)
  }
  asMap () {
    const data = {}
    Object.keys(this.data).forEach(key => {
      data[key] = this.data[key].value
    })
    return data
  }
}
export default Cache
