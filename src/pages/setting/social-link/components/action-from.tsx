import { InputField } from "@/components/custom/input/input-field"
import { useForm } from "@tanstack/react-form"

interface SocialLinkFormProps {
  form: ReturnType<typeof useForm>
}

export const SocialLinkForm = ({
  form
}: SocialLinkFormProps) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="facebook_url">
        {(field) => (
          <InputField title="Facebook Url" field={field} required />
        )}
      </form.Field>
      <form.Field name="twitter_url">
        {(field) => (
          <InputField title="Twitter Url" field={field} required />
        )}
      </form.Field>
      <form.Field name="instagram_url">
        {(field) => (
          <InputField title="Instagram Url" field={field} required />
        )}
      </form.Field>
      <form.Field name="linkedin_url">
        {(field) => (
          <InputField title="LinkedIn Url" field={field} required />
        )}
      </form.Field>
      ```<form.Field name="youtube_url">
        {(field) => (
          <InputField title="Youtube Url" field={field} required />
        )}
      </form.Field>
    </div>
  )
}
