import { Combobox } from "@/components/custom/input/combobox";
import { InputField } from "@/components/custom/input/input-field";
import { fetchData } from "@/lib/axios";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";

interface FeaturedProductFormProps {
  form: ReturnType<typeof useForm>
}

export const FeaturedProductForm = ({
  form
}: FeaturedProductFormProps) => {
  const { data: productData, isPending, error } = useQuery({
    queryKey: ['f-products'],
    queryFn: () => fetchData('/products')
  })

  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to fetch...</h1>

  const products = productData?.data.data;
  const productOptions = products.map((product: any) => {
    return {
      label: product.name,
      value: product.id
    }
  })
  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="products">
        {(field) => (
          <Combobox field={field} options={productOptions} title="Select Featured products" required isMultiSelect />
        )}
      </form.Field>
    </div>
  )
}
