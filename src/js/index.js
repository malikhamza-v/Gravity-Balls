import "../styles/global.scss";
import canvas, { init } from "../js/canvas";
import cursor from "../js/cursor";
import gsap from "gsap";
import ClusterBalls from "../assets/cluster-balls.png";

console.clear();

const clusterImage = document.getElementById("cluster-balls-image");
clusterImage.src = ClusterBalls;

const slides = document.querySelectorAll("section");
const container = document.querySelector("#panelWrap");
let oldSlide = 0;
let activeSlide = 0;
let navDots = [];
let dur = 0.6;
let offsets = [];
let toolTipAnims = [];
let ih = window.innerHeight;

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader_hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild("loader");
  });
});

// create nev dots and add tooltip listeners
for (let i = 0; i < slides.length; i++) {
  let tl = gsap.timeline({ paused: true, reversed: true });
  gsap.set(slides[i], { backgroundColor: "#fff" });
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

newSize();

function newSize() {
  offsets = [];
  ih = window.innerHeight;
  gsap.set("#panelWrap", { height: slides.length * ih });
  gsap.set(slides, { height: ih });
  for (let i = 0; i < slides.length; i++) {
    offsets.push(-slides[i].offsetTop);
  }
  gsap.set(container, { y: offsets[activeSlide] });
}
