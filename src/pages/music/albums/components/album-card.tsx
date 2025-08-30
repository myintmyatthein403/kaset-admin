import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, MoreVertical } from 'lucide-react';

interface AlbumCardProps {
  src: string;
  alt: string;
  title: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const AlbumCard = ({
  src,
  alt,
  title,
  onEdit,
  onDelete,
}: AlbumCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-mlg overflow-hidden relative">
      <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            aria-label="More options"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
