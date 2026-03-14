import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

interface SuccessDialogProps {
  open: boolean;
}

export default function SuccessDialog({ open }: SuccessDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="sm:max-w-224.75 w-full">
        <DialogHeader className="gap-6">
          <div className="flex flex-col gap-4">
            <CircleCheck size={36} />
            <span className="text-xl font-bold text-[#4D4D4D] uppercase">
              Conversation Request Received
            </span>
            <DialogTitle className="text-2xl md:text-[40px] font-light">
              Thank you for reaching out.
            </DialogTitle>
          </div>
          <DialogDescription className="text-base text-[#808080]">
            FEA is currently connecting with a select group of creators and
            partners ahead of launch. If there is alignment, a member of our
            team will be in touch. We appreciate your interest in helping shape
            the future of entertainment assets.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-7 py-3.5 text-base border border-[#1A1A1A] rounded-lg font-bold hover:bg-muted transition-colors"
          >
            Back to Home
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
