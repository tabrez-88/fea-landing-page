import Link from "next/link";

interface FormActionsProps {
  formId?: string;
  isLoading: boolean;
  submitLabel?: string;
}

export default function FormActions({
  formId,
  isLoading,
  submitLabel = "Start the Conversation",
}: FormActionsProps) {
  return (
    <div className="border-t p-6">
      <div className="flex justify-end gap-3">
        <Link
          href="/"
          className="inline-flex items-center font-bold justify-center px-7 py-3 border rounded-lg hover:bg-muted transition-colors"
        >
          Back
        </Link>
        <button
          type="submit"
          form={formId}
          disabled={isLoading}
          className="inline-flex items-center justify-center px-7 py-3 bg-black text-white font-bold rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : submitLabel}
        </button>
      </div>
    </div>
  );
}
