import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";

export type RawasContent = SiteContent & {
  hero: SiteContent["hero"] & {
    finding: string;
    counts: { value: string; label: string }[];
  };
  roster: {
    eyebrow: string;
    heading: string;
    intro: string;
    tierLabels: Record<"facebook" | "instagram" | "event" | "posts", string>;
    tierNotes: Record<"facebook" | "instagram" | "event" | "posts", string>;
  };
  booth: {
    eyebrow: string;
    heading: string;
    intro: string;
    boothLabel: string;
  };
  portSaid: {
    eyebrow: string;
    heading: string;
    body: string;
    quoteLabel: string;
  };
  financing: {
    eyebrow: string;
    heading: string;
    intro: string;
    downLabel: string;
    /** Keyed by FinancingPlan.id from media.ts. */
    details: Record<string, string>;
  };
  contact: SiteContent["contact"] & {
    branchesLabel: string;
    /** Keyed by branch id from media.ts. */
    branchNames: Record<string, string>;
    branchAddresses: Record<string, string>;
    landlineLabel: string;
    hotlineLabel: string;
  };
};

export function useRawas() {
  return useContent() as RawasContent;
}
