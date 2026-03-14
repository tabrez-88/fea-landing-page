"use client";

import ContactSection from "@/components/Creator/ContactSection";
import OpportunitySection from "@/components/Creator/OpportunitySection";
import ProjectOverviewSection from "@/components/Creator/ProjectOverviewSection";
import FormActions from "@/components/form/FormActions";
import FormHeader from "@/components/form/FormHeader";
import SuccessDialog from "@/components/form/SuccessDialog";
import { useCreatorForm } from "@/hooks/use-creator-form";
import { CircleAlert } from "lucide-react";

export default function BringYourProjectToFEA() {
  const { register, handleSubmit, control, errors, submitStatus, errorMessage } =
    useCreatorForm();

  return (
    <main className="min-h-screen flex flex-col">
      <FormHeader />
      <section className="w-full flex flex-col gap-4 border-b px-4 md:px-16 lg:px-37.5 py-12">
        <span className="text-[#4D4D4D] font-bold uppercase">
          For Creator
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-[40px] font-light">
          Bring your project to <span className="font-bold">FEA</span>
        </h1>
      </section>
      <section className="flex flex-col gap-6 w-full px-4 md:px-16 lg:px-37.5 py-12">
        <div className="flex flex-col gap-4 text-[32px] leading-tight font-light text-[#1A1A1A]">
          <p>
            FEA is currently in a pre-launch phase.
          </p>
          <p>
            If you are developing a film or television project, music project,
            game, live event, creator-led initiative, or rights-based asset, we
            welcome an early conversation.
          </p>
        </div>
        <p className="text-[#808080]">
          Select opportunities may be reviewed ahead of launch.
        </p>

        <form id="creator-form" onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col gap-6 max-w-173.75">
            <ProjectOverviewSection control={control} errors={errors} />
            <OpportunitySection register={register} control={control} errors={errors} />
            <ContactSection register={register} errors={errors} />
            <div className="flex items-start gap-1 text-[#808080]">
              <CircleAlert size={24} className="size-6" />
              <p>
                FEA reviews opportunities selectively and will connect if there
                is mutual alignment.
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
      <FormActions formId="creator-form" isLoading={submitStatus === "loading"} />
      <SuccessDialog open={submitStatus === "success"} />
    </main>
  );
}
