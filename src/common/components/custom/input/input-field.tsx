import { EyeOff, Eye, RotateCw } from "lucide-react";
import { useState } from "react";
import { BaseField } from "./base-field";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface FieldComponentProps {
  field: any;
  title: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  options?: SelectOption[];
}

export const InputField = ({
  field,
  title,
  placeholder,
  type = "text",
  required = false,
  className,
}: FieldComponentProps) => {
  return (
    <BaseField field={field} title={title} required={required} className={className}>
      <Input
        id={field.name}
        placeholder={placeholder}
        type={type}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="rounded-md"
      />
    </BaseField>
  );
};

export const DescriptionField = ({ field, className }: FieldComponentProps) => {
  return (
    <BaseField field={field} title="Description" className={className}>
      <Textarea
        id={field.name}
        placeholder="Provide a detailed description..."
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="rounded-md min-h-[100px]"
      />
    </BaseField>
  );
};

export const SelectField = ({
  field,
  title,
  options = [],
  placeholder = "Select an option",
  required = false,
  className,
}: FieldComponentProps) => {
  return (
    <BaseField field={field} title={title} required={required} className={className}>
      <Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
        <SelectTrigger id={field.name} className="w-full rounded-md">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </BaseField>
  );
};

interface SlugFieldProps extends FieldComponentProps {
  handleGenerateSlug: () => void;
  isSpinning: boolean;
}

export const SlugField = ({
  field,
  title,
  placeholder = "",
  className,
  required = false,
  type = "text",
  handleGenerateSlug,
  isSpinning,
}: SlugFieldProps) => {
  return (
    <BaseField field={field} title={title} required={required} className={`relative ${className}`}>
      <Input
        id={field.name}
        placeholder={placeholder}
        type={type}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="rounded-md"
      />
      <button
        type="button"
        onClick={handleGenerateSlug}
        className={`absolute right-3 top-8 text-muted-foreground hover:text-foreground focus:outline-none ${isSpinning ? "animate-spin-once" : ""}`}
        aria-label="Generate slug"
      >
        <RotateCw />
      </button>
    </BaseField>
  );
};

export const PasswordField = ({
  field,
  title,
  placeholder = "••••••••",
  className,
  required = false,
}: FieldComponentProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <BaseField field={field} title={title} required={required} className={`relative ${className}`}>
      <Input
        id={field.name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="rounded-md pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-8 text-muted-foreground hover:text-foreground focus:outline-none"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </BaseField>
  );
};
