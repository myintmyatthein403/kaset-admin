import { FileUploader } from "@/components/custom/input/file-uploader";
import { InputField, SwitchField } from "@/components/custom/input/input-field"
import { useForm } from "@tanstack/react-form"

interface CreateHomePageSlideShowFormProps {
  form: ReturnType<typeof useForm>;
}

export const HomePageSlideShowForm = ({ form }: CreateHomePageSlideShowFormProps) => {
  return (
    <div className="flex flex-col gap-6 mb-4">
      <form.Field name="title">
        {(field) => (
          <InputField title="Title" field={field} required />
        )}
      </form.Field>

      <form.Field name="sub_title">
        {(field) => (
          <InputField title="Sub Title" field={field} />
        )}
      </form.Field>

      <form.Field name="button_text">
        {(field) => (
          <InputField title="Button Text" field={field} />
        )}
      </form.Field>

      <form.Field name="url">
        {(field) => (
          <InputField title="URL" field={field} />
        )}
      </form.Field>

      <form.Field name="is_active">
        {(field) => (
          <SwitchField title="Show In Slide" field={field} />
        )}
      </form.Field>


      <form.Field name="slideShowImage">
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
  );
};
