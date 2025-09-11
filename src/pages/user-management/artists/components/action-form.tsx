import type { ArtistSchemaType } from "@/common/schemas/artist.schema"
import { generateSlug } from "@/common/utils/slug.util"
import { FileUploader } from "@/components/custom/input/file-uploader"
import { DescriptionField, InputField, SlugField } from "@/components/custom/input/input-field"
import { SocialMediaLink } from "@/components/custom/input/social-media-link"
import { VideoUploader } from "@/components/custom/input/video-uploader"
import { Button } from "@/components/ui/button"
import { useForm } from "@tanstack/react-form"
import { useState } from "react"

interface ArtistFormProps {
  form: ReturnType<typeof useForm>
}
type FormValues = {
  name: string;
  pairs: { id: string; dropdownValue: string; textValue: string }[];
};
export const ArtistForm = ({
  form
}: ArtistFormProps) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleGenerateSlug = async () => {
    setIsSpinning(true);

    const formVal = form.state.values as ArtistSchemaType;

    const newSlug = generateSlug(formVal.name);

    await new Promise(resolve => setTimeout(resolve, 500));

    form.setFieldValue('slug', newSlug);
    setIsSpinning(false);
  };
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex gap-2">
        <form.Field name="name">
          {(field) => (
            <InputField title="Name" field={field} required className="w-full" />
          )}
        </form.Field>
        <form.Field name="slug">
          {(field) => (
            <SlugField title="slug" field={field} isSpinning={isSpinning} handleGenerateSlug={handleGenerateSlug} className="w-full" />
          )}
        </form.Field>
      </div>
      <form.Field name="bio">
        {(field) => (
          <DescriptionField title="Bio" field={field} required />
        )}
      </form.Field>
      <div className="flex gap-2">
        <form.Field name="location">
          {(field) => (
            <InputField title="Location" field={field} className="w-full" />
          )}
        </form.Field>
        <form.Field name="email">
          {(field) => (
            <InputField title="Email" field={field} type="mail" className="w-full" />
          )}
        </form.Field>
      </div>
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
      <form.Field name="profile_image">
        {(field: any) => (
          <FileUploader
            fieldName={field.name}
            title="Profile Image"
            file={field.state.value}
            setFile={field.handleChange}
          />
        )}
      </form.Field>
      <form.Field name="feature_videos">
        {(field: any) => (
          <VideoUploader
            fieldName={field.name}
            title="Feature Videos"
            files={field.state.value}
            setFiles={field.handleChange}
            isMultiSelect
          />
        )}
      </form.Field>
      <form.Field name="pairs">
        {(field) => {
          const val = field.state.value as FormValues[];
          return (
            <div>
              {
                val.map((pair: any, index: number) => (
                  <div key={pair.id} className="flex space-x-2 my-2">
                    <SocialMediaLink pair={pair} index={index} field={field} form={form} />
                  </div>
                ))
              }
            </div>
          )
        }}
      </form.Field>
      <Button
        type="button"
        onClick={() => {
          form.push('pairs', { id: nanoid(), dropdownValue: '', textValue: '' });
        }}
      >
        Add Pair
      </Button>
      Add Pair
    </Button>
    </div >
  )
}
