import TimeUnit from './time-unit'
class Expire {
  time = 1;
  timeUnit = TimeUnit.Second;
  constructor (time, timeUnit) {
    this.time = time
    this.timeUnit = timeUnit
  }
}

export default Expire
