"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { funnel, type Step } from "@/data/funnel";
import { MariaIcon, CaminhandoCover, DevocionalCover } from "@/components/Graphics";
import Offer from "@/components/Offer";
import { fbTrack } from "@/lib/fbpixel";
import { captureLandingParams } from "@/lib/tracking";

/* ---------- helpers de texto ---------- */

function fill(text: string, name: string, prece = "") {
  return text.replaceAll("{name}", name || "").replaceAll("{prece}", prece || "");
}

/** Texto simples com {name} destacado em azul. */
function WithName({ text, name }: { text: string; name: string }) {
  const parts = text.split("{name}");
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && (
            <span className="font-bold text-sky">{name || ""}</span>
          )}
        </span>
      ))}
    </>
  );
}

/** Texto rico (html com <b> e <span class="hl">) + {name}. */
function Rich({
  html,
  name,
  prece = "",
  className,
}: {
  html: string;
  name: string;
  prece?: string;
  className?: string;
}) {
  return (
    <p
      className={className}
      dangerouslySetInnerHTML={{ __html: fill(html, name, prece) }}
    />
  );
}

/* ---------- engine ---------- */

export default function Quiz() {
  const steps = funnel.steps;
  const [index, setIndex] = useState(0);
  const [name, setName] = useState("");
  const [prece, setPrece] = useState("");
  const step = steps[index];

  const next = () => setIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setIndex((i) => Math.max(i - 1, 0));

  // Guarda as etiquetas de rastreamento (UTMs/fbclid) na chegada.
  useEffect(() => {
    captureLandingParams();
  }, []);

  // Meta Pixel: ViewContent ao chegar na tela de oferta.
  useEffect(() => {
    if (step.type === "offer") {
      fbTrack("ViewContent", {
        content_name: "365 Días con María",
        value: 9.9,
        currency: "MXN",
      });
    }
  }, [step.type]);

  const showChrome = step.type !== "cover" && step.type !== "offer";
  const showIcon =
    showChrome && step.type !== "prayer" && step.type !== "loading";
  const progress = "progress" in step ? step.progress : 0;

  return (
    <div className="box-border flex min-h-screen flex-auto items-start justify-center bg-white px-5 py-7 text-gray-950">
      <main className="flex w-full min-w-80 max-w-lg flex-auto flex-col gap-7 sm:pt-3">
        {showIcon && <MariaIcon />}

        {showChrome && (
          <div className="flex items-center gap-3">
            {index > 0 && (
              <button
                onClick={back}
                aria-label="Volver"
                className="text-lg text-gray-300 transition hover:text-gray-500"
              >
                ←
              </button>
            )}
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg,#2b50e6,#1c3ad2)",
                }}
              />
            </div>
          </div>
        )}

        <StepView
          key={index}
          step={step}
          name={name}
          prece={prece}
          onName={setName}
          onPrece={setPrece}
          onNext={next}
        />
      </main>
    </div>
  );
}

function StepView({
  step,
  name,
  prece,
  onName,
  onPrece,
  onNext,
}: {
  step: Step;
  name: string;
  prece: string;
  onName: (v: string) => void;
  onPrece: (v: string) => void;
  onNext: () => void;
}) {
  switch (step.type) {
    case "cover":
      return <Cover step={step} onNext={onNext} />;
    case "single":
      return <Single step={step} onNext={onNext} />;
    case "name":
      return <NameStep step={step} onName={onName} onNext={onNext} />;
    case "info":
      return <Info step={step} name={name} onNext={onNext} />;
    case "audio":
      return <Audio step={step} onNext={onNext} />;
    case "prayer":
      return <Prayer step={step} name={name} onPrece={onPrece} onNext={onNext} />;
    case "loading":
      return <Loading step={step} name={name} prece={prece} onNext={onNext} />;
    case "offer":
      return <Offer />;
  }
}

/* ---------- telas ---------- */

function Cover({
  step,
  onNext,
}: {
  step: Extract<Step, { type: "cover" }>;
  onNext: () => void;
}) {
  return (
    <div className="step-enter flex flex-col items-center gap-7 text-center">
      <div className="space-y-3">
        <h2 className="text-lg font-extrabold tracking-wide text-cyan">{step.kicker}</h2>
        <p className="text-sm text-gray-700">{step.kickerSub}</p>
      </div>
      <h1 className="text-lg font-extrabold leading-snug text-cyan">{step.headline}</h1>
      <CaminhandoCover />
      <button onClick={onNext} className="btn-blue text-base">
        {step.cta}
      </button>
      <p className="text-sm text-gray-600">{step.footnote}</p>
    </div>
  );
}

function Single({
  step,
  onNext,
}: {
  step: Extract<Step, { type: "single" }>;
  onNext: () => void;
}) {
  return (
    <div className="step-enter flex flex-col gap-6 pt-4">
      <h2 className="text-center text-xl font-bold leading-snug sm:text-2xl">
        {step.question}
      </h2>
      <div className="flex flex-col gap-3.5">
        {step.options.map((opt) => (
          <button key={opt.label} onClick={onNext} className="opt-card">
            {opt.emoji && <span className="text-2xl">{opt.emoji}</span>}
            <span className="flex-1 text-center">{opt.label}</span>
          </button>
        ))}
      </div>
      {step.footer && (
        <p className="text-center text-base font-bold text-cyan">{step.footer}</p>
      )}
    </div>
  );
}

