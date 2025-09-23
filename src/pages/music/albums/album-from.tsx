import { FileUploader } from "@/components/custom/input/file-uploader"
import { InputField, SlugField } from "@/components/custom/input/input-field"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { generateSlug } from "@/common/utils/slug.util"
import { useState } from "react"

interface AlbumFormProps {
  form?: any,
  open: boolean,
  onOpenChange: (val: boolean) => void
}

export const AlbumForm = ({
  form,
  open,
  onOpenChange
}: AlbumFormProps) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const handleGenerateSlug = async () => {
    setIsSpinning(true);

    const title = form.state.values.title;

    const newSlug = generateSlug(title);

    await new Promise(resolve => setTimeout(resolve, 500));

    form.setFieldValue('slug', newSlug);
    setIsSpinning(false);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <form onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}>
          <form.Field name="title">
            {
              (field: any) => (
                <InputField field={field} title="Title" />
              )
            }
          </form.Field>

          <form.Field name="description">
            {
              (field: any) => (
                <InputField field={field} title="Description" />
              )
            }
          </form.Field>

          <form.Field name="slug">
            {
              (field: any) => (
                <SlugField field={field} title="Slug" isSpinning={isSpinning} handleGenerateSlug={handleGenerateSlug} />
              )
            }
          </form.Field>

          <form.Field name="cover_image">
            {(field: any) => (
              <FileUploader
                fieldName={field.name}
                title="Cover Image"
                file={field.state.value}
                setFile={field.handleChange}
              />
            )}
          </form.Field>

          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
