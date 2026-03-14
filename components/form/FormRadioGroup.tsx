import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormRadioGroupProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: readonly string[];
  error?: string;
}

export default function FormRadioGroup<T extends FieldValues>({
  label,
  name,
  control,
  options,
  error,
}: FormRadioGroupProps<T>) {
  return (
    <div>
      <h3 className="text-sm font-bold mb-3">{label}</h3>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            value={field.value ?? ""}
            onValueChange={field.onChange}
            className="gap-2.5"
          >
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2.5 cursor-pointer text-sm"
              >
                <RadioGroupItem value={option} />
                {option}
              </label>
            ))}
          </RadioGroup>
        )}
      />
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
