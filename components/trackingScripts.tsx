import Script from "next/script";

export default function TrackingScripts() {
  return (
    <>
      <script src={`https://cdn.usefathom.com/script.js`} data-site="JNIJRDXC" async></script>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-CT98L9VTFJ`} />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());
        
                gtag('config', 'G-CT98L9VTFJ');
              `,
        }}
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-PDP4TFQ');
              `,
        }}
      />
    </>
  );
}
