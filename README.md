# SyncWatch

A stopwatch class based on start time, with state output and state update methods.

## Installation
`npm i dimitriaatos/syncwatch`

## Documentation

**Kind**: global class  

* [Syncwatch](#Syncwatch)
    * [new Syncwatch(cb, options)](#new_Syncwatch_new)
    * [.start](#Syncwatch+start)
    * [.stop](#Syncwatch+stop)
    * [.format](#Syncwatch+format)
    * [.max](#Syncwatch+max)
    * [.updateTime](#Syncwatch+updateTime)
    * [.ms](#Syncwatch+ms)
    * [.formatted](#Syncwatch+formatted)
    * [.playing](#Syncwatch+playing)
    * [.update(newState)](#Syncwatch+update)
    * [.callback(cb)](#Syncwatch+callback)
    * [.output()](#Syncwatch+output) ⇒ <code>object</code>
    * [.toggle(playing)](#Syncwatch+toggle)
    * [.reset(ms)](#Syncwatch+reset)
    * [.play()](#Syncwatch+play) ⇒ <code>object</code>
    * [.pause()](#Syncwatch+pause) ⇒ <code>object</code>
    * [.stop()](#Syncwatch+stop) ⇒ <code>object</code>

<a name="new_Syncwatch_new"></a>

### new Syncwatch(cb, options)

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>func</code> | A callback function to be triggered repetitively when the time changes. |
| options | <code>object</code> | Initialize any property. |

**Example**  
```js
import Syncwatch from 'syncwatch'
const watch = new Syncwatch(watch => console.log(watch.formatted), {format: 'hh/mm/ss'})
watch.start()
```
<a name="Syncwatch+start"></a>

### syncwatch.start
The starting time of the syncwatch (default: 0).

**Kind**: instance property of [<code>Syncwatch</code>](#Syncwatch)  
<a name="Syncwatch+stop"></a>

### syncwatch.stop
The stopping time, where the time is calculated from when the syncwatch is paused (default: 0).

**Kind**: instance property of [<code>Syncwatch</code>](#Syncwatch)  
<a name="Syncwatch+format"></a>

### syncwatch.format
The format to use to generate the formatted time (default: hh:mm:ss.d0).

**Kind**: instance property of [<code>Syncwatch</code>](#Syncwatch)  
<a name="Syncwatch+max"></a>

### syncwatch.max
The maximum time (default: 359999999), when the syncwatch exceeds it will go back to 0.

**Kind**: instance property of [<code>Syncwatch</code>](#Syncwatch)  
<a name="Syncwatch+updateTime"></a>

### syncwatch.updateTime
The time interval between the invoking of the callback function

**Kind**: instance property of [<code>Syncwatch</code>](#Syncwatch)  
<a name="Syncwatch+ms"></a>

### syncwatch.ms
The current time in ms.

**Kind**: instance property of [<code>Syncwatch</code>](#Syncwatch)  
<a name="Syncwatch+formatted"></a>

### syncwatch.formatted
The current time in the specified form.

**Kind**: instance property of [<code>Syncwatch</code>](#Syncwatch)  
<a name="Syncwatch+playing"></a>

### syncwatch.playing
A property setter/getter for the syncwatch's playing state, this is useful for toggling syncwatch without triggering a function, when getting an external state.

**Kind**: instance property of [<code>Syncwatch</code>](#Syncwatch)  
<a name="Syncwatch+update"></a>

### syncwatch.update(newState)
Update the state of the syncwatch.

**Kind**: instance method of [<code>Syncwatch</code>](#Syncwatch)  

| Param | Type | Description |
| --- | --- | --- |
| newState | <code>object</code> | A new state. |

<a name="Syncwatch+callback"></a>

### syncwatch.callback(cb)
Passing a callback function.

**Kind**: instance method of [<code>Syncwatch</code>](#Syncwatch)  

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>function</code> | A callback function to be triggered repetitively when the time changes. |

<a name="Syncwatch+output"></a>

### syncwatch.output() ⇒ <code>object</code>
Getting the state of the syncwatch.

**Kind**: instance method of [<code>Syncwatch</code>](#Syncwatch)  
**Returns**: <code>object</code> - state.  
<a name="Syncwatch+toggle"></a>

### syncwatch.toggle(playing)
An on/off toggle for the syncwatch.

**Kind**: instance method of [<code>Syncwatch</code>](#Syncwatch)  

| Param | Type | Description |
| --- | --- | --- |
| playing | <code>bool</code> | state |

<a name="Syncwatch+reset"></a>

### syncwatch.reset(ms)
Resetting the time of the syncwatch.

**Kind**: instance method of [<code>Syncwatch</code>](#Syncwatch)  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | New time. |

<a name="Syncwatch+play"></a>

### syncwatch.play() ⇒ <code>object</code>
Launching the syncwatch.

**Kind**: instance method of [<code>Syncwatch</code>](#Syncwatch)  
**Returns**: <code>object</code> - state.  
<a name="Syncwatch+pause"></a>

### syncwatch.pause() ⇒ <code>object</code>
Pausing the syncwatch.

**Kind**: instance method of [<code>Syncwatch</code>](#Syncwatch)  
**Returns**: <code>object</code> - state.  
<a name="Syncwatch+stop"></a>

### syncwatch.stop() ⇒ <code>object</code>
Stopping the syncwatch (goes back to 0).

**Kind**: instance method of [<code>Syncwatch</code>](#Syncwatch)  
**Returns**: <code>object</code> - state.  