import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

interface SuccessDialogProps {
  open: boolean;
}

export default function SuccessDialog({ open }: SuccessDialogProps) {
  return (
    <Dialog open={open}>
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
  );
}
