import { FileUploader } from "@/components/custom/input/file-uploader";
import { InputField } from "@/components/custom/input/input-field";
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { useForm } from "@tanstack/react-form"

export const SettingPage = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      logo_image: null,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    }
  })
  return (
    <div className="p-4">
      <Card className="w-full p-4">
        <CardTitle>Setting</CardTitle>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}>
            <form.Field name="name">
              {(field) => (
                <InputField field={field} title="Name" required />
              )}
            </form.Field>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}
