import isMobile from 'ismobilejs';

const mobile = isMobile(window.navigator).any;
let windowWidth = window.innerWidth
let windowHeight = window.innerHeight
console.log("WINDOW WIDTH: ", windowWidth)
if(mobile && !document.body.classList.contains("touch")) {
  document.body.classList.add('touch');
}
console.log(mobile)
export { mobile, windowWidth, windowHeight }