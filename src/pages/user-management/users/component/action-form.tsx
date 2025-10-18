import { ACCOUNT_STATUS } from "@/common/enums"
import type { ROLE } from "@/common/types/type";
import { DescriptionField, InputField, SelectField, SwitchField } from "@/components/custom/input/input-field"
import { useBaseHook } from "@/hooks/base.hook";
import { useForm } from "@tanstack/react-form"

interface UserFormProps {
  form: ReturnType<typeof useForm>
}

const statusOptions = Object.keys(ACCOUNT_STATUS).map((key: string) => ({
  label: key,
  value: ACCOUNT_STATUS[key as keyof typeof ACCOUNT_STATUS]
}));

export const UserForm = ({
  form
}: UserFormProps) => {
  const {
    data,
    isPending,
    error
  } = useBaseHook<ROLE>('roles', '/roles');

  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to fetch...</h1>

  const roleOptions = data?.data.map((role: ROLE) => ({
    label: role.name,
    value: role.id
  }));

  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="name">
        {(field) => (
          <InputField title="Name" field={field} required />
        )}
      </form.Field>
      <form.Field name="email">
        {(field) => (
          <InputField title="Email" field={field} required />
        )}
      </form.Field>
      <form.Field name="status">
        {(field) => (
          <SelectField options={statusOptions} title="Status" field={field} />
        )}
      </form.Field>
      <form.Field name="banned_reason">
        {(field) => (
          <DescriptionField field={field} title="Banned Reason" />
        )}
      </form.Field>
      <form.Field name="claimable">
        {(field) => (
          <SwitchField field={field} title="Claimable" />
        )}
      </form.Field>
      <form.Field name="role">
        {(field) => (
          <SelectField field={field} options={roleOptions} title="role" />
        )}
      </form.Field>
    </div>
  )
}
