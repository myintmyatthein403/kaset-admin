import { FileUploader } from "@/components/custom/input/file-uploader";
import { InputField } from "@/components/custom/input/input-field";

interface LogoFormProps {
  form: any
}

export const LogoForm = ({
  form
}: LogoFormProps) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit();
    }}>
      <form.Field name="image">
        {
          (field: any) => (
            <FileUploader
              fieldName={field.name}
              title="Cover Image"
              file={field.state.value}
              setFile={field.handleChange}
            />
          )
        }
      </form.Field>

      <form.Field name="name">
        {
          (field: any) => (
            <InputField title="Name" field={field} required />
          )
        }
      </form.Field>
    </form>
  )
}
