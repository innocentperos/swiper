/*
written by Innocent Saidu Peros
using Spck Editor Pro

This is polyfill for adding swipe events to a dom element.


enums :
SWIPE_DIRECTIONS:This is an object binded to the window object which contians all the possible type of swipe direction supported by this polyfill. bellow is the list of the directions

  -SWIPE_LEFT
  -SWIPE_RIGHT
  -SWIPE_UP
  -SWIPE_BOTTOM
  -SWIPE_HORIZONTAL
  -SWIPE_VERTICAL

Every instance of a DOM Element has two methods added to it prototype by this polyfill which are

__onSwipe(callback: function(swipeDirection), config=null)
****This methods is the main swipe event handler 
AND

addSwipeListener(callback:function(swipeDirection), swipeDirection=null,config=nul)
*/


(function(window, document) {
  let SWIPE_LEFT = Symbol("swiped left")
  let SWIPE_RIGHT = Symbol("swiped right")
  let SWIPE_UP = Symbol("swiped up")
  let SWIPE_DOWN = Symbol("swiped down")
  let SWIPE_HORIZONTAL = Symbol("swiped horizontally")
  let SWIPE_VERTICAL = Symbol("swiped vertically")

  window.SWIPE_DIRECTIONS = {
    SWIPE_UP,
    SWIPE_DOWN,
    SWIPE_LEFT,
    SWIPE_RIGHT,
    SWIPE_VERTICAL,
    SWIPE_HORIZONTAL
  }

  let __onSwipe = function(el,callback, config) {
    
    
    
    if (config == null) {
      config = {}
    }

    let {
      durationThreshold,
      verticalThreshold,
      horizontalThreshold
    } = config

    
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    
    let xTolerence = 60
    let yTolerence = 60

    let timeThreshold = durationThreshold
    if (timeThreshold == null) timeThreshold = 500
    let thresholdXDistance = horizontalThreshold
    if (thresholdXDistance == null) thresholdXDistance = Math.min(
      el.getBoundingClientRect().width * 1 / 3, screen.width * 1 / 3);

    let thresholdYDistance = verticalThreshold
    if (thresholdYDistance == null) thresholdYDistance = Math.min(
      el.getBoundingClientRect().height * 1 / 3, screen.height * 1 / 3);

    el.addEventListener("touchstart", function(e) {

      let touch = e.changedTouches[0]
      startX = touch.screenX
      startY = touch.screenY
      startTime = new Date().getTime()

    })

    el.addEventListener("touchend", function(e) {
      let touch = e.changedTouches[0]
      let endX = touch.screenX
      let endY = touch.screenY
      let endTime = new Date().getTime()

      let timeDiff = endTime - startTime


      if (timeDiff > timeThreshold) {

        return;
      }

      let xDiff = startX - endX
      let yDiff = startY - endY

      if (Math.abs(xDiff) > thresholdXDistance && Math.abs(yDiff) < yTolerence) {

        if (xDiff > 0) {
          callback(SWIPE_LEFT);
        } else {
          callback(SWIPE_RIGHT)
        }
      } else if (Math.abs(yDiff) > thresholdYDistance && Math.abs(xDiff) < xTolerence) {
        if (yDiff > 0) {
          callback(SWIPE_UP)
        } else {
          callback(SWIPE_DOWN)

        }
      }

    })
  }


  Element.prototype.addSwipeListener = function(callback, sDirection) {

    let direction = null

    if (sDirection != null) {
      direction = sDirection
    }
    let listener = {
      direction,
      callback
    }

    if (this.swipeListeners) {
      this.swipeListeners.push(listener)
      return this.swipeListeners.indexOf(listener)

    }
    this.swipeListeners = []
    this.swipeListeners.push(listener)

    let index = this.swipeListeners.indexOf(listener)
    let element = this

    __onSwipe(this,function(swipeDirection) {
      
      element.swipeListeners.forEach(function(listener) {
        if (listener.direction == swipeDirection || listener.direction == null) {
          listener.callback(swipeDirection)
        } else if (listener.direction == SWIPE_HORIZONTAL && (swipeDirection == SWIPE_LEFT || swipeDirection == SWIPE_RIGHT)) {
          callback(swipeDirection)
        } else if (listener.direction == SWIPE_VERTICAL && (swipeDirection == SWIPE_UP || swipeDirection == SWIPE_DOWN)) {
          callback(swipeDirection)
        }
      })
    })

    return index
  }

})(window, document)
