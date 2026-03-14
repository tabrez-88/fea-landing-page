import { Separator } from "@/components/ui/separator";
import FormInput from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import { type PartnerFormData } from "@/lib/schemas/partner";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface OrganizationOverviewSectionProps {
  register: UseFormRegister<PartnerFormData>;
  errors: FieldErrors<PartnerFormData>;
}

export default function OrganizationOverviewSection({
  register,
  errors,
}: OrganizationOverviewSectionProps) {
  return (
    <div className="border rounded-lg p-6 md:p-8">
      <h2 className="text-lg font-bold">Organization Overview</h2>
      <Separator className="mt-4 mb-6" />

      <div className="space-y-5">
        <FormInput
          label="Organization Name"
          id="organizationName"
          type="text"
          placeholder="Enter your organization name"
          error={errors.organizationName?.message}
          {...register("organizationName")}
        />
        <FormInput
          label="Your Role"
          id="yourRole"
          type="text"
          placeholder="What is your role in the organization"
          error={errors.yourRole?.message}
          {...register("yourRole")}
        />
        <FormInput
          label="Area of Focus (Optional)"
          id="areaOfFocus"
          type="text"
          placeholder="Let us know the area of focus of the organization"
          {...register("areaOfFocus")}
        />
        <FormTextarea
          label="Message"
          id="message"
          rows={5}
          placeholder="A brief note about your interest in partnering with FEA..."
          error={errors.message?.message}
          {...register("message")}
        />
      </div>
    </div>
  );
}
