const formatTime = require('./formatTime')

const Stopwatch = class {
  _playing = false
  start = 0
  stop = 0
  format = 'hh:mm:ss.d0'
  _max = 100 * 60 * 60 * 1000 - 1 // 359999999
  _callback = () => {}
  updateTime
  _steps

  constructor(cb) {
    this.callback(cb)
  }
  
  get ms() {return (this.play ? new Date().getTime() : this.stop) - this.start}
  
  get formatted() {return formatTime(this.ms, this.format)}

  update = newState => {
    Object.assign(this, newState)
  }

  callback = cb => {
    this._callback = (t) => {
      cb && cb(t)
    }
  }

  set playing(state) {
    this._playing = state != 0
    if (this._playing) {
      clearInterval(this._steps)
      this._steps = setInterval(() => {
        this._callback(this)
      }, this.updateTime)
    } else  {
      clearInterval(this._steps)
    }
    this._callback(this)
    return this._playing
  }

  get playing() {
    return this._playing
  }

  play = state => {
    const now = new Date().getTime()
    if (state) {
      this.start = now - (this.stop - this.start)
      this.stop = undefined
    } else {
      this.stop = now
    }
    this.playing = state != 0
    return this
  }

  reset = ms => {
    if (ms != undefined) {
      ms = Math.round(Math.min(Math.max(ms, -this._max), this._max))
      this.stop = new Date().getTime()
      this.start = this.stop - ms
    } else {
      this.start = this.stop = new Date().getTime()
    }
    return this
  }
  
}

module.exports = Stopwatch

// const stopwatch = new Stopwatch(time => {
//   console.log(time.formated)
// })

// stopwatch.play(true)