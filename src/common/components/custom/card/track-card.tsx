import { useState } from 'react';
import {
  Card,
  CardContent,
} from '@/src/common/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/common/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

interface TrackCardProps {
  image: string;
  title: string;
  duration: string;
  onEdit: () => void;
  onDelete: () => void;
}

// Define your fallback image URL
const FALLBACK_IMAGE_URL = 'https://plus.unsplash.com/premium_photo-1682125340805-c01b8a9a7aee?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export function TrackCard({
  image,
  title,
  duration,
  onEdit,
  onDelete,
}: TrackCardProps) {
  // Use state to manage the image source, initialized with the provided image URL
  const [imageSrc, setImageSrc] = useState(image);

  const handleImageError = () => {
    // If the image fails to load, update the state to the fallback URL
    setImageSrc(FALLBACK_IMAGE_URL);
  };

  return (
    <Card className="w-48 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-32 w-full">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover"
          // Add the onError event handler
          onError={handleImageError}
        />
      </div>
      <CardContent className="p-3 flex flex-col justify-between h-20">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold truncate leading-tight">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{duration}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="More options"
                className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <MoreVertical className="h-4 w-4 text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={onEdit}>
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={onDelete}>
                <span className="text-red-600">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
