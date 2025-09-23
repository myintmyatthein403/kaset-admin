import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BaseField } from "./base-field";

interface SelectOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  field: any;
  title: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  options: SelectOption[];
  isMultiSelect?: boolean;
}

export function Combobox({
  field,
  title,
  placeholder = "Select an option...",
  required,
  className,
  options,
  isMultiSelect = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selectedValues = (isMultiSelect ? field.state.value || [] : [field.state.value]) as string[];

  const getButtonLabel = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }

    const labels = options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label);

    if (isMultiSelect) {
      // ၃ခုအထိပြပြီး ကျန်တာကို +n နဲ့ပြရန် logic
      const displayedLabels = labels.slice(0, 3);
      const remainingCount = labels.length - displayedLabels.length;
      let labelString = displayedLabels.join(", ");

      if (remainingCount > 0) {
        labelString += ` +${remainingCount}`;
      }
      return labelString;
    } else {
      // Single select အတွက်
      return labels[0] || placeholder;
    }
  };

  const handleSelect = (selectedValue: string) => {
    if (isMultiSelect) {
      const isSelected = selectedValues.includes(selectedValue);
      let newValues: string[];

      if (isSelected) {
        newValues = selectedValues.filter((value) => value !== selectedValue);
      } else {
        newValues = [...selectedValues, selectedValue];
      }
      field.handleChange(newValues);
    } else {
      // Single select logic
      const newValue = selectedValue === selectedValues[0] ? "" : selectedValue;
      field.handleChange(newValue);
      setOpen(false); // Close popover on single select
    }
  };

  return (
    <BaseField field={field} title={title} required={required}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", className)}
          >
            {getButtonLabel()}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={placeholder} className="h-9" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={(currentValue) => {
                      const selectedOption = options.find((option) => option.value === currentValue);
                      if (selectedOption) {
                        handleSelect(selectedOption.value);
                      }
                    }}
                  >
                    {opt.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedValues.includes(opt.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </BaseField>
  );
}
