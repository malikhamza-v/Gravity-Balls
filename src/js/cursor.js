import gsap from "gsap";
var cursor = document.querySelector(".custom-cursor"),
  cursorScale = document.querySelectorAll(".cursor-scale"),
  cursorScaleLarge = document.querySelectorAll(".cursor-scale-large"),
  cursorScaleSmall = document.querySelectorAll(".cursor-scale-small"),
  mouseX = 0,
  mouseY = 0;

gsap.to({}, 0.016, {
  repeat: -1,
  onRepeat: function () {
    gsap.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY,
      },
    });
  },
});

window.addEventListener("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

cursorScale.forEach((link) => {
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("grow");
  });
  link.addEventListener("mousemove", () => {
    cursor.classList.add("grow");
  });
});

cursorScaleLarge.forEach((link) => {
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("grow_large");
  });
  link.addEventListener("mousemove", () => {
    cursor.classList.add("grow_large");
  });
});

cursorScaleSmall.forEach((link) => {
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("grow_small");
  });
  link.addEventListener("mousemove", () => {
    cursor.classList.add("grow_small");
  });
});
