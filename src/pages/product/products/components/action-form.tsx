import type { PRODUCT } from "@/common/types/type";
import { generateSlug } from "@/common/utils/slug.util";
import { Combobox } from "@/components/custom/input/combobox";
import { FileUploader } from "@/components/custom/input/file-uploader";
import { DescriptionField, InputField, SlugField } from "@/components/custom/input/input-field";
import { Button } from "@/components/ui/button";
import { useBaseHook } from "@/hooks/base.hook";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { nanoid } from 'nanoid';
import { VariantForm } from "./variant-form";
import { Plus } from "lucide-react";


interface ProductFormProps {
  form: ReturnType<typeof useForm>
}

type FormValues = {
  name: string;
  slug: string;
  about: string;
  base_price: number;
  is_out_of_stock: boolean;
  product_image: File | null;
  product_category: string;
  variants: {
    id: string;
    sku: string;
    price: number;
    stock: number;
    color_code: string;
    color_name: string;
    size: string;
    is_out_of_stock: string;
  }[];
}

export const ProductForm = ({
  form
}: ProductFormProps) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false)

  const handleGenerateSlug = async () => {
    setIsSpinning(true);

    const val = form.state.values as PRODUCT;

    const newSlug = generateSlug(val.name);

    await new Promise(resolve => setTimeout(resolve, 500));

    form.setFieldValue('slug', newSlug);
    setIsSpinning(false);
  };

  const { data, isPending, error } = useBaseHook('product-categories', 'product-category');

  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to Fetch...</h1>

  const productCategories = data?.data.map((d: PRODUCT) => ({
    value: d.id,
    label: d.name
  }));


  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="name">
        {(field) => (
          <InputField title="Name" field={field} required />
        )}
      </form.Field>
      <form.Field name="description">
        {(field) => (
          <DescriptionField title="Description" field={field} />
        )}
      </form.Field>
      <form.Field name="slug">
        {(field) => (
          <SlugField title="Slug" field={field} required isSpinning={isSpinning} handleGenerateSlug={handleGenerateSlug} />
        )}
      </form.Field>
      <form.Field name="about">
        {(field) => (
          <DescriptionField title="About" field={field} />
        )}
      </form.Field>
      <div className="flex justify-between items-center">
        <form.Field name="base_price">
          {(field) => (
            <InputField title="Price" field={field} required />
          )}
        </form.Field>
      </div>
      <form.Field name="productImages">
        {(field) => (
          <FileUploader
            fieldName={field.name}
            title="Product Images"
            files={field.state.value as File[] || []}
            setFiles={field.handleChange}
            isMultiSelect
          />

        )}
      </form.Field>
      <form.Field name="product_category">
        {(field) => (
          <Combobox field={field} title="Select Category" required options={productCategories} />
        )}
      </form.Field>
      <form.Field name="variants">
        {(field) => {
          const val = field.state.value as FormValues[];
          console.log(val)
          return (
            <div>
              {
                val?.map((variant: any, index: number) => (
                  <div key={variant.id} className="flex space-x-2 my-2">
                    <VariantForm variant={variant} index={index} form={form} />
                  </div>
                ))
              }
            </div>
          )
        }}
      </form.Field>
      <Button
        type="button"
        onClick={() => {
          const variantsField = form.getFieldValue('variants');

          const updatedVariants = Array.isArray(variantsField)
            ? [...variantsField, { id: nanoid(), sku: "", size: "", color_name: "", color_code: "", price: 0, is_out_of_stock: false }]
            : [];
          form.setFieldValue('variants', updatedVariants);
        }}
      >
        <Plus />Add Variant
      </Button>
    </div>
  )
}
