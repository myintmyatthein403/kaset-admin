import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useBaseHook } from "@/hooks/base.hook";

type CreditPair = {
  id: string;
  dropdownValue: string;
  textValue: string;
};

interface FieldComponentProps {
  form: any;
  credit_pair: CreditPair;
  index: number;
}

export const CreditValue = ({
  form,
  credit_pair,
  index,
}: FieldComponentProps) => {
  const {
    data,
    isPending,
    error
  } = useBaseHook('credit-keys', '/credit-keys');

  if (isPending) return <h1>Loading...</h1>
  if (error) return < h1 > Failed to fetch...</h1 >

  const selectedValues = form.getFieldValue('credit_pairs').map((p: any) => p.dropdownValue);

  const availablePlatforms = data?.data?.filter((platform: any) =>
    !selectedValues.includes(platform.id) || platform.id === credit_pair.dropdownValue // Keep the currently selected value
  );

  return (
    <div key={credit_pair.id} className="flex space-x-2 my-2">
      <form.Field
        name={`credit_pairs[${index}].dropdownValue`}
        children={(field: any) => (
          <Select onValueChange={field.handleChange} value={field.state.value}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select credit-keys" />
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
        name={`credit_pairs[${index}].textValue`}
        children={(field: any) => (
          <Input
            type="text"
            placeholder="Enter value"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      />

      <Button
        type="button"
        onClick={() => {
          const pairsField = form.getFieldValue('credit_pairs');

          const updatedArray = pairsField.filter((_: any, i: number) => i !== index);
          form.setFieldValue('credit_pairs', updatedArray);
        }}
      >
        Remove
      </Button>
    </div>
  );
};
