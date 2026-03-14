import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, ...props }, ref) => (
    <div>
      <label className="font-bold" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className="mt-2 w-full rounded-lg border border-[#E0E0E0] bg-transparent px-4 py-2 outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/50"
        {...props}
      />
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  )
);

FormInput.displayName = "FormInput";

export default FormInput;
