import { DescriptionField, InputField, SlugField } from "@/components/custom/input/input-field"

export const TrackInfo = ({ form }: { form: any }) => {
  // const [isSpinning, setIsSpinning] = useState<boolean>(false)

  /* const handleGenerateSlug = async () => {
    setIsSpinning(true);

    const title = form.state.values.title;

    const newSlug = generateSlug(title);

    await new Promise(resolve => setTimeout(resolve, 500));

    form.setFieldValue('slug', newSlug);
    setIsSpinning(false);
  }; */

  return (
    <div className="flex flex-col gap-4">
      <form.Field name="title">
        {
          (field: any) => (
            <InputField field={field} title="Title" placeholder="Enter track title" />
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

      {/*<form.Field name="slug">
        {
          (field: any) => (
            <SlugField field={field} title="Slug" handleGenerateSlug={handleGenerateSlug} isSpinning={isSpinning} />
          )
        }
      </form.Field> */}

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
            <InputField field={field} title="genre" placeholder="eg: Pop, Rock" />
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
