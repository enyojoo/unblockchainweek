import { TicketPricingCards } from "@/components/tickets/TicketPricingCards";
import { getPricing } from "@/lib/content";
import { formatTicketPrice } from "@/lib/pricing";
import type { PartnerPage } from "@/lib/types";

export function PartnerTicketPricing({ partner }: { partner: PartnerPage }) {
  const baseTiers = getPricing();

  const tiers = baseTiers.map((tier) => {
    const partnerTier = partner.pricing[tier.id];

    return {
      ...tier,
      price: partnerTier.partnerPrice,
      publicPrice: partnerTier.publicPrice,
      checkoutUrl: partnerTier.checkoutUrl,
      discountLabel: partner.discountLabel,
      ctaLabel: `Buy ${tier.name} – $${formatTicketPrice(partnerTier.partnerPrice)}`,
    };
  });

  return (
    <TicketPricingCards
      tiers={tiers}
      partnerSlug={partner.slug}
      eyebrow="Tickets On Sale Now – Partner Community Pricing"
      title="Get Your Pass"
      subtitle="Exclusive community pricing for partner audiences."
      phaseNote="Partner pricing includes a 10% community discount on current public rates."
      phaseLabel="Partner Community Pricing"
      footerNote="Partner pricing is limited to this page."
      partnerPricing
    />
  );
}
