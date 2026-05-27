function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now()
    if(now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this,args);
    }
  }
}

const throttled = (() => console.log("jasmine"), 10000);

window.addEventListener("scroll", throttled)


/// without this

function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now =  new Date();
    if(now - lastCall < delay) return;
    lastCall = now
    fn(...args)
  }
}