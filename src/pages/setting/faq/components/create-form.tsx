import { RichTextEditor } from "@/components/custom/editor/rich-text-editor";
import { DescriptionField, InputField } from "@/components/custom/input/input-field"
import { useForm } from "@tanstack/react-form"

interface CreateFAQFormProps {
  form: ReturnType<typeof useForm>;
}

export const FAQForm = ({ form }: CreateFAQFormProps) => {

  return (
    <div className="flex flex-col gap-4 mb-4">
      <form.Field name="question">
        {(field) => (
          <InputField title="Question" field={field} required />
        )}
      </form.Field>
      <form.Field name="answer">
        {(field) => (
          <DescriptionField title="Answer" field={field} required />
        )}
      </form.Field>
    </div>
  );
};
