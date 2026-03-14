import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnerSchema, type PartnerFormData } from "@/lib/schemas/partner";

export function usePartnerForm() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      partnerCategory: undefined,
      organizationName: "",
      yourRole: "",
      areaOfFocus: "",
      message: "",
      name: "",
      email: "",
      website: "",
    },
  });

  const onSubmit = async (data: PartnerFormData) => {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/partner", {
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
