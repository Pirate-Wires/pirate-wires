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
    const $scroll = new ScrollBasedAnims();
    // router.events.on('routeChangeStart', () => {
    //   $scroll.destroy();
    // });
  });
};
