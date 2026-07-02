"use client";

import { PRICE } from "@/data/funnel";
import { fbTrack } from "@/lib/fbpixel";

/** CTA de compra — enlace DIRECTO al checkout de Hotmart (sin UTMs ni reescritura). */
export default function CheckoutButton() {
  return (
    <a
      href={PRICE.checkoutUrl}
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
