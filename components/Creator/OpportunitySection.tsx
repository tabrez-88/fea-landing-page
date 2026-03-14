import { Separator } from "@/components/ui/separator";
import FormInput from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import FormRadioGroup from "@/components/form/FormRadioGroup";
import { stages, capitalProfiles, type CreatorFormData } from "@/lib/schemas/creator";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

interface OpportunitySectionProps {
  register: UseFormRegister<CreatorFormData>;
  control: Control<CreatorFormData>;
  errors: FieldErrors<CreatorFormData>;
}

export default function OpportunitySection({
  register,
  control,
  errors,
}: OpportunitySectionProps) {
  return (
    <div className="border rounded-lg p-6 md:p-8">
      <h2 className="text-lg font-bold">Tell Us About Your Opportunity</h2>
      <Separator className="mt-4 mb-6" />

      <div className="space-y-5">
        <FormInput
          label="Project Title"
          id="projectTitle"
          type="text"
          placeholder="What is the title of your project"
          error={errors.projectTitle?.message}
          {...register("projectTitle")}
        />
        <FormTextarea
          label="Brief Description"
          id="briefDescription"
          rows={5}
          placeholder="Share a concise overview of the opportunity..."
          error={errors.briefDescription?.message}
          {...register("briefDescription")}
        />
        <FormRadioGroup
          label="Stage"
          name="stage"
          control={control}
          options={stages}
          error={errors.stage?.message}
        />
        <FormRadioGroup
          label="Capital Profile (Optional)"
          name="capitalProfile"
          control={control}
          options={capitalProfiles}
        />
      </div>
    </div>
  );
}
