import { getGlobalFields } from '@/lib/sanity/client';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

import Subscribe from './subscribe';

export default async function SubscribePage() {
  const globalFields = await getGlobalFields();

  return (
    <div
      className="colorWrapper reducedHeaderPage"
      style={
        {
          '--color': '#060606',
          '--bgColor': '#E3E3E3',
          '--accentLight': 'rgba(43, 43, 43, 0.45)'
        } as React.CSSProperties
      }
    >
      <Navigation globalFields={globalFields} />
      <Subscribe />
      <Footer globalFields={globalFields} />
    </div>
  );
}
