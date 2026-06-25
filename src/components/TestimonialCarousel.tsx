"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import depo1 from "../../public/img/depo-1.png";
import depo2 from "../../public/img/depo-2.png";
import depo3 from "../../public/img/depo-3.png";
import depo4 from "../../public/img/depo-4.png";

const slides: StaticImageData[] = [depo1, depo2, depo3, depo4];
const INTERVAL_MS = 2000;

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto w-full max-w-sm">
      {/* marco do carrossel */}
      <div className="relative h-[460px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
        {slides.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Testimonio ${i + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            placeholder="blur"
            className={`object-contain transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
          />
        ))}
      </div>

      {/* indicadores */}
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ver testimonio ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-brand" : "w-2.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
