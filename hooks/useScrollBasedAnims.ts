import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ScrollBasedAnims } from '@/utils/classes/ScrollBasedAnims';

declare global {
  interface Window {
    scrollBasedAnims?: ScrollBasedAnims;
  }
}

export const useScrollBasedAnims = () => {
  const router = useRouter();
  const [once, setOnce] = useState(false);
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
    } else {
      window.scrollBasedAnims.getCache()
      window.scrollBasedAnims.getBounding()
      window.scrollBasedAnims.requestAnimationFrame()
    }



    // router.events.on('routeChangeStart', () => {
    //   $scroll.destroy();
    // });
  });
};
