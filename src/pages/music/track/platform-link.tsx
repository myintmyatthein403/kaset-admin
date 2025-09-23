import { FileUploader } from "@/components/custom/input/file-uploader";
import { DescriptionField, SelectField } from "@/components/custom/input/input-field"
import { SocialMediaLink } from "@/components/custom/input/social-media-link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";

const lyricTypeOptions = [
  { label: "Image", value: "image" },
  { label: "Text", value: "text" }
]

export const PlatformLink = ({ form }: { form: any }) => {
  const [lyricType, setLyricType] = useState("text");
  const [chordType, setChordType] = useState("text");
  return (
    <div className="flex flex-col gap-3">
      <h4>Platform Links</h4>
      <form.Field name="pairs">
        {(field: any) => {
          const val = field.state.value as any[];
          return (
            <div>
              {
                val.map((pair: any, index: number) => (
                  <div key={pair.id} className="flex space-x-2 my-2">
                    <SocialMediaLink pair={pair} index={index} form={form} />
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
          const pairsField = form.getFieldValue('pairs');

          const updatedParis = Array.isArray(pairsField)
            ? [...pairsField, { id: nanoid(), dropdownValue: "", textValue: "" }]
            : [{ id: nanoid(), dropdownValue: "", textValue: "" }];
          form.setFieldValue('pairs', updatedParis);
        }}
      >
        <Plus /> Add Pair
      </Button>
      <Separator />
      <form.Field name="lyric_type"
        listeners={{
          onChange: ({ value }: { value: any }) => {
            setLyricType(value)
          }
        }}
      >
        {(field: any) => (
          <SelectField field={field} title="Lyric Type" required options={lyricTypeOptions} />
        )}
      </form.Field>
      {lyricType === "text" && (
        <form.Field name="lyric_text">
          {(field: any) => (
            <DescriptionField
              field={field}
              title="Lyric Text"
              required
              placeholder="Enter lyric text"
            />
          )}
        </form.Field>
      )}
      {lyricType === "image" && (
        <form.Field name="lyricImage">
          {(field: any) => (
            <FileUploader
              fieldName={field.name}
              title="Lyric Image"
              file={field.state.value}
              setFile={field.handleChange}
            />
          )}
        </form.Field>
      )}
      <Separator />
      <form.Field name="chord_type"
        listeners={{
          onChange: ({ value }: { value: any }) => {
            setChordType(value)
          }
        }}
      >
        {(field: any) => (
          <SelectField field={field} title="Chord Type" required options={lyricTypeOptions} />
        )}
      </form.Field>
      {chordType === "text" && (
        <form.Field name="chord_text">
          {(field: any) => (
            <DescriptionField
              field={field}
              title="Chord Text"
              required
              placeholder="Enter chord text"
            />
          )}
        </form.Field>
      )}
      {chordType === "image" && (
        <form.Field name="chordImage">
          {(field: any) => (
            <FileUploader
              fieldName={field.name}
              title="Chord Image"
              file={field.state.value}
              setFile={field.handleChange}
            />
          )}
        </form.Field>
      )}


    </div>
  )
}
