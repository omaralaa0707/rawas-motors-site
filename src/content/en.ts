import type { RawasContent } from "./schema-ext";
import { PROFILE, EVENT } from "./media";

export const en: RawasContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "El Rawas Motors",
    shortName: "Rawas",
    tagline: "Authorized distributor — the list depends where you look",
  },

  nav: [
    { label: "The roster", href: "#roster" },
    { label: "The booth", href: "#booth" },
    { label: "Port Said", href: "#port-said" },
    { label: "Financing", href: "#financing" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Cairo & the road to Port Said, Egypt",
    headline: "Three brands, or four, or six, or eight",
    sub: "Facebook's own \"About\" panel names El Rawas Motors an authorized distributor for three marques. Instagram's own bio names four. A co-branded exhibition poster from their own feed shows six cars from six brands parked side by side. Individual posts advertise two more again. None of these sources contradicts another outright — each one is just narrower than the material that follows it.",
    primaryCta: "Call 19618",
    secondaryCta: "See the roster",
    finding: "Every number below is real and sourced. None of them agree, and the dealer never picked one to be the official count.",
    counts: [
      { value: "3", label: "brands, per Facebook's bio" },
      { value: "4", label: "brands, per Instagram's bio" },
      { value: "6", label: "brands, at one exhibition" },
      { value: "8", label: "brands, across everything sourced" },
    ],
  },

  about: { heading: "El Rawas Motors", body: [] },
  services: { heading: "The roster", items: [] },
  gallery: { heading: "The booth", items: [] },

  roster: {
    eyebrow: "The roster",
    heading: "Four sources, four different brand counts",
    intro: "Read in the order each source was actually checked, the roster only ever grows — it never has to correct itself, because no earlier source claimed to be complete.",
    tierLabels: {
      facebook: "Stated on Facebook",
      instagram: "Added on Instagram",
      event: `Added at ${EVENT.name}`,
      posts: "Added in individual posts",
    },
    tierNotes: {
      facebook: "Facebook's \"About\" panel: \"Authorized distributor of Peugeot, MG and Opel in Egypt.\"",
      instagram: "Instagram's own bio adds a fourth: \"Authorized distributor of Peugeot, MG, Opel and Soueast in Egypt.\"",
      event: `A single co-branded poster for the ${EVENT.name} exhibition (${EVENT.venue}, ${EVENT.dates}) shows six cars from six marques parked together — two of them, Kia and Nissan, appear in neither bio.`,
      posts: "Individual posts advertise a Smart #1 Brabus and a Kaiyi X3 Pro on their own, bringing the total sourced here to eight.",
    },
  },

  booth: {
    eyebrow: "The booth",
    heading: `Booth ${EVENT.booth}, ${EVENT.venue}`,
    intro: `Half of what's sourced here isn't a permanent showroom at all — it's a rented booth at someone else's exhibition. ${EVENT.name} ran ${EVENT.dates} at ${EVENT.venue}; Rawas's stand for it is rebuilt below as the temporary structure it actually was.`,
    boothLabel: "Booth",
  },

  portSaid: {
    eyebrow: "Coming next",
    heading: "Port Said: not a branch yet, a promise",
    body: "Every other location in this concept site is a real, currently operating address. Port Said isn't — it's a single teaser post, no address, no opening date, just a name and a ship. It's kept separate from the branch list for exactly that reason: a plan is not a place, even when the dealer is confident enough to publish it.",
    quoteLabel: "Their own caption, quoted in full",
  },

  financing: {
    eyebrow: "One car, two structures",
    heading: "Kia Sportage: pay less now, or pay nothing extra later",
    intro: "The same caption offers two mutually exclusive ways to buy the same car — a smaller deposit with money back immediately, or a larger deposit with a full year of zero-interest instalments.",
    downLabel: "Down payment",
    details: {
      cashback: "5% cash back on the down payment",
      "interest-free": "the rest over 1 year, zero interest",
    },
  },

  contact: {
    heading: "Find them",
    addressLabel: "Branches",
    address: "Madinaty · Fifth Settlement · Ramsis St, Qasr El Nil · Hoda Shaarawy St, Downtown",
    phoneLabel: "Phone",
    phones: [PROFILE.hotline, PROFILE.facebook.landline],
    mapsUrl: PROFILE.flagshipMapsUrl,
    instagramUrl: PROFILE.instagram.url,
    facebookUrl: PROFILE.facebook.url,
    cta: "Open flagship in Maps",
    branchesLabel: "Four branches, as published",
    branchNames: {
      madinaty: "Madinaty",
      fifthSettlement: "Fifth Settlement",
      ramsis: "Ramsis St, Qasr El Nil",
      downtown: "Hoda Shaarawy St, Downtown",
    },
    branchAddresses: {
      madinaty: "Madinaty, Cairo",
      fifthSettlement: "Fifth Settlement, New Cairo",
      ramsis: "Ramsis St, Qasr El Nil, Cairo",
      downtown: "Hoda Shaarawy St, Downtown Cairo",
    },
    landlineLabel: "Landline (Facebook only)",
    hotlineLabel: "Hotline",
  },

  footer: {
    rights: "© El Rawas Motors. All rights reserved.",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
