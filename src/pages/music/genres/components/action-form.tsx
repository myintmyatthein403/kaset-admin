import { InputField } from "@/components/custom/input/input-field";
import { useForm } from "@tanstack/react-form";

interface GenreFormProps {
  form: ReturnType<typeof useForm>
}

export const GenreForm = ({
  form
}: GenreFormProps) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="name">
        {(field) => (
          <InputField title="Name" field={field} required />
        )}
      </form.Field>
      <form.Field name="description">
        {(field) => (
          <InputField title="Description" field={field} />
        )}
      </form.Field>
    </div>
  )
}
