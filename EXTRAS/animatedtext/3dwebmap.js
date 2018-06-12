// var map = L.map('map', {
//   center: [51.517327, -0.120005],
//   zoom: 15
// });

// var map = L.eeGeo.map('map', '3d01f20e35cce8dbdca14ac059c4e7c5', {
//   center: [51.517327, -0.120005],
//   zoom: 15
// });

// var lineDrawing = anime({
//   targets: '#lineDrawing .lines path',
//   strokeDashoffset: [anime.setDashoffset, 0],
//   easing: 'easeInOutSine',
//   duration: 30000,
//   delay: 30,
//   direction: 'alternate',
//   loop: true,
//   autoplay: true
// });

// var pathEls = document.querySelectorAll('path');
// for (var i = 0; i < pathEls.length; i++) {
//   var pathEl = pathEls[i];
//   var offset = anime.setDashoffset(pathEl);
//   pathEl.setAttribute('stroke-dashoffset', offset);
//   anime({
//     targets: '#lineDrawing .lines path',
//     strokeDashoffset: [offset, 00],
//     duration: anime.random(10000, 10000),
//     delay: anime.random(0, 00),
//     loop: true,
//     direction: 'alternate',
//     easing: 'easeInOutSine',
//     autoplay: true
//   });
// }

var logoEl = document.querySelector('.logo-animation');
var pathEls = document.querySelectorAll('.logo-animation path:not(.icon-curve)');
var innerWidth = window.innerWidth;
var maxWidth = 162;
var logoScale = innerWidth <= maxWidth ? innerWidth / maxWidth : 1;
var logoTimeline = anime.timeline();

logoEl.style.transform = 'translateY(50px) scale('+logoScale+')';

for (var i = 0; i < pathEls.length; i++) {
  var el = pathEls[i];
  el.setAttribute('stroke-dashoffset', anime.setDashoffset(el));
}

logoTimeline
  .add({
  targets: '.dot-e',
  // translateX: [
  //   { value: -600, duration: 520, delay: 200, easing: 'easeInQuart' },
  //   { value: [-100, 0], duration: 500, delay: 1000, easing: 'easeOutQuart' }
  // ],
  scale: [
    { value: [0, 1], duration: 200, easing: 'easeOutQuart' },
    { value: 0, duration: 20, delay: 500, easing: 'easeInQuart' },
    { value: 1, duration: 200, delay: 1000, easing: 'easeOutQuart' },
    // { value: 0, duration: 400, delay: 500, easing: 'easeInBack' }
  ],
  offset: 0
})
  .add({
  targets: '.dot-i',
  // translateY: { value: [-200, 0], duration: 500, elasticity: 400 },
  scale: [
    { value: [0, 1], duration: 100, easing: 'easeOutQuart' },
    // { value: 0, duration: 400, delay: 1400, easing: 'easeInBack' }
  ],
  delay: 600,
  offset: 0
})
  .add({
  targets: '.fill.in',
  strokeDashoffset: {
    value: [anime.setDashoffset, 0],
    duration: 600,
    delay: function(el, i, t) { return 700 + ( i * 100 ); },
    easing: 'easeOutQuart'
  },
  stroke: {
    value: ['#FFF', function(el) { return anime.getValue(el.parentNode, 'stroke') } ],
    duration: 600,
    delay: 600,
    easing: 'easeInQuad'
  },
  // opacity: {
  //   value: 0,
  //   duration: 1,
  //   delay: function(el, i, t) { return 1900 + ( i * 80 ); },
  // },
  offset: 0
})
//   .add({
//   targets: '.fill.out',
//   strokeDashoffset: [
//     { value: [anime.setDashoffset, anime.setDashoffset], duration: 1890 },
//     {
//       value: [0, anime.setDashoffset],
//       duration: 800,
//       delay: function(el, i) { return (i * 80); },
//       easing: 'easeInQuart'
//     }
//   ],
//   offset: 0
// })
