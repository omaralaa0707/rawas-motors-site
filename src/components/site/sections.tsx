"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";
import { useRawas } from "@/content/schema-ext";
import { ROSTER, SPORTAGE_PLANS, PROFILE, type RosterTier } from "@/content/media";
import { Booth } from "@/components/webgl/booth";

/* ---------------------------------------------------------------- motion -- */

function useOnScreen<T extends HTMLElement>(rootMargin = "-8% 0px -8% 0px") {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

function ui(i: number): CSSProperties {
  return { "--unroll-i": i } as CSSProperties;
}

function Unroll({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useOnScreen<HTMLDivElement>();
  return (
    <div ref={ref} data-unroll="" className={className}>
      {children}
    </div>
  );
}

const TIER_ORDER: RosterTier[] = ["facebook", "instagram", "event", "posts"];

/* -------------------------------------------------------------------- nav -- */

export function Nav() {
  const { dir, toggleLocale } = useLocale();
  const c = useRawas();
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-ground/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="signmark flex items-center gap-2 text-base">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red text-[11px] font-bold text-white">R</span>
          EL RAWAS MOTORS
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {c.nav.map((l) => (
            <a key={l.href} href={l.href} className="label hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <button onClick={toggleLocale} className="chip rounded-sm border border-red-fill/50 px-2.5 py-1.5 text-red-fill">
          {dir === "rtl" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------- hero -- */

function Hero() {
  const c = useRawas();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/media/hero-sportage.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/88 to-ground/40" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-14 sm:pt-20">
        <Unroll className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div data-unroll-item style={ui(0)} className="min-w-0">
            <p className="label mb-4">{c.hero.eyebrow}</p>
            <h1 className="sign text-hero m-hero mb-5">{c.hero.headline}</h1>
            <p className="text-lead max-w-prose text-muted">{c.hero.sub}</p>
            <p className="fine mt-4 border-s-2 border-red-fill ps-3 italic">{c.hero.finding}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`tel:${PROFILE.hotline}`} className="rounded-sm bg-red-fill px-5 py-2.5 text-sm font-semibold text-white">
                {c.hero.primaryCta}
              </a>
              <a href="#roster" className="label rounded-sm border border-ink/25 px-5 py-2.5">
                {c.hero.secondaryCta}
              </a>
            </div>
          </div>
          <div data-unroll-item style={ui(1)} className="grid grid-cols-2 gap-3 self-start">
            {c.hero.counts.map((s) => (
              <div key={s.label} className="rounded-sm bg-panel/95 p-4 shadow-sm backdrop-blur-sm">
                <p className="signmark tnum text-3xl text-red-fill">{s.value}</p>
                <p className="fine text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Unroll>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- roster -- */

function Roster() {
  const c = useRawas();
  return (
    <section id="roster" className="border-t border-ink/10 bg-panel py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Unroll className="max-w-3xl">
          <p data-unroll-item style={ui(0)} className="label mb-3">{c.roster.eyebrow}</p>
          <h2 data-unroll-item style={ui(1)} className="sign text-display m-head mb-4">{c.roster.heading}</h2>
          <p data-unroll-item style={ui(2)} className="text-muted">{c.roster.intro}</p>
        </Unroll>

        <Unroll className="mt-8 flex flex-col gap-3">
          {TIER_ORDER.map((tier, i) => {
            const brands = ROSTER.filter((b) => b.tier === tier);
            return (
              <div key={tier} data-unroll-item style={ui(i)} className="rounded-sm bg-ground p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="label">{c.roster.tierLabels[tier]}</p>
                  <div className="flex flex-wrap gap-2">
                    {brands.map((b) => (
                      <span key={b.name} className="latin chip rounded-sm bg-panel-2 px-2.5 py-1 normal-case">
                        {b.name} <span className="text-muted">· {b.model}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <p className="fine mt-2 text-muted">{c.roster.tierNotes[tier]}</p>
              </div>
            );
          })}
        </Unroll>

        <Unroll className="mt-6">
          <div data-unroll-item style={ui(0)} className="relative aspect-[3/4] w-full min-w-0 overflow-hidden rounded-sm sm:aspect-[16/10]">
            <Image src="/media/event-poster.jpg" alt="" fill className="object-cover object-top" sizes="(min-width: 1024px) 60vw, 100vw" />
          </div>
        </Unroll>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ booth -- */

function BoothSection() {
  const c = useRawas();
  return (
    <section id="booth" className="border-t border-ink/10 py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Unroll className="max-w-3xl">
          <p data-unroll-item style={ui(0)} className="label mb-3">{c.booth.eyebrow}</p>
          <h2 data-unroll-item style={ui(1)} className="sign text-display m-head mb-4">{c.booth.heading}</h2>
          <p data-unroll-item style={ui(2)} className="text-muted">{c.booth.intro}</p>
        </Unroll>
        <div className="mt-8">
          <Booth />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- portSaid -- */

function PortSaid() {
  const c = useRawas();
  return (
    <section id="port-said" className="border-t border-ink/10 bg-panel py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Unroll className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div data-unroll-item style={ui(0)} className="min-w-0">
            <p className="label mb-3">{c.portSaid.eyebrow}</p>
            <h2 className="sign text-display m-head mb-4">{c.portSaid.heading}</h2>
            <p className="text-muted">{c.portSaid.body}</p>
            <p className="fine mt-4 border-s-2 border-red-fill ps-3 italic">
              {c.portSaid.quoteLabel}: &ldquo;{PROFILE.portSaidQuote}&rdquo;
            </p>
          </div>
          <div data-unroll-item style={ui(1)} className="relative aspect-[3/4] w-full min-w-0 overflow-hidden rounded-sm">
            <Image src="/media/port-said.jpg" alt="" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 90vw" />
          </div>
        </Unroll>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- financing -- */

function Financing() {
  const c = useRawas();
  return (
    <section id="financing" className="border-t border-ink/10 py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Unroll className="max-w-3xl">
          <p data-unroll-item style={ui(0)} className="label mb-3">{c.financing.eyebrow}</p>
          <h2 data-unroll-item style={ui(1)} className="sign text-display m-head mb-4">{c.financing.heading}</h2>
          <p data-unroll-item style={ui(2)} className="text-muted">{c.financing.intro}</p>
        </Unroll>

        <Unroll className="mt-8 grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div data-unroll-item style={ui(0)} className="relative aspect-[4/5] w-full min-w-0 overflow-hidden rounded-sm">
            <Image src="/media/sportage-financing.jpg" alt="" fill className="object-cover" sizes="(min-width: 768px) 40vw, 90vw" />
          </div>
          <div data-unroll-item style={ui(1)} className="grid gap-4 sm:grid-cols-2">
            {SPORTAGE_PLANS.map((p) => (
              <div key={p.id} className="rounded-sm bg-panel p-5">
                <p className="signmark tnum text-4xl text-red-fill">{p.downPct}%</p>
                <p className="fine mb-3 text-muted">{c.financing.downLabel}</p>
                <p className="text-sm">{c.financing.details[p.id]}</p>
              </div>
            ))}
          </div>
        </Unroll>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- contact -- */

function Contact() {
  const c = useRawas();
  return (
    <section id="contact" className="border-t border-ink/10 bg-panel py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Unroll className="grid gap-8 md:grid-cols-2">
          <div data-unroll-item style={ui(0)}>
            <h2 className="sign text-display m-head mb-4">{c.contact.heading}</h2>
            <p className="label mb-2">{c.contact.branchesLabel}</p>
            <div className="flex flex-col gap-2">
              {PROFILE.branchIds.map((id) => (
                <div key={id} className="rounded-sm bg-ground p-3">
                  <p className="text-sm font-semibold">{c.contact.branchNames[id]}</p>
                  <p className="fine text-muted">{c.contact.branchAddresses[id]}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3 rounded-sm bg-ground p-3">
                <span className="fine text-muted">{c.contact.hotlineLabel}</span>
                <span className="latin tnum chip normal-case">{PROFILE.hotline}</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-sm bg-ground p-3">
                <span className="fine text-muted">{c.contact.landlineLabel}</span>
                <span className="latin tnum chip normal-case">{PROFILE.facebook.landline}</span>
              </div>
            </div>
          </div>
          <div data-unroll-item style={ui(1)} className="flex flex-col items-start gap-3">
            <a href={c.contact.mapsUrl} target="_blank" rel="noreferrer" className="rounded-sm bg-red-fill px-5 py-2.5 text-sm font-semibold text-white">
              {c.contact.cta}
            </a>
            <div className="flex flex-wrap gap-3">
              {c.contact.instagramUrl && (
                <a href={c.contact.instagramUrl} target="_blank" rel="noreferrer" className="label rounded-sm border border-ink/25 px-5 py-2.5">Instagram</a>
              )}
              {c.contact.facebookUrl && (
                <a href={c.contact.facebookUrl} target="_blank" rel="noreferrer" className="label rounded-sm border border-ink/25 px-5 py-2.5">Facebook</a>
              )}
            </div>
          </div>
        </Unroll>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ shell -- */

export function Sections() {
  return (
    <main>
      <Hero />
      <Roster />
      <BoothSection />
      <PortSaid />
      <Financing />
      <Contact />
    </main>
  );
}

export function Footer() {
  const c = useRawas();
  return (
    <footer className="border-t border-ink/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5">
        <p className="fine text-muted">{c.footer.rights}</p>
      </div>
    </footer>
  );
}
