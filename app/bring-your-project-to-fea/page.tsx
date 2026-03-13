"use client";

import Image from "next/image";
import Link from "next/link";
import FEALogo from "@/public/assets/fea-light.png";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const assetTypes = [
  "Films & TV",
  "Music",
  "Games",
  "Live Events",
  "Catalog & Rights-Based Asset",
  "Creator Projects",
] as const;

const engagementTypes = [
  "Perks-driven support",
  "Revenue participation",
  "Open to guidance",
] as const;

const stages = [
  "Concept",
  "Development",
  "Production",
  "Completed / Revenue Generating",
] as const;

const capitalProfiles = [
  "Under $250K",
  "$250K – $1M",
  "$1M – $5M",
  "$5M+",
] as const;

const creatorSchema = z.object({
  primaryAssetType: z
    .enum(assetTypes)
    .catch(undefined as never)
    .refine((val) => val !== undefined, {
      message: "Please select a primary asset type",
    }),
  engagementType: z
    .enum(engagementTypes)
    .catch(undefined as never)
    .refine((val) => val !== undefined, {
      message: "Please select how you want to engage",
    }),
  projectTitle: z
    .string()
    .min(1, "Project title is required")
    .max(200, "Project title is too long"),
  briefDescription: z
    .string()
    .min(1, "Brief description is required")
    .max(3000, "Description is too long"),
  stage: z
    .enum(stages)
    .catch(undefined as never)
    .refine((val) => val !== undefined, {
      message: "Please select a project stage",
    }),
  capitalProfile: z.enum(capitalProfiles).optional(),
  name: z.string().min(1, "Name is required").max(200, "Name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Please enter a valid email address" }),
  companyStudio: z.string().max(200, "Company name is too long").optional(),
  websiteOrDeck: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .or(z.literal(""))
    .optional(),
});

type CreatorFormData = z.infer<typeof creatorSchema>;

