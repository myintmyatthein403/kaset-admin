import { Label } from '@/src/common/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/common/components/ui/card';
import { useMemo } from 'react';

interface ReviewFormProps {
  formState: any; // The state object from the parent form
}

export const ReviewForm = ({ formState }: ReviewFormProps) => {
  const { values } = formState;

  // Use useMemo to prevent unnecessary re-creations of URLs
  const trackImagePreview = useMemo(() => {
    if (values.trackImage instanceof File) {
      return URL.createObjectURL(values.trackImage);
    }
    return null;
  }, [values.trackImage]);

  const trackCoverImagePreview = useMemo(() => {
    if (values.trackCoverImage instanceof File) {
      return URL.createObjectURL(values.trackCoverImage);
    }
    return null;
  }, [values.trackCoverImage]);

  const btsImagesPreviews = useMemo(() => {
    if (Array.isArray(values.btsImages) && values.btsImages.every((f: any) => f instanceof File)) {
      return values.btsImages.map((file: File) => URL.createObjectURL(file));
    }
    return [];
  }, [values.btsImages]);

  const storyboardsPreviews = useMemo(() => {
    if (Array.isArray(values.storyboards) && values.storyboards.every((f: any) => f instanceof File)) {
      return values.storyboards.map((file: File) => URL.createObjectURL(file));
    }
    return [];
  }, [values.storyboards]);

  return (
    <div className="space-y-6">
      {/* Track Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>Track Information</CardTitle>
          <CardDescription>Review the basic details of your track.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Label>Title:</Label>
            <p className="text-sm font-medium">{values.title || 'N/A'}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label>Description:</Label>
            <p className="text-sm font-medium">{values.description || 'N/A'}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label>Slug:</Label>
            <p className="text-sm font-medium">{values.slug || 'N/A'}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label>Duration:</Label>
            <p className="text-sm font-medium">{values.duration || 'N/A'}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label>Genre:</Label>
            <p className="text-sm font-medium">{values.genre || 'N/A'}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label>Artist:</Label>
            <p className="text-sm font-medium">{values.artist || 'N/A'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Media Section */}
      <Card>
        <CardHeader>
          <CardTitle>Images & Storyboards</CardTitle>
          <CardDescription>Review the uploaded media files.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Track Image */}
          <div>
            <Label>Track Image:</Label>
            {trackImagePreview ? (
              <div className="mt-2 flex flex-col items-center">
                <p className="text-xs text-gray-500">{values.trackImage.name}</p>
                <img src={trackImagePreview} alt="Track Image Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
              </div>
            ) : (
              <p className="text-sm text-gray-500">No image uploaded.</p>
            )}
          </div>

          {/* Track Cover Image */}
          <div>
            <Label>Cover Image:</Label>
            {trackCoverImagePreview ? (
              <div className="mt-2 flex flex-col items-center">
                <p className="text-xs text-gray-500">{values.trackCoverImage.name}</p>
                <img src={trackCoverImagePreview} alt="Cover Image Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
              </div>
            ) : (
              <p className="text-sm text-gray-500">No image uploaded.</p>
            )}
          </div>

          {/* BTS Images */}
          <div>
            <Label>BTS Images:</Label>
            {btsImagesPreviews.length > 0 ? (
              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {btsImagesPreviews.map((url: string, index: number) => (
                  <img key={index} src={url} alt={`BTS Image ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No BTS images uploaded.</p>
            )}
          </div>

          {/* Storyboards */}
          <div>
            <Label>Storyboards:</Label>
            {storyboardsPreviews.length > 0 ? (
              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {storyboardsPreviews.map((url: string, index: number) => (
                  <img key={index} src={url} alt={`Storyboard ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No storyboards uploaded.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Platform Links Section */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Links</CardTitle>
          <CardDescription>Review the music platform URLs.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Label>Spotify URL:</Label>
            <p className="text-sm font-medium break-all">{values.spotify_url || 'N/A'}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label>Apple Music URL:</Label>
            <p className="text-sm font-medium break-all">{values.apple_music_url || 'N/A'}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label>SoundCloud URL:</Label>
            <p className="text-sm font-medium break-all">{values.soundcloud_url || 'N/A'}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label>Youtube URL:</Label>
            <p className="text-sm font-medium break-all">{values.youtube_url || 'N/A'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
