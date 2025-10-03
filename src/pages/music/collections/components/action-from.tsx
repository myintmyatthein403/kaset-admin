import type { CollectionSchemaType } from "@/common/schemas/collection.schema";
import { generateSlug } from "@/common/utils/slug.util";
import { Combobox } from "@/components/custom/input/combobox";
import { FileUploader } from "@/components/custom/input/file-uploader";
import { InputField, SlugField } from "@/components/custom/input/input-field";
import { fetchData } from "@/lib/axios";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface CollectionFormProps {
  form: ReturnType<typeof useForm>
}

export const CollectionForm = ({
  form
}: CollectionFormProps) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleGenerateSlug = async () => {
    setIsSpinning(true);
    const formVal = form.state.values as CollectionSchemaType;
    const newSlug = generateSlug(formVal.title);
    await new Promise(resolve => setTimeout(resolve, 500));
    form.setFieldValue('slug', newSlug);
    setIsSpinning(false);
  };
  const { data: trackData, isPending, error } = useQuery({
    queryKey: ['p-tracks'],
    queryFn: () => fetchData('/track')
  })

  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to fetch...</h1>

  const tracks = trackData?.data?.data;
  const trackOptions = tracks.map((track: any) => {
    return {
      label: track.name,
      value: track.id
    }
  })
  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="title">
        {(field) => (
          <InputField title="Title" field={field} required />
        )}
      </form.Field>
      <form.Field name="slug">
        {(field) => (
          <SlugField title="Slug" field={field} required handleGenerateSlug={handleGenerateSlug} isSpinning={isSpinning} />
        )}
      </form.Field>
      <form.Field name="backgroundImage">
        {(field: any) => (
          <FileUploader
            fieldName={field.name}
            title="Background Image"
            file={field.state.value}
            setFile={field.handleChange}
          />
        )}
      </form.Field>
      <form.Field name="tracks">
        {(field) => (
          <Combobox field={field} options={trackOptions} title="Select Popular Track" required isMultiSelect />
        )}
      </form.Field>

    </div>
  )
}

