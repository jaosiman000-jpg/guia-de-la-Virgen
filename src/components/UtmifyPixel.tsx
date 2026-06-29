import Script from "next/script";

const PIXEL_ID = "6a4287be71b205c7cd12b905";

/** Utmify Pixel — rastreamento de UTMs e conversões. */
export default function UtmifyPixel() {
  return (
    <Script id="utmify-pixel" strategy="afterInteractive">
      {`window.pixelId = "${PIXEL_ID}";
var a = document.createElement("script");
a.setAttribute("async", "");
a.setAttribute("defer", "");
a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
document.head.appendChild(a);`}
    </Script>
  );
}
