import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FieldApi, FormApi } from "@tanstack/react-form";

// Define a type for the dynamic pair
type SocialMediaPair = {
  id: string;
  dropdownValue: string;
  textValue: string;
};

interface FieldComponentProps {
  // FieldApi provides the correct type for the field prop
  field: any;
  form: any;
  pair: SocialMediaPair;
  index: number;
}

export const SocialMediaLink = ({
  field,
  form,
  pair,
  index,
}: FieldComponentProps) => {
  return (
    <div key={pair.id} className="flex space-x-2 my-2">
      {/* Social Media Platform Dropdown */}
      <form.Field
        name={`pairs[${index}].dropdownValue`}
        children={(field: any) => (
          <Select onValueChange={field.handleChange} value={field.state.value}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      {/* Social Media Link Text Field */}
      <form.Field
        name={`pairs[${index}].textValue`}
        children={(field: any) => (
          <Input
            type="text"
            placeholder="Enter link or username"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      />

      {/* Remove Button */}
      <Button
        type="button"
        onClick={() => field.remove(index)}
      >
        Remove
      </Button>
    </div>
  );
};
