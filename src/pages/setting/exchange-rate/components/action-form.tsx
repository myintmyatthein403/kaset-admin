import { InputField } from "@/components/custom/input/input-field";
import { useForm } from "@tanstack/react-form";

interface ExchangeRateFormProps {
  form: ReturnType<typeof useForm>
}

export const EchangeRateForm = ({
  form
}: ExchangeRateFormProps) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="currency">
        {(field) => (
          <InputField title="Currency" field={field} required />
        )}
      </form.Field>
      <form.Field name="rate">
        {(field) => (
          <InputField title="Rate" field={field} />
        )}
      </form.Field>
    </div>
  )
}
