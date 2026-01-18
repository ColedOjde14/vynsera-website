// src/app/services/website/page.tsx
import ServiceRequestForm from "@/components/ServiceRequestForm";

export default function WebsiteRequest() {
  return (
    <ServiceRequestForm
      serviceSlug="website"
      title="Domain & Website Development"
      description="Describe your website goals: purpose (e-commerce, portfolio, blog, corporate), number of pages, features (contact form, booking, shop), preferred CMS, any existing domain/content, etc."
      budgetLabel="Expected Budget"
      timelineLabel="Desired Timeline"
    />
  );
}