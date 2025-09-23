import { InputField, SwitchField } from "@/components/custom/input/input-field";
import { useForm } from "@tanstack/react-form";

interface ApiTokenFormProps {
  form: ReturnType<typeof useForm>
}

export const ApiTokenForm = ({
  form
}: ApiTokenFormProps) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="client_name">
        {(field) => (
          <InputField title="Client Name" field={field} />
        )}
      </form.Field>
      <form.Field name="is_active">
        {(field) => (
          <SwitchField field={field} title="Active" />
        )}
      </form.Field>
    </div>
  )
}
