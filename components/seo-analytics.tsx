"use client";

import Script from "next/script";

interface SEOAnalyticsProps {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
}

export function SEOAnalytics({
  googleAnalyticsId,
  googleTagManagerId,
  facebookPixelId,
}: SEOAnalyticsProps) {
  return (
    <>
      {/* Google Analytics */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager */}
      {googleTagManagerId && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManagerId}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* Facebook Pixel */}
      {facebookPixelId && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${facebookPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Structured Data for Business */}
      <Script
        id="business-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Krisha Nobora Nutrition Services",
            "image": "https://nutrisha.vercel.app/images/nutritionist-avatar.png",
            "description": "Professional nutrition consultation and personalized meal planning services by Krisha Nobora, Registered Nutritionist-Dietitian",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Taguig",
              "addressRegion": "Metro Manila",
              "addressCountry": "Philippines"
            },
            "url": "https://nutrisha.vercel.app",
            "telephone": "+63-XXX-XXX-XXXX",
            "priceRange": "$$",
            "openingHours": "Mo-Fr 09:00-17:00",
            "serviceArea": {
              "@type": "Country",
              "name": "Philippines"
            }
          }
        `}
      </Script>
    </>
  );
}

export default SEOAnalytics;
