import { InputField } from "@/src/common/components/custom/input/input-field"

export const PlatformLink = ({ form }: { form: any }) => {
  return (
    <div className="flex flex-col gap-3">
      <form.Field name="spotify_url">
        {
          (field: any) => (
            <InputField field={field} title="Spotify Url" placeholder="Enter spotify url link" />
          )
        }
      </form.Field>

      <form.Field name="apple_music_url">
        {
          (field: any) => (
            <InputField field={field} title="Apple Music Url" placeholder="Enter apple music url link" />
          )
        }
      </form.Field>

      <form.Field name="soundcloud_url">
        {
          (field: any) => (
            <InputField field={field} title="Soundcloud Url" placeholder="Enter soundcloud url link" />
          )
        }
      </form.Field>

      <form.Field name="youtube_url">
        {
          (field: any) => (
            <InputField field={field} title="Youtube Url" placeholder="Enter youtube url link" />
          )
        }
      </form.Field>
    </div>
  )
}
