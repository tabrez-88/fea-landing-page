import React from "react";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, id, ...props }, ref) => (
    <div>
      <label className="font-bold" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        ref={ref}
        className="mt-2 w-full rounded-lg border border-[#E0E0E0] bg-transparent px-4 py-2 outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/50 resize-none"
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
