import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { creatorSchema, type CreatorFormData } from "@/lib/schemas/creator";

export function useCreatorForm() {
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

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    submitStatus,
    errorMessage,
  };
}
