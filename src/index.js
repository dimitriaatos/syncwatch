const formatTime = require('./formatTime')

/**
 * A stopwatch class.
 * 
 * @example import Syncwatch from 'syncwatch'
 * const watch = new Syncwatch(watch => console.log(watch.formatted), {format: 'hh/mm/ss'})
 * watch.start()
 */

const Syncwatch = class {
  
	/**
   * @param {func} cb - A callback function to be triggered repetitively when the time changes.
   * @param {object} options - Initialize any property.
   */
	constructor(cb, options = {}) {

		/* This property holds the playing state (on/off) of the stopwatch */
		this._playing = false

		/** The starting time of the syncwatch (default: 0). */
		this.startTime = 0

		/** The stopping time, where the time is calculated from when the syncwatch is paused (default: 0). */
		this.stopTime = 0

		/** The format to use to generate the formatted time (default: hh:mm:ss.d0). */
		this.format = 'hh:mm:ss.d0'

		/** The maximum time (default: 359999999), when the syncwatch exceeds it will go back to 0. */
		this.maxTime = 100 * 60 * 60 * 1000 - 1

		/** The interval between the invocations of the callback function */
		this.updateInterval = 50

		/* The callback function to be called when the time changes */
		this._callback = () => {}

		/* This property will hold the ID value returned by the setInterval() that will trigger the time changes */
		this._steps

		/* A time offset */
		this.offset = 0

		// Overwriting default values with the options given to the constructor.
		this.callback(cb)
		Object.assign(this, options)
		
	}
  
	/** The current time in ms. */
	get ms() {
		return (this.playing ? Date.now() + this.offset : this.stopTime) - this.startTime
	}
  
	/** The current time in the specified form. */
	get formatted() {return formatTime(this.ms, this.format)}

	/**
   * Update the state of the syncwatch.
   * @param {object} newState - A new state.
   */
	update(newState) {
		const {playing, ...rest} = newState
		Object.assign(this, rest)
		if (typeof playing != 'undefined') {
			this._playing != playing ?
				this.playing = playing :
				this._callback(this)
		}
		return this.output()
	}

	/**
   * Passing a callback function.
   * @param {function} cb - A callback function to be triggered repetitively when the time changes.
   */
	callback(cb) {
		this._callback = (t) => {
			cb && cb(t)
		}
	}

	/**
   * Getting the state of the syncwatch.
   * @return {object} state.
   */
	output() {
		return (({playing, startTime, stopTime, format, updateInterval, maxTime}) => ({playing, startTime, stopTime, format, updateInterval, maxTime}))(this)
	}

	/**
   * A property setter/getter for the syncwatch's playing state, this is useful for toggling syncwatch without triggering a function, when getting an external state.
   */
	get playing() {
		return this._playing
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

	/**
   * An on/off toggle for the syncwatch.
   * @param {bool} playing state
   */
	toggle(state = !this.playing) {
		const now = Date.now()
		if (state == !this.playing) {
			if (state) {
				this.startTime = now - (this.stopTime - this.startTime)
				this.stopTime = undefined
			} else {
				this.stopTime = now
			}
		}
		this.playing = state != 0
		return this.output()
	}

	/**
   * Resetting the time of the syncwatch.
   * @param {number} ms - New time.
   */
	reset(ms = 0) {
		ms = Math.round(Math.min(Math.max(ms, -this.maxTime), this.maxTime))
		this.stopTime = Date.now()
		this.startTime = this.stopTime - ms

		this._callback(this)
		return this.output()
	}

	/**
   * Launching the syncwatch.
   * @return {object} state.
   */
	play() {
		return this.toggle(true)
	}

	/**
   * Launching the syncwatch. An alias of play().
   * @return {object} state.
   */
	start() {
		return this.toggle(true)
	}

	/**
   * Pausing the syncwatch.
   * @return {object} state.
   */
	pause() {
		return this.toggle(false)
	}

	/**
   * Stopping the syncwatch (goes back to 0).
   * @return {object} state.
   */
	stop() {
		this.toggle(false)
		return this.reset()
	}
  
}

module.exports = Syncwatch