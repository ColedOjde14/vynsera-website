// src/app/services/branding/page.tsx
import ServiceRequestForm from "@/components/ServiceRequestForm";

export default function BrandingRequest() {
  return (
    <ServiceRequestForm
      serviceSlug="branding"
      title="Business Digital Identity & Branding"
      description="Tell us about your branding needs: industry, target audience, style preferences (minimal, bold, vintage, etc.), colors, any existing assets, and desired deliverables."
      budgetLabel="Expected Budget"
      timelineLabel="Desired Timeline"
    />
  );
}