import { Separator } from "@/components/ui/separator";
import FormRadioGroup from "@/components/form/FormRadioGroup";
import { assetTypes, engagementTypes, type CreatorFormData } from "@/lib/schemas/creator";
import { Control, FieldErrors } from "react-hook-form";

interface ProjectOverviewSectionProps {
  control: Control<CreatorFormData>;
  errors: FieldErrors<CreatorFormData>;
}

export default function ProjectOverviewSection({
  control,
  errors,
}: ProjectOverviewSectionProps) {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-bold">Project Overview</h2>
      <Separator className="mt-4 mb-6" />
      <div className="space-y-6">
        <FormRadioGroup
          label="Primary Asset Type"
          name="primaryAssetType"
          control={control}
          options={assetTypes}
          error={errors.primaryAssetType?.message}
        />
        <FormRadioGroup
          label="How are you considering engaging with FEA?"
          name="engagementType"
          control={control}
          options={engagementTypes}
          error={errors.engagementType?.message}
        />
      </div>
    </div>
  );
}
