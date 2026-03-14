import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface FormActionsProps {
  isLoading: boolean;
  submitLabel?: string;
}

export default function FormActions({
  isLoading,
  submitLabel = "Start the Conversation",
}: FormActionsProps) {
  return (
    <>
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
          disabled={isLoading}
          className="inline-flex items-center justify-center px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : submitLabel}
        </button>
      </div>
    </>
  );
}
