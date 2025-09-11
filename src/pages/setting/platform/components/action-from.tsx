import { FileUploader } from "@/components/custom/input/file-uploader"
import { InputField } from "@/components/custom/input/input-field"
import { useForm } from "@tanstack/react-form"

interface PlatformFormProps {
  form: ReturnType<typeof useForm>
}

export const PlatformForm = ({
  form
}: PlatformFormProps) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="name">
        {(field) => (
          <InputField title="Name" field={field} required />
        )}
      </form.Field>
      <form.Field name="icon">
        {(field: any) => (
          <FileUploader
            fieldName={field.name}
            title="Image"
            file={field.state.value}
            setFile={field.handleChange}
          />
        )}
      </form.Field>

    </div>
  )
}
