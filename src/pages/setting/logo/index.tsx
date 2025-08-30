import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/custom/input/input-field";
import { FileInput } from "@/components/custom/input/file-input";

export const LogoSettingPage = () => {
  const form = useForm({
    defaultValues: {
      image: null as File | null,
      name: "",
    },
    onSubmit: async ({ value }) => {
      console.log('Form values:', value);
      // Here you would handle the form submission, e.g., send data to an API
      // If `value.image` is not null, you can upload it.
      // If you are editing, you might need to handle a specific ID for the logo.
    }
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Logo</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Image Field */}
        <form.Field
          name="image"
          children={(field) => (
            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium">Logo Image</label>
              <FileInput
                id={field.name}
                onFileChange={(file) => field.handleChange(file)}
                previewUrl={field.state.value ? URL.createObjectURL(field.state.value) : null}
              />
              {/* Optional: Add a form error message */}
              {field.state.meta.errors ? (
                <div className="text-sm text-red-500 mt-1">{field.state.meta.errors.join(", ")}</div>
              ) : null}
            </div>
          )}
        />

        {/* Name Field */}
        <form.Field name="name">
          {
            (field) => (
              <InputField field={field} title="Name" required />
            )
          }
        </form.Field >

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
};
