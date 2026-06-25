import Image from "next/image";
import maria from "../../public/img/maria.png";
import caminando from "../../public/img/caminando.png";
import libro from "../../public/img/libro.png";
import mockup from "../../public/img/mockup.png";
import garantia from "../../public/img/garantia.webp";

/** Ícono redondo de Nuestra Señora usado en la parte superior de las etapas. */
export function MariaIcon({ size = 56 }: { size?: number }) {
  return (
    <div
      className="mx-auto overflow-hidden rounded-full ring-2 ring-amber-200/60"
      style={{ width: size, height: size }}
    >
      <Image
        src={maria}
        alt="Nuestra Señora"
        width={size * 2}
        height={size * 2}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/** Portada del devocional "365 DÍAS CON MARÍA". */
export function DevocionalCover({ className = "" }: { className?: string }) {
  return (
    <Image
      src={libro}
      alt="365 días con María"
      className={`h-auto rounded-md shadow-xl ${className}`}
      placeholder="blur"
    />
  );
}

/** Portada "CAMINANDO CON MARÍA" mostrada en la apertura del embudo. */
export function CaminhandoCover() {
  return (
    <Image
      src={caminando}
      alt="Caminando con María"
      className="mx-auto h-auto w-full max-w-[320px] rounded-xl"
      placeholder="blur"
      priority
    />
  );
}

/** Mockup del producto (libro + tablet + celular) usado en la página de ventas. */
export function ProductMockup() {
  return (
    <Image
      src={mockup}
      alt="365 días con María"
      className="mx-auto h-auto w-full max-w-md"
      placeholder="blur"
    />
  );
}

/** Sello de garantía de 90 días. */
export function GuaranteeSeal() {
  return (
    <Image
      src={garantia}
      alt="Garantía de 90 días"
      className="mx-auto h-32 w-32"
    />
  );
}
