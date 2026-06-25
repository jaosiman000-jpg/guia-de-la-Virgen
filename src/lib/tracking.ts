/**
 * Repasse de parâmetros de rastreamento (UTMs, fbclid, etc.) para o checkout.
 *
 * Fluxo:
 *  1. captureLandingParams() guarda as etiquetas da URL de chegada (a 1ª vence).
 *  2. buildCheckoutUrl() mescla essas etiquetas no link da Hotmart no clique.
 */

const STORE_KEY = "tracking_params";

// Parâmetros que repassamos ao checkout.
const TRACKED = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "gclid",
  "ttclid",
  "src",
  "sck",
  "xcod",
] as const;

function collectFrom(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const out: Record<string, string> = {};
  for (const key of TRACKED) {
    const value = params.get(key);
    if (value) out[key] = value;
  }
  return out;
}

/** Guarda os parâmetros da URL de chegada (apenas na primeira visita da sessão). */
export function captureLandingParams(): void {
  if (typeof window === "undefined") return;
  try {
    const collected = collectFrom(window.location.search);
    if (Object.keys(collected).length === 0) return;
    if (!sessionStorage.getItem(STORE_KEY)) {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(collected));
    }
  } catch {
    // ignora (sessionStorage indisponível, etc.)
  }
}

/** Recupera os parâmetros guardados (ou os da URL atual como fallback). */
function getTrackingParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(STORE_KEY);
    if (stored) return JSON.parse(stored) as Record<string, string>;
  } catch {
    // ignora
  }
  return collectFrom(window.location.search);
}

/** Monta o link final do checkout com as etiquetas de origem mescladas. */
export function buildCheckoutUrl(baseUrl: string): string {
  if (typeof window === "undefined") return baseUrl;
  try {
    const url = new URL(baseUrl);
    const params = getTrackingParams();

    // Repassa todas as etiquetas que ainda não estiverem no link base.
    for (const [key, value] of Object.entries(params)) {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value);
    }

    // Código de origem da Hotmart (src): origem do tráfego.
    if (!url.searchParams.has("src")) {
      const src = params.utm_source || (params.fbclid ? "FB" : "direct");
      url.searchParams.set("src", src);
    }

    // Código secundário da Hotmart (sck): campanha, quando houver.
    if (!url.searchParams.has("sck") && params.utm_campaign) {
      url.searchParams.set("sck", params.utm_campaign);
    }

    return url.toString();
  } catch {
    return baseUrl;
  }
}