function NameStep({
  step,
  onName,
  onNext,
}: {
  step: Extract<Step, { type: "name" }>;
  onName: (v: string) => void;
  onNext: () => void;
}) {
  const [value, setValue] = useState("");
  const submit = () => {
    if (!value.trim()) return;
    fbTrack("Lead", { content_name: "Libro de Oraciones" });
    onName(value.trim());
    onNext();
  };
  return (
    <div className="step-enter flex flex-col gap-5 pt-2">
      <h2 className="text-center text-xl font-bold leading-snug sm:text-2xl">
        {step.question}
      </h2>
      <p className="text-center text-sm text-gray-600">{step.description}</p>
      <label className="field">
        <span className="text-gray-400">👤</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={step.placeholder}
        />
      </label>
      <button onClick={submit} disabled={!value.trim()} className="btn-blue text-base">
        {step.cta}
      </button>
    </div>
  );
}

function Info({
  step,
  name,
  onNext,
}: {
  step: Extract<Step, { type: "info" }>;
  name: string;
  onNext: () => void;
}) {
  return (
    <div className="step-enter flex flex-col gap-5 pt-2">
      <h2 className="text-center text-xl font-bold leading-snug sm:text-2xl">
        <WithName text={step.title} name={name} />
      </h2>
      <p className="text-center text-sm text-gray-600">{step.body}</p>
      <button onClick={onNext} className="btn-blue text-base">
        {step.cta}
      </button>
    </div>
  );
}

function Audio({
  step,
  onNext,
}: {
  step: Extract<Step, { type: "audio" }>;
  onNext: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0–1
  const [avatarOk, setAvatarOk] = useState(true);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="step-enter flex flex-col gap-6 pt-2">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-bold sm:text-2xl">{step.title}</h2>
        <p className="text-sm text-gray-600">{step.description}</p>
      </div>

      {/* player de áudio (real) */}
      <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
        <audio
          ref={audioRef}
          src="/audio/oracion.mp3"
          preload="metadata"
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            setProgress(el.duration ? el.currentTime / el.duration : 0);
          }}
          onEnded={() => {
            setPlaying(false);
            setProgress(0);
          }}
        />
        <button
          onClick={toggle}
          className="text-xl text-gray-800"
          aria-label={playing ? "Pausar oración" : "Reproducir oración"}
        >
          {playing ? "⏸" : "▶"}
        </button>
        <div className="flex flex-1 items-center justify-between">
          {Array.from({ length: 60 }).map((_, i) => {
            const reached = i / 60 <= progress;
            return (
              <span
                key={i}
                className={`w-[2px] shrink-0 rounded-full ${reached ? "bg-brand" : "bg-gray-300"}`}
                style={{
                  height: `${8 + ((i * 7) % 22)}px`,
                  animation: playing
                    ? `eq 1s ${i * 0.03}s ease-in-out infinite`
                    : undefined,
                }}
              />
            );
          })}
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-amber-900/80 text-lg">
          {avatarOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/img/padre.png"
              alt="Padre"
              className="h-full w-full object-cover"
              onError={() => setAvatarOk(false)}
            />
          ) : (
            "🧑‍🦳"
          )}
        </div>
      </div>

      <button onClick={onNext} className="btn-blue text-base">
        {step.cta}
      </button>
    </div>
  );
}

function Prayer({
  step,
  name,
  onPrece,
  onNext,
}: {
  step: Extract<Step, { type: "prayer" }>;
  name: string;
  onPrece: (v: string) => void;
  onNext: () => void;
}) {
  const [value, setValue] = useState("");
  const submit = () => {
    onPrece(value.trim());
    onNext();
  };
  return (
    <div className="step-enter flex flex-col gap-5 pt-4">
      <h2 className="text-center text-xl font-bold sm:text-2xl">{step.title}</h2>
      <Rich html={step.intro} name={name} className="text-center text-gray-700" />
      <Rich html={step.body} name={name} className="text-center text-gray-800" />
      <Rich
        html={step.emphasis}
        name={name}
        className="text-center font-bold text-gray-900"
      />
      <Rich html={step.note} name={name} className="text-center text-gray-600" />
      <label className="field">
        <span className="text-gray-400">👤</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={step.placeholder}
        />
      </label>
      <button onClick={submit} className="btn-blue text-base">
        {step.cta}
      </button>
    </div>
  );
}

function Loading({
  step,
  name,
  prece,
  onNext,
}: {
  step: Extract<Step, { type: "loading" }>;
  name: string;
  prece: string;
  onNext: () => void;
}) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => (p >= 100 ? 100 : p + 2));
    }, 70);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="step-enter flex flex-col items-center gap-7 pt-2 text-center">
      <Rich
        html={step.topText}
        name={name}
        prece={prece || "una vida bendecida"}
        className="text-xl font-bold leading-snug text-gray-900"
      />
      <DevocionalCover className="w-44" />
      <div className="w-full">
        <div className="relative h-7 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="flex h-full items-center justify-center rounded-full text-xs font-bold text-white transition-all duration-75"
            style={{ width: `${pct}%`, background: "linear-gradient(90deg,#2b50e6,#1c3ad2)" }}
          >
            {pct}%
          </div>
        </div>
        <p className="mt-3 font-bold text-gray-900">{step.label}</p>
      </div>
      <button onClick={onNext} className="btn-blue text-base">
        {step.cta}
      </button>
    </div>
  );
}
