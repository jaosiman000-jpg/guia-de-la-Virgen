"use client";

import { useEffect, useState } from "react";
import { PRICE } from "@/data/funnel";
import { fbTrack } from "@/lib/fbpixel";
import { buildCheckoutUrl } from "@/lib/tracking";

/** CTA verde de compra. Repassa UTMs/fbclid e dispara InitiateCheckout. */
export default function CheckoutButton() {
  // Começa com o link base (SSR) e enriquece com as etiquetas após montar.
  const [href, setHref] = useState(PRICE.checkoutUrl);

  useEffect(() => {
    setHref(buildCheckoutUrl(PRICE.checkoutUrl));
  }, []);

  return (
    <a
      href={href}
      onClick={() =>
        fbTrack("InitiateCheckout", {
          content_name: "365 Días con María",
          value: 9.9,
          currency: "MXN",
        })
      }
      className="btn-green block text-sm sm:text-base"
    >
      ¡QUIERO A MARÍA CONMIGO!
    </a>
  );
}
