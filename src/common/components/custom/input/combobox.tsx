import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/src/common/lib/utils"
import { Button } from "@/src/common/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/src/common/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/common/components/ui/popover"
import { BaseField } from "./base-field"

interface SelectOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  field: any;
  title: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  options: SelectOption[];
}

export function Combobox({
  field,
  title,
  placeholder = "Select an option...",
  required,
  className,
  options
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const valueFromForm = field.state.value as string;
  const selectedLabel = options.find((option) => option.value === valueFromForm)?.label || placeholder;

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
            {selectedLabel}
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
                    value={`${opt.value} ${opt.label}`}
                    onSelect={(currentValue) => {
                      const selectedOption = options.find(option => `${option.value} ${option.label}` === currentValue);
                      if (selectedOption) {
                        field.handleChange(selectedOption.value);
                      }
                      setOpen(false);
                    }}
                  >
                    {opt.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        valueFromForm === opt.value ? "opacity-100" : "opacity-0"
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
