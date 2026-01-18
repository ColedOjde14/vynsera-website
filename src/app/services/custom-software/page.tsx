// src/app/services/custom-software/page.tsx
import ServiceRequestForm from "@/components/ServiceRequestForm";

export default function CustomSoftwareRequest() {
  return (
    <ServiceRequestForm
      serviceSlug="custom-software"
      title="Custom Software & SaaS Development"
      description="Explain your software idea: purpose, key features, user roles, integrations, platforms (web/mobile), tech preferences, any existing code/assets, etc."
      budgetLabel="Expected Budget"
      timelineLabel="Desired Timeline"
    />
  );
}