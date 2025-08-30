import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange: (file: File | null) => void;
  previewUrl?: string | null;
}

export const FileInput = ({ className, onFileChange, previewUrl, ...props }: FileInputProps) => {
  const [currentPreview, setCurrentPreview] = useState<string | null>(previewUrl || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const url = URL.createObjectURL(file);
      setCurrentPreview(url);
      onFileChange(file);
    } else {
      setCurrentPreview(null);
      onFileChange(null);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <label htmlFor={props.id} className="cursor-pointer">
        <div className="w-24 h-24 rounded-full border border-dashed flex items-center justify-center overflow-hidden">
          {currentPreview ? (
            <img src={currentPreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-sm">Upload</span>
          )}
        </div>
      </label>
      <Input
        id={props.id}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={cn("hidden", className)}
        {...props}
      />
    </div>
  );
};
