import "../styles/global.scss";
import canvas, { init } from "../js/canvas";
console.log("---Index_file");
import gsap, { Linear, Draggable } from "gsap";

console.clear();

const colorArray = [
  "#426F42",
  "#262626",
  "#36648B",
  "#683A5E",
  "#683A5E",
  "#36648B",
];
const slides = document.querySelectorAll("section");
const container = document.querySelector("#panelWrap");
let oldSlide = 0;
let activeSlide = 0;
let navDots = [];
let dur = 0.6;
let offsets = [];
let toolTipAnims = [];
let ih = window.innerHeight;

// create nev dots and add tooltip listeners
for (let i = 0; i < slides.length; i++) {
  let tl = gsap.timeline({ paused: true, reversed: true });
  gsap.set(slides[i], { backgroundColor: colorArray[i] });
  let newDot = document.createElement("div");
  newDot.className = "dot";
  newDot.index = i;
  navDots.push(newDot);
  newDot.addEventListener("click", slideAnim);
  newDot.addEventListener("mouseenter", dotHover);
  newDot.addEventListener("mouseleave", dotHover);
  offsets.push(-slides[i].offsetTop);
  toolTipAnims.push(tl);
}

// get elements positioned

// side screen animation with nav dots

// tooltips hovers
function dotHover() {
  toolTipAnims[this.index].reversed()
    ? toolTipAnims[this.index].play()
    : toolTipAnims[this.index].reverse();
}

// figure out which of the 4 nav controls called the function
function slideAnim(e) {
  oldSlide = activeSlide;
  // dragging the panels
  if (this.id === "dragger") {
    activeSlide = offsets.indexOf(this.endY);
  } else {
    if (gsap.isTweening(container)) {
      return;
    }
    // up/down arrow clicks
    if (this.id === "downArrow" || this.id === "upArrow") {
      activeSlide =
        this.id === "downArrow" ? (activeSlide += 1) : (activeSlide -= 1);
      // click on a dot
    } else if (this.className === "dot") {
      activeSlide = this.index;
      // scrollwheel
    } else {
      activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
    }
  }
  // make sure we're not past the end or beginning slide
  activeSlide = activeSlide < 0 ? 0 : activeSlide;
  activeSlide =
    activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
  if (oldSlide === activeSlide) {
    return;
  }
  // if we're dragging we don't animate the container
  if (this.id != "dragger") {
    gsap.to(container, dur, {
      y: offsets[activeSlide],
      ease: "power2.inOut",
      onUpdate: init(),
    });
  }
}

window.addEventListener("wheel", slideAnim);
window.addEventListener("resize", newSize);

// make the container a draggable element
// let dragMe = Draggable.create(container, {
//   type: "y",
//   edgeResistance: 1,
//   onDragEnd: slideAnim,
//   snap: offsets,
//   inertia: true,
//   zIndexBoost: false,
//   allowNativeTouchScrolling: false,
//   bounds: "#masterWrap",
// });

// dragMe[0].id = "dragger";
newSize();

// resize all panels and refigure draggable snap array
function newSize() {
  offsets = [];
  ih = window.innerHeight;
  gsap.set("#panelWrap", { height: slides.length * ih });
  gsap.set(slides, { height: ih });
  for (let i = 0; i < slides.length; i++) {
    offsets.push(-slides[i].offsetTop);
  }
  gsap.set(container, { y: offsets[activeSlide] });
  // dragMe[0].vars.snap = offsets;
}
