# Swiper

A lightweight javascript plugin for adding swipe gesture to an element.


written by Innocent Saidu Peros
using Spck Editor Pro

This is polyfill for adding swipe events to a dom element.

## Usage
enums:

`SWIPE_DIRECTIONS`:This is an object binded to the window object which contians all the possible type of swipe direction supported by this polyfill. bellow is the list of the directions

 `SWIPE_DIRECTIONS.SWIPE_LEFT`
  `SWIPE_DIRECTIONS.SWIPE_RIGHT`
  `SWIPE_DIRECTIONS.SWIPE_UP`
  `SWIPE_DIRECTIONS.SWIPE_BOTTOM`
  `SWIPE_DIRECTIONS.SWIPE_HORIZONTAL`
  `SWIPE_DIRECTIONS.SWIPE_VERTICAL`

### Adding Swipe Listener
Every instance of a DOM Element has two methods added to it prototype by this polyfill which are

```typescript 
__onSwipe(callback: function(swipeDirection), config=null)
```
Note: This methods is the main swipe event handler, which will call the callback function evertime a swipe event occurs and provide the swipe direction to the callback function.

The config parameter allows you to change the behaviour of the swipe event, it contains three (3) keys which are 
* durationThreshold

  This is an integer which set how long a swipe action can take, it is in microseconds.
* verticalThreshold
  
  This is the distance the swipe most go in pixels to record it as a valid verical (up or down) swipe 
* horizontalThreshold
 
  This is the distance the swipe most go in pixels to record it as a valid horizontal (left or right) swipe

AND

```typescript
addSwipeListener(callback:function(swipeDirection), swipeDirection=null)
```
