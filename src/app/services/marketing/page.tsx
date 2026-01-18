// src/app/services/marketing/page.tsx
import ServiceRequestForm from "@/components/ServiceRequestForm";

export default function MarketingRequest() {
  return (
    <ServiceRequestForm
      serviceSlug="marketing"
      title="Digital Marketing & SEO"
      description="Share your marketing goals: platforms (Google, Instagram, Facebook, etc.), target audience, current online presence, keywords, budget allocation, any existing ads/content, etc."
      budgetLabel="Monthly/One-time Budget"
      timelineLabel="Desired Start Date"
    />
  );
}