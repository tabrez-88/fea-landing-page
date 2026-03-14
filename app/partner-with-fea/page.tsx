"use client";

import FormActions from "@/components/form/FormActions";
import FormHeader from "@/components/form/FormHeader";
import SuccessDialog from "@/components/form/SuccessDialog";
import ContactSection from "@/components/Partner/ContactSection";
import OrganizationDetailsSection from "@/components/Partner/OrganizationDetailsSection";
import OrganizationOverviewSection from "@/components/Partner/OrganizationOverviewSection";
import { usePartnerForm } from "@/hooks/use-partner-form";

export default function PartnerWithFEA() {
  const { register, handleSubmit, control, errors, submitStatus, errorMessage } = usePartnerForm();

  return (
    <div className="min-h-screen flex flex-col">
      <FormHeader />
      <section className="w-full bg-[#FAFAFA] border-b px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-[0.2em] uppercase">
            For Partners
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-light">
            Partner With <span className="font-bold">FEA</span>
          </h1>
        </div>
      </section>
      <section className="w-full px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-3xl">
          <p className="text-lg md:text-xl leading-relaxed">
            FEA is building a curated network of capital partners, advisors,
            legal experts, and infrastructure providers supporting the next
            generation of entertainment assets.
          </p>
          <p className="mt-4 text-sm opacity-60">
            If your organization is interested in exploring an early
            relationship, we welcome a conversation.
          </p>
          <form onSubmit={handleSubmit} className="mt-10 space-y-8">
            <OrganizationDetailsSection control={control} errors={errors} />
            <OrganizationOverviewSection register={register} errors={errors} />
            <ContactSection register={register} errors={errors} />
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0 opacity-40"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs opacity-40">
                Partnership conversations are initiated on a selective basis.
              </p>
            </div>
            {submitStatus === "error" && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            )}
            <FormActions isLoading={submitStatus === "loading"} />
          </form>
        </div>
      <SuccessDialog open={submitStatus === "success"} />
      </section>
    </div>
  );
}
