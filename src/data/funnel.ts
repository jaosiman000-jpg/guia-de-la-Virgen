/**
 * Contenido del embudo interactivo "365 días con María"
 * Traducido al español de México, fiel al original (guiacatolico.online).
 *
 * Tokens dinámicos soportados en el texto:
 *   {name}  → nombre escrito por la persona (se muestra en azul)
 *   {prece} → petición/oración escrita por la persona (se muestra en azul)
 *
 * En campos "rich" (html) se puede usar <b> y <span class="hl">…</span> (resalte azul).
 */

export const PRICE = {
  from: "$59.90",
  fromShort: "$59.90",
  now: "$9.90",
  // Pago de contado (sin pagos a plazos).
  conversionNote: "El valor se convierte automáticamente a tu moneda local.",
  checkoutUrl: "https://pay.hotmart.com/U106454941X?checkoutMode=10",
};

export type Option = { label: string; emoji?: string };

export type Step =
  | {
      type: "cover";
      kicker: string;
      kickerSub: string;
      headline: string;
      image: "caminhando";
      cta: string;
      footnote: string;
    }
  | {
      type: "single";
      progress: number;
      question: string;
      options: Option[];
      footer?: string;
    }
  | {
      type: "name";
      progress: number;
      question: string;
      description: string;
      placeholder: string;
      cta: string;
    }
  | {
      type: "info";
      progress: number;
      title: string;
      body: string;
      cta: string;
    }
  | {
      type: "prayer";
      progress: number;
      title: string;
      intro: string;
      body: string;
      emphasis: string;
      note: string;
      placeholder: string;
      cta: string;
    }
  | {
      type: "audio";
      progress: number;
      title: string;
      description: string;
      cta: string;
    }
  | {
      type: "loading";
      progress: number;
      topText: string;
      label: string;
      cta: string;
    }
  | { type: "offer" };

export const funnel: { name: string; steps: Step[] } = {
  name: "365 días con María",
  steps: [
    {
      type: "cover",
      kicker: "ESTO NO ES POR CASUALIDAD...",
      kickerSub: "Si llegaste hasta aquí, es porque ELLA TE LLAMÓ ❤️🙏",
      headline: '¿Pero ahora... VAS A TENER EL VALOR DE DECIR "SÍ"?',
      image: "caminhando",
      cta: "INICIAR MI CAMINO",
      footnote:
        "📱 Responde algunas preguntas rápidas... Y recibe acceso a tu app devocional, hecha para ti. Con oración, dirección y fe.",
    },
    {
      type: "name",
      progress: 12,
      question:
        "¿Te gustaría dejar tu nombre para que lo incluyamos en nuestro Libro de Oraciones?",
      description:
        "Con gran alegría, llevaremos tu nombre al altar en nuestras oraciones diarias. Al registrarlo aquí, unimos tu intención a nuestra comunidad de fe, confiando todo al Corazón Misericordioso de Jesús y a la intercesión de Nuestra Señora. 🙏🌹",
      placeholder: "Escribe tu nombre aquí",
      cta: "Enviar",
    },
    {
      type: "info",
      progress: 20,
      title: "¡{name}, es una bendición contar con tu presencia!🙏",
      body: "Tu nombre ya fue cuidadosamente incluido en nuestro Libro de Oraciones. Será recordado con cariño y fe cada día, ante el altar del Señor.",
      cta: "CONTINUAR",
    },
    {
      type: "single",
      progress: 33,
      question: "¿En qué áreas deseas poner tu corazón en este Devocional?",
      options: [
        { emoji: "💵", label: "Mi vida financiera y profesional" },
        { emoji: "💓", label: "Armonía en las relaciones familiares" },
        { emoji: "🛐", label: "Protección y fuerza espiritual" },
        { emoji: "🙏", label: "Mi camino de fe" },
        { emoji: "💭", label: "Otra intención" },
      ],
    },
    {
      type: "single",
      progress: 40,
      question: "¿Cómo está tu corazón espiritual en este momento?",
      options: [
        { emoji: "❤️‍🔥", label: "Siento que necesito una purificación interior" },
        { emoji: "🌿", label: "Busco una renovación espiritual" },
        { emoji: "🕊️", label: "Estoy en paz, pero deseo más claridad y dirección" },
        { emoji: "🛡️", label: "Siento necesidad de protección y paz espiritual" },
        { emoji: "🙏", label: "Quiero fortalecer mi fe y mi comunión con Dios" },
      ],
    },
    {
      type: "single",
      progress: 50,
      question:
        "¿Sientes que hay algo en tu vida que, a pesar de tus esfuerzos, aún no se resuelve?",
      options: [
        { emoji: "😟", label: "Sí... Siento que todo está estancado, y nada parece salir bien." },
        { emoji: "😔", label: "Sí... Algunas áreas de mi vida parecen estancadas." },
        { emoji: "🥰", label: "Gracias a Dios, siento que todo está fluyendo bien en este momento." },
      ],
    },
    {
      type: "audio",
      progress: 60,
      title: "Vamos a rezar juntos con fe y confianza.",
      description:
        "Haz clic en el botón de abajo para escuchar esta oración y poner tus intenciones bajo la protección del Inmaculado Corazón de María. 🙏🌹❤️",
      cta: "Continuar",
    },
    {
      type: "single",
      progress: 72,
      question:
        "Si pudieras vivir las enseñanzas de Jesús de forma práctica en tu día a día con la intercesión de Nuestra Señora, ¿eso sería valioso para ti?",
      options: [
        { emoji: "🙏", label: "¡Sí, sería muy valioso para mi vida!" },
        { emoji: "🙌", label: "Sí, creo que sí sería útil." },
        { emoji: "🤔", label: "Tal vez... depende de cómo se aplicaría." },
      ],
      footer: "¡Estás a punto de vivir una gran transformación espiritual! 🙏❤️",
    },
    {
      type: "prayer",
      progress: 80,
      title: "¡Dios quiere bendecirte hoy! ✨🙏",
      intro:
        '<span class="hl">{name}</span>, si pudieras ver <span class="hl">tu mayor deseo cumplido</span>, ¿qué pedirías?',
      body: "Tal vez sea <b>una sanación</b>, o la <b>restauración de tu familia</b>, la <b>liberación de un vicio</b>, la <b>prosperidad financiera</b>, el reencuentro con <b>el amor verdadero</b> o, simplemente, la <b>paz en el corazón</b>...",
      emphasis:
        "Declara con fe tu petición abajo. Nuestra Señora, llena de gracia y fuente de bendiciones, llevará tu súplica hasta el corazón de Jesús. ¡Ella intercederá poderosamente por ti! ❤️🌹",
      note: "Créelo: nada es imposible para Dios. Con este Devocional, Él actuará con amor y poder en tu vida. 🙌",
      placeholder: "Escribe aquí tu oración...",
      cta: "CONTINUAR",
    },
    {
      type: "loading",
      progress: 95,
      topText:
        'Con esta app los caminos se abrirán y mi deseo de <span class="hl">{prece}</span> se cumplirá en el nombre de Jesús por la intercesión de Nuestra Señora.',
      label: "Preparando tu app devocional 🙏❤️",
      cta: "CONTINUAR",
    },
    { type: "offer" },
  ],
};
