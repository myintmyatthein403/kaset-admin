import { InputField, SwitchField } from "@/components/custom/input/input-field";
import { Button } from "@/components/ui/button";

interface VariantProps {
  id: string;
  sku: string;
  price: string;
  size: string;
  stock: number;
  color_name: string;
  color_code: string;
  is_out_of_stock: boolean;
};

interface FieldComponentProps {
  form: any;
  variant: VariantProps;
  index: number;
}

export const VariantForm = ({
  form,
  variant,
  index,
}: FieldComponentProps) => {
  return (
    <div key={variant.id} className="flex flex-col space-y-6 my-2 w-full border p-4 rounded-lg">
      <div className="flex space-x-2 justify-between">
        <form.Field
          name={`variants[${index}].sku`}
          children={(field: any) => (
            <InputField
              title="Sku of variant"
              field={field}
              className="w-full"
            />
          )}
        />

        <form.Field
          name={`variants[${index}].price`}
          children={(field: any) => (
            <InputField
              title="Price of variant"
              field={field}
              className="w-full"
            />
          )}
        />
      </div>
      <div className="flex space-x-2 justify-between">
        <form.Field
          name={`variants[${index}].size`}
          children={(field: any) => (
            <InputField
              title="Size of variant"
              field={field}
              className="w-full"
            />
          )}
        />

        <form.Field
          name={`variants[${index}].color_name`}
          children={(field: any) => (
            <InputField
              title="Color name of variant"
              field={field}
              className="w-full"
            />
          )}
        />
      </div>

      <div className="flex space-x-2 justify-between">
        <form.Field
          name={`variants[${index}].color_code`}
          children={(field: any) => (
            <InputField
              title="Color code of variant"
              field={field}
              className="w-full"
            />
          )}
        />

        <form.Field
          name={`variants[${index}].stock`}
          children={(field: any) => (
            <InputField
              title="Stock (quantity)"
              field={field}
              className="w-full"
            />
          )}
        />
      </div>
      <Button
        type="button"
        variant="destructive"
        onClick={() => {
          const variantsField = form.getFieldValue('variants');
          const updatedArray = variantsField.filter((_: any, i: number) => i !== index);
          form.setFieldValue('variants', updatedArray);
        }}
      >
        Remove
      </Button>
    </div>
  );
};

