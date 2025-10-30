import { FileUploader } from '@/components/custom/input/file-uploader';

interface TrackImageFormProps {
  form: any;
}

export const TrackImageForm = ({ form }: TrackImageFormProps) => {
  return (
    <div className="grid gap-4 py-4">
      {/* Track Image Field (Single Select) */}
      <form.Field name="trackImage">
        {(field: any) => (
          <FileUploader
            fieldName={field.name}
            title="Track Image"
            file={field.state.value}
            setFile={field.handleChange}
          />
        )}
      </form.Field>

      {/* Track Cover Image Field (Single Select) 
      <form.Field name="trackCoverImage">
        {(field: any) => (
          <FileUploader
            fieldName={field.name}
            title="Cover Image"
            file={field.state.value}
            setFile={field.handleChange}
          />
        )}
      </form.Field> */}

      {/* BTS Images Field (Multi-Select) 
      <form.Field name="btsImages">
        {(field: any) => (
          <FileUploader
            fieldName={field.name}
            title="BTS Images"
            isMultiSelect
            files={field.state.value || []}
            setFiles={field.handleChange}
          />
        )}
      </form.Field>

      {/* Storyboards Field (Multi-Select) 
      <form.Field name="storyboards">
        {(field: any) => (
          <FileUploader
            fieldName={field.name}
            title="Storyboards"
            isMultiSelect
            files={field.state.value || []}
            setFiles={field.handleChange}
          />
        )}
      </form.Field>*/}
    </div>
  );
};
