import { useState, type DragEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface Props {
  fieldName: string;
  title: string;
  isMultiSelect?: boolean;
  file?: File | null; // Make file prop optional
  files?: File[]; // Make files prop optional
  setFile?: (value: File | null) => void;
  setFiles?: (value: File[]) => void;
  required?: boolean;
}

export const FileUploader = ({
  fieldName,
  title,
  isMultiSelect = false,
  file,
  files,
  setFile,
  setFiles,
  required = false,
}: Props) => {
  const [previews, setPreviews] = useState<string[]>(isMultiSelect && files ? files.map(f => URL.createObjectURL(f)) : file ? [URL.createObjectURL(file)] : []);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (selectedFiles: FileList) => {
    const fileArray = Array.from(selectedFiles);

    // Check file type
    const areAllImages = fileArray.every(file => file.type.startsWith('image/'));
    if (!areAllImages) {
      alert('Only image files are allowed!');
      return;
    }

    const newPreviews = fileArray.map(f => URL.createObjectURL(f));
    setPreviews(newPreviews);

    if (isMultiSelect && setFiles) {
      setFiles(fileArray);
    } else if (setFile) {
      setFile(fileArray[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFile(e.target.files);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFile(e.dataTransfer.files);
    }
  };

  const showText = () => {
    const originalRequestedSize = "~ 2MB"
    switch (fieldName.toLowerCase()) {
      case 'productimages':
      case 'trackcoverimage':
      case 'trackimage':
      case 'profileimage':
      case 'albumcoverimage':
        return `(Recommended: 1:1 ratio, Max File Size: ${originalRequestedSize})`;
      case 'coverimage':
        return `(Recommended: 16:9 ratio, Max File Size: ${originalRequestedSize})`;
      default:
        return `(Max File Size: ${originalRequestedSize})`;
    }
  }
  return (
    <>
      <Label htmlFor={fieldName}>
        {title} {required && <span className="text-red-500">*</span>}
      </Label>
      <Card className="max-w-full p-6 space-y-4 shadow-xl">
        <CardContent className="space-y-4">
          <label
            htmlFor={fieldName}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={cn(
              'flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all',
              'min-h-[150px] w-full',
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
            )}
          >
            <Input
              id={fieldName}
              type="file"
              accept="image/*"
              multiple={isMultiSelect}
              onChange={handleFileChange}
              className="hidden"
            />
            {previews.length > 0 ? (
              <div className={cn(
                'grid gap-2',
                isMultiSelect ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'
              )}>
                {previews.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${title} Preview ${index}`}
                    className={cn(
                      'w-full h-auto max-h-[200px] object-contain rounded-md shadow',
                      isMultiSelect ? 'w-full h-24 object-cover' : 'w-full h-full object-contain'
                    )}
                  />
                ))}
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500">
                  {isMultiSelect ? 'Drag and drop images here or click to select' : 'Drag and drop an image here or click to select'}
                </p>
                <p className="text-xs text-gray-400">{showText()} (Only image files are allowed)</p>
              </>
            )}
          </label>
        </CardContent>
      </Card>
    </>
  );
};
