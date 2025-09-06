import type { PRODUCT_CATEGORY } from "@/common/types/type";
import { generateSlug } from "@/common/utils/slug.util";
import { InputField, SlugField } from "@/components/custom/input/input-field";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

interface ProductCategoryFormProps {
  form: ReturnType<typeof useForm>
}

export const ProductCategoryForm = ({
  form
}: ProductCategoryFormProps) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false)

  const handleGenerateSlug = async () => {
    setIsSpinning(true);

    const val = form.state.values as PRODUCT_CATEGORY;

    const newSlug = generateSlug(val.name);

    await new Promise(resolve => setTimeout(resolve, 500));

    form.setFieldValue('slug', newSlug);
    setIsSpinning(false);
  };

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
    </div>
  )
}
