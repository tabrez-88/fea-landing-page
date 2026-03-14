import { z } from "zod";

export const partnerCategories = [
  "Capital Partner / Investor",
  "Strategic Advisor",
  "Legal / Compliance",
  "Distribution",
  "Studio / Production",
  "Technology Infrastructure",
  "Brand / Sponsorship",
  "Other",
] as const;

export const partnerSchema = z.object({
  partnerCategory: z
    .enum(partnerCategories)
    .catch(undefined as never)
    .refine((val) => val !== undefined, {
      message: "Please select a partner category",
    }),
  organizationName: z
    .string()
    .min(1, "Organization name is required")
    .max(200, "Organization name is too long"),
  yourRole: z
    .string()
    .min(1, "Your role is required")
    .max(200, "Role is too long"),
  areaOfFocus: z.string().max(200, "Area of focus is too long").optional(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message is too long"),
  name: z.string().min(1, "Name is required").max(200, "Name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Please enter a valid email address" }),
  website: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .or(z.literal(""))
    .optional(),
});

export type PartnerFormData = z.infer<typeof partnerSchema>;
