import { Combobox } from "@/components/custom/input/combobox";
import { InputField } from "@/components/custom/input/input-field";
import { fetchData } from "@/lib/axios";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";

interface PopularTrackFormProps {
  form: ReturnType<typeof useForm>
}

export const PopularTrackForm = ({
  form
}: PopularTrackFormProps) => {
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
      <form.Field name="tracks">
        {(field) => (
          <Combobox field={field} options={trackOptions} title="Select Popular Track" required isMultiSelect />
        )}
      </form.Field>
    </div>
  )
}
