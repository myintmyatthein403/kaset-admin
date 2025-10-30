import { CreditValue } from '@/components/custom/input/credit-values';
import { FileUploader } from '@/components/custom/input/file-uploader';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { nanoid } from 'nanoid';

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

      <h4>Credits</h4>
      <form.Field name="credit_pairs">
        {(field: any) => {
          const val = field.state.value as any[];
          console.log(val, '....')
          return (
            <div>
              {
                val.map((credit_pair: any, index: number) => (
                  <div key={credit_pair.id} className="flex space-x-2 my-2">
                    <CreditValue credit_pair={credit_pair} index={index} form={form} />
                  </div>
                ))
              }
            </div>
          )
        }}
      </form.Field>
      <Button
        type="button"
        onClick={() => {
          const pairsField = form.getFieldValue('credit_pairs');

          const updatedParis = Array.isArray(pairsField)
            ? [...pairsField, { id: nanoid(), dropdownValue: "", textValue: "" }]
            : [{ id: nanoid(), dropdownValue: "", textValue: "" }];
          form.setFieldValue('credit_pairs', updatedParis);
        }}
      >
        <Plus /> Add Pair
      </Button>


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
