
import { InputField } from "@/components/custom/input/input-field"
import { useForm } from "@tanstack/react-form"

interface RoleFormProps {
  form: ReturnType<typeof useForm>
}

export const RoleForm = ({
  form
}: RoleFormProps) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="name">
        {(field) => (
          <InputField title="Name" field={field} required />
        )}
      </form.Field>
    </div>
  )
}
