import type { ArtistSchemaType } from "@/common/schemas/artist.schema";
import { generateSlug } from "@/common/utils/slug.util";
import { Combobox } from "@/components/custom/input/combobox";
import { FileUploader } from "@/components/custom/input/file-uploader";
import { DescriptionField, InputField, SlugField } from "@/components/custom/input/input-field";
import { fetchData } from "@/lib/axios";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface AlbumFormProps {
  form: ReturnType<typeof useForm>
}

export const AlbumForm = ({ form }: AlbumFormProps) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleGenerateSlug = async () => {
    setIsSpinning(true);
    const formVal = form.state.values as ArtistSchemaType;
    const newSlug = generateSlug(formVal.name);
    await new Promise(resolve => setTimeout(resolve, 500));
    form.setFieldValue('slug', newSlug);
    setIsSpinning(false);
  };

  const { data: trackData, isPending, error } = useQuery({
    queryKey: ['tracks'],
    queryFn: () => fetchData('/track')
  });

  const { data: artistData, isPending: isArtistPending, error: artistError } = useQuery({
    queryKey: ['artists'],
    queryFn: () => fetchData('/users')
  });

  if (isPending || isArtistPending) return <h1>Loading...</h1>;
  if (error || artistError) return <h1>Failed to Fetch...</h1>;

  const tracks = trackData?.data.data;
  const trackOptions = tracks.map((track: any) => ({
    label: track.name,
    value: track.id
  }));

  const artists = artistData?.data.data;
  const artistOptions = artists.filter((a: any) => a?.role?.name === "Artist").map((artist: any) => ({
    label: artist.name,
    value: artist.id,
  }));

  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="name">
        {(field) => (
          <InputField title="Name" field={field} required />
        )}
      </form.Field>
      <form.Field name="description">
        {(field) => (
          <DescriptionField title="Description" field={field} />
        )}
      </form.Field>
      <form.Field name="slug">
        {(field) => (
          <SlugField title="Slug" field={field} required handleGenerateSlug={handleGenerateSlug} isSpinning={isSpinning} />
        )}
      </form.Field>
      <form.Field name="released_date">
        {
          (field: any) => (
            <InputField field={field} title="Release Date" placeholder="YYYY-MM-DD" />
          )
        }
      </form.Field>
      <form.Field name="albumCoverImage">
        {(field: any) => (
          <FileUploader
            fieldName={field.name}
            title="Album Cover"
            file={field.state.value}
            setFile={field.handleChange}
          />
        )}
      </form.Field>
      <form.Field name="tracks">
        {(field) => (
          <Combobox options={trackOptions} title="Tracks" field={field} isMultiSelect required />
        )}
      </form.Field>
      <form.Field name="artists">
        {(field) => (
          <Combobox options={artistOptions} title="Artists" field={field} isMultiSelect required />
        )}
      </form.Field>
    </div>
  );
};
