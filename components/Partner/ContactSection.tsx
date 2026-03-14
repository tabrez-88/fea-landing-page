import { Separator } from "@/components/ui/separator";
import FormInput from "@/components/form/FormInput";
import { type PartnerFormData } from "@/lib/schemas/partner";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ContactSectionProps {
  register: UseFormRegister<PartnerFormData>;
  errors: FieldErrors<PartnerFormData>;
}

export default function ContactSection({
  register,
  errors,
}: ContactSectionProps) {
  return (
    <div className="border rounded-lg p-6 md:p-8">
      <h2 className="text-lg font-bold">Contact</h2>
      <Separator className="mt-4 mb-6" />

      <div className="space-y-5">
        <FormInput
          label="Name"
          id="name"
          type="text"
          placeholder="Enter your name"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormInput
          label="Website (Optional)"
          id="website"
          type="url"
          placeholder="Website link if available"
          error={errors.website?.message}
          {...register("website")}
        />
      </div>
    </div>
  );
}
