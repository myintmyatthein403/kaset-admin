import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useBaseHook } from "@/hooks/base.hook";

type SocialMediaPair = {
  id: string;
  dropdownValue: string;
  textValue: string;
};

interface FieldComponentProps {
  form: any;
  pair: SocialMediaPair;
  index: number;
}

export const SocialMediaLink = ({
  form,
  pair,
  index,
}: FieldComponentProps) => {
  const {
    data,
    isPending,
    error
  } = useBaseHook('platforms', '/platforms');

  if (isPending) return <h1>Loading...</h1>
  if (error) return < h1 > Failed to fetch...</h1 >

  const selectedValues = form.getFieldValue('pairs').map((p: any) => p.dropdownValue);

  const availablePlatforms = data?.data?.filter((platform: any) =>
    !selectedValues.includes(platform.id) || platform.id === pair.dropdownValue // Keep the currently selected value
  );

  return (
    <div key={pair.id} className="flex space-x-2 my-2">
      <form.Field
        name={`pairs[${index}].dropdownValue`}
        children={(field: any) => (
          <Select onValueChange={field.handleChange} value={field.state.value}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              {
                availablePlatforms.map((platform: any) => (
                  <SelectItem key={platform.id} value={platform.id}>{platform.name}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        )}
      />

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

      <Button
        type="button"
        onClick={() => {
          const pairsField = form.getFieldValue('pairs');

          const updatedArray = pairsField.filter((_: any, i: number) => i !== index);
          form.setFieldValue('pairs', updatedArray);
        }}
      >
        Remove
      </Button>
    </div>
  );
};
