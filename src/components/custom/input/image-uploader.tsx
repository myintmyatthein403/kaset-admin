import { useState, type DragEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label'

interface Props {
  file: File | null,
  setFile: (value: File | null) => void
  title: string;
  required?: boolean;
}

export const ImageUploader = ({
  file,
  setFile,
  title,
  required = false,
}: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed!');
      return;
    }
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      alert('Uploaded successfully!');
      console.log(result);
    } catch (err) {
      alert('Upload failed');
      console.error(err);
    }
  };

  return (
    <>
      <Label>
        {title} {required && <span className="text-red-500">*</span>}
      </Label>
      <Card className="max-w-full mx-auto p-6 space-y-4 shadow-xl">
        <CardContent className="space-y-4">
          <label
            htmlFor="file-upload"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={cn(
              'flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all',
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
            )}
          >
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-contain rounded-md shadow"
              />
            ) : (
              <>
                <p className="text-sm text-gray-500">Drag and drop an image here or click to select</p>
                <p className="text-xs text-gray-400">(Only image files are allowed)</p>
              </>
            )}
          </label>
          { /* <Button
          className="w-full"
          onClick={handleUpload}
          disabled={!file}
        >
          Upload Image
        </Button> */}
        </CardContent>
      </Card>
    </>
  );
}
