import React from "react";
import { Label } from "../../ui/label";

interface BaseFieldProps {
  field: any;
  title?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const BaseField = ({ field, title, required = false, className, children }: BaseFieldProps) => {
  return (
    <div className={`grid gap-3 ${className}`}>
      {title && (
        <Label htmlFor={field.name}>
          {title} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      {children}
      {!field.state.meta.isValid && field.state.meta.errors?.[0]?.message && (
        <p className="text-sm text-red-500">{field.state.meta.errors[0]?.message}</p>
      )}
    </div>
  );
};