export default function BringYourProjectToFEA() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatorFormData>({
    resolver: zodResolver(creatorSchema),
    defaultValues: {
      primaryAssetType: undefined,
      engagementType: undefined,
      projectTitle: "",
      briefDescription: "",
      stage: undefined,
      capitalProfile: undefined,
      name: "",
      email: "",
      companyStudio: "",
      websiteOrDeck: "",
    },
  });

  const onSubmit = async (data: CreatorFormData) => {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/creator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body?.message || "Something went wrong. Please try again."
        );
      }

      setSubmitStatus("success");
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Success Dialog */}
      <Dialog open={submitStatus === "success"}>
        <DialogContent showCloseButton={false} className="sm:max-w-lg">
          <DialogHeader>
            <svg
              className="w-10 h-10 mb-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              Conversation Request Received
            </span>
            <DialogTitle className="text-2xl md:text-3xl font-light">
              Thank you for reaching out.
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              FEA is currently connecting with a select group of creators and
              partners ahead of launch. If there is alignment, a member of our
              team will be in touch. We appreciate your interest in helping shape
              the future of entertainment assets.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 border rounded-full text-sm font-medium hover:bg-muted transition-colors"
            >
              Back to Home
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <header className="w-full bg-[#111111] px-8 md:px-16 lg:px-24 py-6">
        <Link href="/">
          <Image src={FEALogo} alt="FEA Logo" className="h-10 w-10" />
        </Link>
      </header>

      {/* Title Section */}
      <section className="w-full bg-[#FAFAFA] border-b px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-[0.2em] uppercase">
            For Creator
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-light">
            Bring your project to <span className="font-bold">FEA</span>
          </h1>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-3xl">
          <p className="text-lg md:text-xl leading-relaxed">
            FEA is currently in a pre-launch phase.
          </p>
          <p className="mt-4 text-lg md:text-xl leading-relaxed">
            If you are developing a film or television project, music project,
            game, live event, creator-led initiative, or rights-based asset, we
            welcome an early conversation.
          </p>
          <p className="mt-4 text-sm opacity-60">
            Select opportunities may be reviewed ahead of launch.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
            {/* Project Overview Card */}
            <div className="border rounded-lg p-6 md:p-8">
              <h2 className="text-lg font-bold">Project Overview</h2>
              <Separator className="mt-4 mb-6" />

              <div className="space-y-6">
                {/* Primary Asset Type */}
                <div>
                  <h3 className="text-sm font-bold mb-3">Primary Asset Type</h3>
                  <Controller
                    control={control}
                    name="primaryAssetType"
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="gap-2.5"
                      >
                        {assetTypes.map((type) => (
                          <label
                            key={type}
                            className="flex items-center gap-2.5 cursor-pointer text-sm"
                          >
                            <RadioGroupItem value={type} />
                            {type}
                          </label>
                        ))}
                      </RadioGroup>
                    )}
                  />
                  {errors.primaryAssetType && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.primaryAssetType.message}
                    </p>
                  )}
                </div>

                {/* Engagement Type */}
                <div>
                  <h3 className="text-sm font-bold mb-3">
                    How are you considering engaging with FEA?
                  </h3>
                  <Controller
                    control={control}
                    name="engagementType"
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="gap-2.5"
                      >
                        {engagementTypes.map((type) => (
                          <label
                            key={type}
                            className="flex items-center gap-2.5 cursor-pointer text-sm"
                          >
                            <RadioGroupItem value={type} />
                            {type}
                          </label>
                        ))}
                      </RadioGroup>
                    )}
                  />
                  {errors.engagementType && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.engagementType.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Tell Us About Your Opportunity Card */}
            <div className="border rounded-lg p-6 md:p-8">
              <h2 className="text-lg font-bold">
                Tell Us About Your Opportunity
              </h2>
              <Separator className="mt-4 mb-6" />

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-bold" htmlFor="projectTitle">
                    Project Title
                  </label>
                  <input
                    id="projectTitle"
                    type="text"
                    placeholder="What is the title of your project"
                    className="mt-2 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/50"
                    {...register("projectTitle")}
                  />
                  {errors.projectTitle && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.projectTitle.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="text-sm font-bold"
                    htmlFor="briefDescription"
                  >
                    Brief Description
                  </label>
                  <textarea
                    id="briefDescription"
                    rows={5}
                    placeholder="Share a concise overview of the opportunity..."
                    className="mt-2 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/50 resize-none"
                    {...register("briefDescription")}
                  />
                  {errors.briefDescription && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.briefDescription.message}
                    </p>
                  )}
                </div>

                {/* Stage */}
                <div>
                  <h3 className="text-sm font-bold mb-3">Stage</h3>
                  <Controller
                    control={control}
                    name="stage"
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="gap-2.5"
                      >
                        {stages.map((stage) => (
                          <label
                            key={stage}
                            className="flex items-center gap-2.5 cursor-pointer text-sm"
                          >
                            <RadioGroupItem value={stage} />
                            {stage}
                          </label>
                        ))}
                      </RadioGroup>
                    )}
                  />
                  {errors.stage && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.stage.message}
                    </p>
                  )}
                </div>

                {/* Capital Profile */}
                <div>
                  <h3 className="text-sm font-bold mb-3">
                    Capital Profile (Optional)
                  </h3>
                  <Controller
                    control={control}
                    name="capitalProfile"
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                        className="gap-2.5"
                      >
                        {capitalProfiles.map((profile) => (
                          <label
                            key={profile}
                            className="flex items-center gap-2.5 cursor-pointer text-sm"
                          >
                            <RadioGroupItem value={profile} />
                            {profile}
                          </label>
                        ))}
                      </RadioGroup>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="border rounded-lg p-6 md:p-8">
              <h2 className="text-lg font-bold">Contact</h2>
              <Separator className="mt-4 mb-6" />

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-bold" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="mt-2 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/50"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-bold" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-2 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/50"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-bold" htmlFor="companyStudio">
                    Company / Studio (Optional)
                  </label>
                  <input
                    id="companyStudio"
                    type="text"
                    placeholder="Name of your company / studio"
                    className="mt-2 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/50"
                    {...register("companyStudio")}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold" htmlFor="websiteOrDeck">
                    Website or Deck (Optional)
                  </label>
                  <input
                    id="websiteOrDeck"
                    type="url"
                    placeholder="Website or deck link if available"
                    className="mt-2 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/50"
                    {...register("websiteOrDeck")}
                  />
                  {errors.websiteOrDeck && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.websiteOrDeck.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
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
                FEA reviews opportunities selectively and will connect if there
                is mutual alignment.
              </p>
            </div>

            {/* Error Message */}
            {submitStatus === "error" && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            )}

            {/* Action Buttons */}
            <Separator />
            <div className="flex justify-end gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-2.5 border rounded-full text-sm font-medium hover:bg-muted transition-colors"
              >
                Back
              </Link>
              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus === "loading"
                  ? "Submitting..."
                  : "Start the Conversation"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
