import { generateSlug } from "@/common/utils/slug.util"
import { Combobox } from "@/components/custom/input/combobox"
import { DescriptionField, InputField, SlugField } from "@/components/custom/input/input-field"
import { useBaseHook } from "@/hooks/base.hook"
import { fetchData } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const TrackInfo = ({ form }: { form: any }) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false)
  const {
    data: artistData,
    isPending: isPendingArtist,
    error: artistError
  } = useBaseHook('aritsts', '/users')

  const handleGenerateSlug = async () => {
    setIsSpinning(true);

    const name = form.state.values.name;

    const newSlug = generateSlug(name);

    await new Promise(resolve => setTimeout(resolve, 500));

    form.setFieldValue('slug', newSlug);
    setIsSpinning(false);
  };

  const { isPending: isPendingGenres, error: genreError, data: genreData } = useQuery({
    queryKey: ['genres'],
    queryFn: async () => await fetchData('/genres')
  })

  if (isPendingGenres || isPendingArtist) return <h1>Loading</h1>
  if (genreError || artistError) return <h1>Failed to fetch...</h1>

  const genres = genreData?.data?.data;
  const genreOptions = genres.map((genre: any) => {
    return {
      label: genre.name,
      value: genre.id
    }
  })
  const filteredUsers = artistData?.data.filter((artist: any) => artist?.role?.name == "Artist")

  const artists = filteredUsers.map((user: any) => {
    return {
      label: user.name,
      value: user.id
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <form.Field name="name">
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

      <form.Field name="credit">
        {
          (field: any) => (
            <DescriptionField field={field} title="Credit" placeholder="Enter credit" />
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
      <form.Field name="released_date">
        {
          (field: any) => (
            <InputField field={field} title="Release Date" placeholder="YYYY-MM-DD" />
          )
        }
      </form.Field>

      <form.Field name="genres">
        {
          (field: any) => (
            <Combobox field={field} options={genreOptions} title="Genre" required isMultiSelect />
          )
        }
      </form.Field>

      <form.Field name="artists">
        {
          (field: any) => (
            <Combobox field={field} options={artists} title="Artists" required isMultiSelect />
          )
        }
      </form.Field>
    </div>
  )
}
