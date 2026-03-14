import { Separator } from "@/components/ui/separator";
import FormRadioGroup from "@/components/form/FormRadioGroup";
import { partnerCategories, type PartnerFormData } from "@/lib/schemas/partner";
import { Control, FieldErrors } from "react-hook-form";

interface OrganizationDetailsSectionProps {
  control: Control<PartnerFormData>;
  errors: FieldErrors<PartnerFormData>;
}

export default function OrganizationDetailsSection({
  control,
  errors,
}: OrganizationDetailsSectionProps) {
  return (
    <div className="border rounded-lg p-6 md:p-8">
      <h2 className="text-lg font-bold">Organization Details</h2>
      <Separator className="mt-4 mb-6" />

      <FormRadioGroup
        label="Partner Category"
        name="partnerCategory"
        control={control}
        options={partnerCategories}
        error={errors.partnerCategory?.message}
      />
    </div>
  );
}
