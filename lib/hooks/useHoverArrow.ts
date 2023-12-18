import gsap from "gsap";
import {useEffect, useState} from "react";
export const useHoverArrow = () => {
  const [once, setOnce] = useState(false);
  let onceVar = false;
  useEffect(() => {
    if (once || onceVar) {
      return;
    }
    setOnce(true);
    onceVar = true;
    const hoverWrappers = document.querySelectorAll(".hasHoverArrow");
    for (let i = 0; i < hoverWrappers.length; i++) {
      const el = hoverWrappers[i];
      const svg = el.querySelector("svg");
      const timeline = gsap.timeline({paused: true});
      let exitTime = 0;
      timeline.to(svg, {
        xPercent: 200,
        yPercent: -200,
        ease: "expo.inOut",
        duration: 0.5,
      });

      exitTime = timeline.duration();

      timeline.set(svg, {xPercent: -200, yPercent: 200, scale: 0.3}).to(svg, {
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        ease: "expo.out",
        duration: 0.45,
      });

      el.addEventListener("mouseenter", () => {
        if (timeline.time() < exitTime) {
          timeline.play();
        } else {
          timeline.restart();
        }
      });
      el.addEventListener("mouseleave", () => {
        if (timeline.time() < exitTime) {
          timeline.reverse();
        } else {
          timeline.play();
        }
      });
    }
  });
};
