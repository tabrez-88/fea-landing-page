import { Separator } from "@/components/ui/separator";
import FormInput from "@/components/form/FormInput";
import { type CreatorFormData } from "@/lib/schemas/creator";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ContactSectionProps {
  register: UseFormRegister<CreatorFormData>;
  errors: FieldErrors<CreatorFormData>;
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
          label="Company / Studio (Optional)"
          id="companyStudio"
          type="text"
          placeholder="Name of your company / studio"
          {...register("companyStudio")}
        />
        <FormInput
          label="Website or Deck (Optional)"
          id="websiteOrDeck"
          type="url"
          placeholder="Website or deck link if available"
          error={errors.websiteOrDeck?.message}
          {...register("websiteOrDeck")}
        />
      </div>
    </div>
  );
}
