console.log("hello");

function swipeActive(el){
  el.classList.add("active")
  
  setTimeout(function (){
    el.classList.remove("active")
  },500)
}

let swipers = document.querySelectorAll('.swiper')

swipers.forEach(function(el){
  //to prevent scroll
  el.addEventListener("touchmove", function(e) {
    //e.preventDefault()
  })
})
let swipeAny = document.querySelector("#swiper-any")

swipeAny.addSwipeListener(function (){
  swipeActive(swipeAny)
})



let swipeVertical = document.querySelector("#swiper-vertical")

swipeVertical.addSwipeListener(function() {
  swipeActive(swipeVertical)
}, SWIPE_DIRECTIONS.SWIPE_VERTICAL)



let swipeHorizontal = document.querySelector("#swiper-horizontal")

swipeHorizontal.addSwipeListener(function() {
  swipeActive(swipeHorizontal)
}, SWIPE_DIRECTIONS.SWIPE_HORIZONTAL)



let swipeLeft = document.querySelector("#swiper-left")

swipeLeft.addSwipeListener(function() {
  swipeActive(swipeLeft)
}, SWIPE_DIRECTIONS.SWIPE_LEFT)


let swipeUp = document.querySelector("#swiper-up")

swipeUp.addSwipeListener(function() {
  swipeActive(swipeUp)
}, SWIPE_DIRECTIONS.SWIPE_UP)
