import { z } from "zod";

export const assetTypes = [
  "Films & TV",
  "Music",
  "Games",
  "Live Events",
  "Catalog & Rights-Based Asset",
  "Creator Projects",
] as const;

export const engagementTypes = [
  "Perks-driven support",
  "Revenue participation",
  "Open to guidance",
] as const;

export const stages = [
  "Concept",
  "Development",
  "Production",
  "Completed / Revenue Generating",
] as const;

export const capitalProfiles = [
  "Under $250K",
  "$250K – $1M",
  "$1M – $5M",
  "$5M+",
] as const;

export const creatorSchema = z.object({
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

export type CreatorFormData = z.infer<typeof creatorSchema>;
