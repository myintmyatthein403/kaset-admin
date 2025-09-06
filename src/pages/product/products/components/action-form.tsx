import type { PRODUCT } from "@/common/types/type";
import { generateSlug } from "@/common/utils/slug.util";
import { RichTextEditor } from "@/components/custom/editor/rich-text-editor";
import { Combobox } from "@/components/custom/input/combobox";
import { FileUploader } from "@/components/custom/input/file-uploader";
import { DescriptionField, InputField, SlugField, SwitchField } from "@/components/custom/input/input-field";
import { useBaseHook } from "@/hooks/base.hook";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

interface ProductFormProps {
  form: ReturnType<typeof useForm>
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
        <form.Field name="is_out_of_stock">
          {(field) => (
            <SwitchField field={field} title="Out of Stock" />
          )}
        </form.Field>
      </div>
      <form.Field name="product_image">
        {(field) => (
          <FileUploader
            fieldName={field.name}
            title="Track Image"
            file={field.state.value as File}
            setFile={field.handleChange}
          />

        )}
      </form.Field>
      <form.Field name="product_category">
        {(field) => (
          <Combobox field={field} title="Select Category" required options={productCategories} />
        )}
      </form.Field>
      <RichTextEditor />
    </div>
  )
}
