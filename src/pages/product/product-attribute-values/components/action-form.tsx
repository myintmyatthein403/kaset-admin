import { Combobox } from "@/components/custom/input/combobox";
import { InputField } from "@/components/custom/input/input-field";
import { fetchData } from "@/lib/axios";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";

interface ProductAttributeValueFormProps {
  form: ReturnType<typeof useForm>
}

export const ProductAttributeValueForm = ({
  form
}: ProductAttributeValueFormProps) => {
  const { data: productAttributeData, isPending, error } = useQuery({
    queryKey: ['s-product-attributes'],
    queryFn: () => fetchData('/product-attribute')
  })
  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to fetch...</h1>
  const productAttributes = productAttributeData?.data?.data;
  console.log('pa', productAttributes)
  const productAttributeOptions = productAttributes.map((pa: any) => (
    {
      label: pa.name,
      value: pa.id
    }
  ))
  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="product_attribute">
        {(field) => (
          <Combobox field={field} title="Product Attribute" required options={productAttributeOptions} />
        )}
      </form.Field>
      <form.Field name="attribute">
        {(field) => (
          <InputField title="Attribute" placeholder="eg: M, XL, Red" field={field} required />
        )}
      </form.Field>
      <form.Field name="value">
        {(field) => (
          <InputField title="Value" placeholder="eg: #ff0000" field={field} />
        )}
      </form.Field>
    </div>
  )
}
