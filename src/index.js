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
		this.start = 0

		/** The stopping time, where the time is calculated from when the syncwatch is paused (default: 0). */
		this.stop = 0

		/** The format to use to generate the formatted time (default: hh:mm:ss.d0). */
		this.format = 'hh:mm:ss.d0'

		/** The maximum time (default: 359999999), when the syncwatch exceeds it will go back to 0. */
		this.max = 100 * 60 * 60 * 1000 - 1

		/** The time interval between the invoking of the callback function */
		this.updateTime = 50

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
		return (this.playing ? Date.now() + this.offset : this.stop) - this.start
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
		if (typeof playing == 'number') {
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
		return (({playing, start, stop, format, updateTime, max}) => ({playing, start, stop, format, updateTime, max}))(this)
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
	toggle(state) {
		const now = Date.now()
		if (state) {
			this.start = now - (this.stop - this.start)
			this.stop = undefined
		} else {
			this.stop = now
		}
		this.playing = state != 0
		return this.output()
	}

	/**
   * Resetting the time of the syncwatch.
   * @param {number} ms - New time.
   */
	reset(ms) {
		if (ms != undefined) {
			ms = Math.round(Math.min(Math.max(ms, -this.max), this.max))
			this.stop = Date.now()
			this.start = this.stop - ms
		} else {
			this.start = this.stop = Date.now()
		}
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