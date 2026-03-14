"use client";

import FormActions from "@/components/form/FormActions";
import FormHeader from "@/components/form/FormHeader";
import SuccessDialog from "@/components/form/SuccessDialog";
import ContactSection from "@/components/Partner/ContactSection";
import OrganizationDetailsSection from "@/components/Partner/OrganizationDetailsSection";
import OrganizationOverviewSection from "@/components/Partner/OrganizationOverviewSection";
import { usePartnerForm } from "@/hooks/use-partner-form";
import { CircleAlert } from "lucide-react";

export default function PartnerWithFEA() {
  const { register, handleSubmit, control, errors, submitStatus, errorMessage } =
    usePartnerForm();

  return (
    <main className="min-h-screen flex flex-col">
      <FormHeader />
      <section className="w-full flex flex-col gap-4 border-b px-4 md:px-16 lg:px-37.5 py-12">
        <span className="text-[#4D4D4D] font-bold uppercase">
          For Partners
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-[40px] font-light">
          Partner With <span className="font-bold">FEA</span>
        </h1>
      </section>
      <section className="flex flex-col gap-6 w-full px-4 md:px-16 lg:px-37.5 py-12">
        <div className="flex flex-col gap-4 text-[32px] leading-tight font-light text-[#1A1A1A]">
          <p>
            FEA is building a curated network of capital partners, advisors,
            legal experts, and infrastructure providers supporting the next
            generation of entertainment assets.
          </p>
        </div>
        <p className="text-[#808080]">
          If your organization is interested in exploring an early
          relationship, we welcome a conversation.
        </p>

        <form id="partner-form" onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col gap-6 max-w-173.75">
            <OrganizationDetailsSection control={control} errors={errors} />
            <OrganizationOverviewSection register={register} errors={errors} />
            <ContactSection register={register} errors={errors} />
            <div className="flex items-start gap-1 text-[#808080]">
              <CircleAlert size={24} className="size-6" />
              <p>
                Partnership conversations are initiated on a selective basis.
              </p>
            </div>
            {submitStatus === "error" && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            )}
          </div>
        </form>
      </section>
      <FormActions formId="partner-form" isLoading={submitStatus === "loading"} />
      <SuccessDialog open={submitStatus === "success"} />
    </main>
  );
}
