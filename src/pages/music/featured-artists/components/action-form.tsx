import { Combobox } from "@/components/custom/input/combobox";
import { InputField } from "@/components/custom/input/input-field";
import { fetchData } from "@/lib/axios";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";

interface FeaturedArtistFormProps {
  form: ReturnType<typeof useForm>
}

export const FeaturedArtistForm = ({
  form
}: FeaturedArtistFormProps) => {
  const { data: artistData, isPending, error } = useQuery({
    queryKey: ['f-artists'],
    queryFn: () => fetchData('/artist')
  })

  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to fetch...</h1>

  const artists = artistData?.data;
  const artistOptions = artists.map((artist: any) => {
    return {
      label: artist.name,
      value: artist.userId
    }
  })
  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="artists">
        {(field) => (
          <Combobox field={field} options={artistOptions} title="Select Featured Artists" required isMultiSelect />
        )}
      </form.Field>
    </div>
  )
}
