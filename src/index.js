const formatTime = require('./formatTime')

const Stopwatch = class {
  
  constructor(cb, options = {}) {
    
    this._playing = false
    this.start = 0
    this.stop = 0
    this.format = 'hh:mm:ss.d0'
    this.max = 100 * 60 * 60 * 1000 - 1 // 359999999
    this._callback = () => {}
    this.updateTime = 50
    this._steps
    
    this.callback(cb)
    Object.assign(this, options)
  }
  
  get ms() {return (this.playing ? new Date().getTime() : this.stop) - this.start}
  
  get formatted() {return formatTime(this.ms, this.format)}

  update(newState) {
    const {playing, ...rest} = newState
    Object.assign(this, rest)
    this._playing != playing ?
      this.playing = playing :
      this._callback(this)
  }

  callback(cb) {
    this._callback = (t) => {
      cb && cb(t)
    }
  }

  output() {
    return (({playing, start, stop, format, updateTime, max}) => ({playing, start, stop, format, updateTime, max}))(this)
  }

  set playing(state) {
    if (this._playing != state) {
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
  }

  get playing() {
    return this._playing
  }

  play(state) {
    const now = new Date().getTime()
    if (state) {
      this.start = now - (this.stop - this.start)
      this.stop = undefined
    } else {
      this.stop = now
    }
    this.playing = state != 0
    return this.output()
  }

  reset(ms) {
    if (ms != undefined) {
      ms = Math.round(Math.min(Math.max(ms, -this.max), this.max))
      this.stop = new Date().getTime()
      this.start = this.stop - ms
    } else {
      this.start = this.stop = new Date().getTime()
    }
    this._callback(this)
    return this.output()
  }
  
}

module.exports = Stopwatch

// const stopwatch = new Stopwatch(time => {
//   console.log(time.formated)
// })

// stopwatch.play(true)