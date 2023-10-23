/* eslint-disable */
import { useEffect, useState } from 'react';
import {gsap} from "gsap";
// import GlobalConfig from '../app.config.js'

export const usePageEntrance = () => {
  const [once, setOnce] = useState(false);
  let onceVar = false;
  useEffect(() => {
    if (once || onceVar) {
      return;
    }
    setOnce(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onceVar = true;
    // @ts-ignore
    const timeline = new gsap.timeline()
    const int = setInterval(() => {
      // if (GlobalConfig.transitionFinished) {
      //   clearInterval(int)
      //   const enterEls = document.querySelectorAll('.enter-el, .enter-el-block, .enter-el-inherit');
      //   timeline
      //     .fromTo(enterEls, { y: 40 }, { y: 0, stagger: .07, force3D: true, duration: 1.4, ease: "expo.out" })
      //     .fromTo(enterEls, { opacity: 0 }, { opacity: 1, stagger: .07, force3D: true, duration: 1.35, ease: "expo.out" }, 0.05)
      // }
    })
  });
};
