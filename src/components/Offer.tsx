import {
  ProductMockup,
  DevocionalCover,
  GuaranteeSeal,
} from "@/components/Graphics";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import CheckoutButton from "@/components/CheckoutButton";
import Image from "next/image";
import maria from "../../public/img/maria.png";
import { PRICE } from "@/data/funnel";

function CtaGreen() {
  return <CheckoutButton />;
}

function PriceLine() {
  return (
    <p className="text-center text-sm text-gray-500">
      De <span className="text-red-500 line-through">{PRICE.fromShort}</span> por solo{" "}
      {PRICE.now}
    </p>
  );
}

function GreenBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-[#eaf7ee] p-5">
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-1.5 font-bold text-gray-900">{title}</h3>
      <ul className="space-y-1.5 text-sm text-gray-600">
        {items.map((t) => (
          <li key={t} className="flex gap-2">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Offer() {
  return (
    <div className="step-enter flex flex-col gap-8 pb-12">
      {/* encabezado */}
      <p className="text-center text-sm font-bold text-cyan">
        ¡Tu app 365 Días con María está lista! Mírala abajo 🙏
      </p>

      <h1 className="text-center text-xl font-bold leading-snug text-sky sm:text-2xl">
        Transforma Tu Vida Espiritual en 365 Días con María: la aplicación para
        conectarte con la Madre de Cristo y fortalecer tu fe, cada día en tu celular
      </h1>

      <p className="text-center text-sm text-gray-600">
        Una <b className="text-gray-800">aplicación</b> con{" "}
        <b className="text-gray-800">Reflexiones, Meditaciones y Oraciones Diarias</b> para
        crecer en la <b className="text-gray-800">Espiritualidad Mariana</b> cada día del año,
        directo en tu teléfono 📱
      </p>

      <ProductMockup />

      {/* precio */}
      <div className="text-center">
        <p className="text-lg font-bold text-red-500 line-through">DE {PRICE.from}</p>
        <p className="text-sm font-bold text-gray-900">POR SOLO</p>
        <p className="text-4xl font-extrabold text-money">{PRICE.now}</p>
        <p className="mx-auto mt-2 max-w-xs text-xs text-gray-400">
          {PRICE.conversionNote}
        </p>
      </div>

      <h2 className="text-center font-bold text-gray-900">
        ¿Qué incluye tu app devocional?
      </h2>

      <GreenBox>
        <Block
          title="App Devocional · 365 días 📱"
          items={[
            "Acceso inmediato a la aplicación con los 365 devocionales diarios, directo en tu celular. ¡Y cada mes se agregan nuevos devocionales dentro de la app!",
          ]}
        />
        <Block
          title="Grupo Exclusivo en WhatsApp (Bono)"
          items={[
            "Te agregaremos a nuestro grupo exclusivo con mujeres que siguen el devocional, tenemos una comunidad hermosa y llena de cosas maravillosas",
          ]}
        />
        <Block
          title="Lectura Espiritual"
          items={[
            "Textos bíblicos: versículos o pasajes específicos de la Biblia, cada día dentro de la app.",
            "Reflexiones diarias escritas en la aplicación, basadas en temas bíblicos y espirituales.",
          ]}
        />
        <Block
          title="Reflexión Personal"
          items={[
            "Tiempo para meditar sobre lo leído, conectando el mensaje con situaciones de la vida cotidiana.",
            'Preguntas introspectivas, como: "¿Qué me enseña esto?" o "¿Cómo puedo aplicar esto hoy?".',
          ]}
        />
      </GreenBox>

      <GreenBox>
        <Block
          title="Oración"
          items={[
            "Un momento de diálogo con Dios, que incluye:",
            "Agradecimientos.",
            "Peticiones de orientación, fuerza o perdón.",
            "Intercesión por otras personas.",
          ]}
        />
        <Block
          title="Adoración"
          items={[
            "Cantar o escuchar canciones que glorifiquen a Dios.",
            "Reconocer la grandeza de Dios en silencio o en palabras.",
          ]}
        />
        <Block
          title="Escritura o Diario Espiritual (dentro de la app)"
          items={[
            "Anota tus pensamientos, ideas u oraciones inspirados por la lectura o la meditación, directo en la aplicación.",
            "Registra desafíos, bendiciones o respuestas a tus oraciones, y consérvalos siempre contigo.",
          ]}
        />
      </GreenBox>

      {/* destaque do app */}
      <div className="rounded-2xl border-2 border-sky/20 bg-[#eef3ff] p-5">
        <h3 className="mb-3 text-center font-extrabold text-sky">
          📱 Todo en una sola aplicación
        </h3>
        <ul className="space-y-2.5 text-sm text-gray-700">
          {[
            "Se instala en tu celular en segundos, como una app (Android y iPhone) — sin descargas pesadas ni tiendas.",
            "Recordatorios diarios para no perder tu momento de oración.",
            "Sigue tu progreso: tu racha de días, los devocionales completados y tus favoritos.",
            "Tu diario espiritual y tus intenciones, siempre contigo.",
            "Modo claro y oscuro, para leer cómoda a cualquier hora del día.",
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <span>✅</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <CtaGreen />
        <PriceLine />
      </div>

      {/* lo que encontrarás */}
      <h2 className="text-center text-lg font-bold leading-snug text-sky">
        LO QUE ENCONTRARÁS DENTRO DE 365 DÍAS CON MARÍA
      </h2>

      <div className="flex items-start gap-4">
        <DevocionalCover className="w-28 shrink-0" />
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex gap-2">
            <span>✅</span>
            <span>
              <b className="text-gray-800">Reflexiones diarias</b> basadas en la vida de
              María y en los valores cristianos, con enseñanzas prácticas para tu día a día.
            </span>
          </li>
          <li className="flex gap-2">
            <span>✅</span>
            <span>
              <b className="text-gray-800">Oraciones poderosas</b> que fortalecerán tu fe y
              aumentarán tu confianza en Dios.
            </span>
          </li>
          <li className="flex gap-2">
            <span>✅</span>
            <span>
              <b className="text-gray-800">Retos prácticos</b> para aplicar las enseñanzas
              de María en tu rutina, acercándote aún más a Cristo.
            </span>
          </li>
          <li className="flex gap-2">
            <span>✅</span>
            <span>
              <b className="text-gray-800">Pasajes bíblicos</b> seleccionados para iluminar
              tu camino, brindando sabiduría y consuelo en momentos de incertidumbre.
            </span>
          </li>
        </ul>
      </div>

      <p className="text-center text-sm text-gray-600">
        Esta aplicación es una{" "}
        <b className="text-gray-800">invitación diaria al crecimiento espiritual</b> y un
        llamado a la oración, la reflexión y el fortalecimiento de la fe. Con María como
        inspiración,{" "}
        <b className="text-gray-800">
          serás guiado hacia una vida más plena y conectada con Cristo.
        </b>
      </p>

      <GreenBox>
        <Block
          title="Conexión Espiritual"
          items={[
            "Profundizar tu relación con Dios o con lo divino.",
            "Sentir mayor propósito y claridad sobre el sentido de la vida.",
          ]}
        />
        <Block
          title="Paz Interior"
          items={[
            "Desarrollar una mente más serena, especialmente al comenzar el día con reflexión y oración.",
            "Aprender a manejar mejor los desafíos y encontrar consuelo en tiempos difíciles.",
          ]}
        />
        <Block
          title="Autoconocimiento"
          items={[
            "Reflexionar sobre tus valores, acciones y áreas que necesitan crecimiento.",
            "Descubrir fortalezas internas y formas de mejorar tus relaciones.",
          ]}
        />
        <Block
          title="Disciplina y Constancia"
          items={[
            "Crear una rutina diaria que alimente la mente y el espíritu.",
            "Desarrollar hábitos saludables que pueden extenderse a otras áreas.",
          ]}
        />
        <Block
          title="Gratitud y Positividad"
          items={[
            "Enfocarte en las bendiciones y los aspectos positivos de la vida, incluso en días difíciles.",
            "Reestructurar tu perspectiva para vivir con más esperanza.",
          ]}
        />
      </GreenBox>

      <div className="space-y-3">
        <CtaGreen />
        <PriceLine />
      </div>

      <Image
        src={maria}
        alt="Nuestra Señora"
        width={320}
        height={320}
        className="mx-auto w-48 rounded-xl"
      />

      {/* testimonios */}
      <h2 className="text-center font-bold text-gray-900">
        ¿Nuestra app es confiable?
      </h2>
      <p className="text-center text-sm text-gray-600">
        ¡SÍÍ 100%, aquí están algunas opiniones de las personas que ya lo adquirieron! 👇
      </p>
      <TestimonialCarousel />

      <div className="space-y-3">
        <CtaGreen />
        <PriceLine />
      </div>

      {/* garantía */}
      <h2 className="text-center font-bold text-gray-900">¿Tiene Garantía?</h2>
      <p className="text-center text-sm text-gray-600">
        ¡SÍ! Estamos tan seguros de que nuestra app te ayudará que garantizamos un
        reembolso total dentro de los 90 días posteriores a la compra.
      </p>
      <GuaranteeSeal />

      <div className="space-y-3">
        <CtaGreen />
        <PriceLine />
      </div>
    </div>
  );
}
