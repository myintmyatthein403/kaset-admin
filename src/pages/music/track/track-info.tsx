import type { GENRE } from "@/common/types/type"
import { generateSlug } from "@/common/utils/slug.util"
import { Combobox } from "@/components/custom/input/combobox"
import { DescriptionField, InputField, SlugField } from "@/components/custom/input/input-field"
import { fetchData } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const TrackInfo = ({ form }: { form: any }) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false)

  const handleGenerateSlug = async () => {
    setIsSpinning(true);

    const title = form.state.values.title;

    const newSlug = generateSlug(title);

    await new Promise(resolve => setTimeout(resolve, 500));

    form.setFieldValue('slug', newSlug);
    setIsSpinning(false);
  };

  const { isPending: isPendingGenres, error: genreError, data: genreData } = useQuery({
    queryKey: ['genres'],
    queryFn: async () => await fetchData('/genres')
  })

  if (isPendingGenres) return <h1>Loading</h1>
  if (genreError) return <h1>Failed to fetch...</h1>

  const genres = genreData?.data?.data;
  const genreOptions = genres.map((genre: any) => {
    return {
      label: genre.name,
      value: genre.id
    }
  })
  console.log('genreOptions:', genreOptions)

  return (
    <div className="flex flex-col gap-4">
      <form.Field name="title">
        {
          (field: any) => (
            <InputField field={field} title="Title" placeholder="Enter track title" required />
          )
        }
      </form.Field>

      <form.Field name="description">
        {
          (field: any) => (
            <DescriptionField field={field} title="Description" placeholder="Enter track description" />
          )
        }
      </form.Field>

      <form.Field name="slug">
        {
          (field: any) => (
            <SlugField field={field} title="Slug" handleGenerateSlug={handleGenerateSlug} isSpinning={isSpinning} required />
          )
        }
      </form.Field>

      <form.Field name="duration">
        {
          (field: any) => (
            <InputField field={field} title="Duration" placeholder="eg: 03:34" />
          )
        }
      </form.Field>

      <form.Field name="genre">
        {
          (field: any) => (
            <Combobox field={field} options={genreOptions} title="Genre" required />
          )
        }
      </form.Field>

      <form.Field name="artist">
        {
          (field: any) => (
            <InputField field={field} title="artist" placeholder="Please add collaboration artists" />
          )
        }
      </form.Field>
    </div>
  )
}
