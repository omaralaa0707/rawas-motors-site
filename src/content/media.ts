/**
 * El Rawas Motors publish a different brand roster depending on exactly
 * where you look. Facebook's own "About" panel, Instagram's own bio, a
 * co-branded exhibition poster, and individual posts each add marques the
 * previous source didn't mention -- four real sources, four different
 * counts, all from the dealer's own material.
 */

export type RosterTier = "facebook" | "instagram" | "event" | "posts";

export type RosterBrand = {
  name: string;
  tier: RosterTier;
  /** The specific model shown as evidence for this brand, where sourced. */
  model?: string;
};

export const ROSTER: RosterBrand[] = [
  { name: "Peugeot", tier: "facebook", model: "408 Facelift" },
  { name: "MG", tier: "facebook", model: "RX9" },
  { name: "Opel", tier: "facebook", model: "Frontera" },
  { name: "Soueast", tier: "instagram", model: "S08 DM" },
  { name: "Kia", tier: "event", model: "Sportage" },
  { name: "Nissan", tier: "event", model: "Magnite" },
  { name: "Smart", tier: "posts", model: "#1 Brabus" },
  { name: "Kaiyi", tier: "posts", model: "X3 Pro" },
];

export const EVENT = {
  name: "Auto Center Point",
  venue: "Axis Mall, Suez Road",
  dates: "9–12 September",
  booth: "A3 / A4",
} as const;

export type FinancingPlan = {
  id: string;
  downPct: number;
  detail: string;
};

/** Two real, mutually exclusive financing structures published for the
 *  same car (Kia Sportage) in the same caption -- a lower deposit against
 *  an immediate cash incentive, or a higher deposit against a full year
 *  with no interest at all. */
export const SPORTAGE_PLANS: FinancingPlan[] = [
  { id: "cashback", downPct: 30, detail: "5% cash back on the down payment" },
  { id: "interest-free", downPct: 50, detail: "the rest over 1 year, zero interest" },
];

export const PROFILE = {
  instagram: {
    handle: "rawasmotors",
    url: "https://www.instagram.com/rawasmotors/",
    followers: "29.5K",
    posts: "817",
  },
  facebook: {
    handle: "rawasmotors",
    url: "https://www.facebook.com/rawasmotors/",
    followers: "144K",
    landline: "02 25783302",
  },
  hotline: "19618",
  /** Four addresses are named in Facebook's own "About" panel; only one
   *  resolves to a Maps link from the sourced bios (New Cairo, Ring Rd —
   *  likely the flagship), so branches are listed by their own published
   *  address text rather than four invented pins. */
  branchIds: ["madinaty", "fifthSettlement", "ramsis", "downtown"] as const,
  flagshipMapsUrl: "https://maps.app.goo.gl/ndHZkyQKZkse6pE99",
  portSaidQuote: "خلّي عينك على الرواس. بورسعيد أول محطة و الطريق قدامنا طويل 🚢",
} as const;
