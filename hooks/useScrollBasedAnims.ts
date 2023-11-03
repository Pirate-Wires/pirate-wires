import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ScrollBasedAnims } from '@/utils/classes/ScrollBasedAnims';

export const useScrollBasedAnims = () => {
  const [once, setOnce] = useState(false);
  const router = useRouter();
  let onceVar = false;
  useEffect(() => {
    if (once || onceVar) {
      return;
    }
    setOnce(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onceVar = true;
    if (!window.scrollBasedAnims) {
      window.scrollBasedAnims = new ScrollBasedAnims();
      window.addEventListener("popstate", (event) => {
        console.log("popstate")
        window.scrollBasedAnims.destroy()
      })
    } else {
      window.scrollBasedAnims.getCache()
      window.scrollBasedAnims.getBounding()
      window.scrollBasedAnims.requestAnimationFrame()
      console.log("getting cache")
    }



    // router.events.on('routeChangeStart', () => {
    //   $scroll.destroy();
    // });
  });
};
