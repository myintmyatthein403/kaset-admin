import { TrackCard } from "@/components/custom/card/track-card";
import { CustomDrawer as Drawer } from "@/components/custom/drawer/drawer";
import { Stepper } from "@/components/custom/stepper/stepper";
import { fetchData, fetcher } from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TrackInfo } from "./track-info";
import { useForm } from "@tanstack/react-form";
import { TrackImageForm } from "./track-image-form";
import { PlatformLink } from "./platform-link";
import { ReviewForm } from "./review-form";
import { useState } from "react";
import { tokenService } from "@/common/services/token.service";
import { toast } from 'sonner';
import { config } from "@/common/config/config";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { nanoid } from "nanoid";
import { create } from "domain";

export const TrackPage = () => {
  const queryClient = useQueryClient();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTrackId, setEditingTrackId] = useState<String | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [trackToDelete, setTrackToDelete] = useState<String | null>(null);

  // Function to handle the actual deletion after confirmation
  const deleteTrack = async () => {
    try {
      await fetcher(`/track/${trackToDelete}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${await tokenService.getAccessToken()}`
        },
      });

      await queryClient.invalidateQueries({ queryKey: ['tracks'] });
      toast.success("Track deleted successfully!");

    } catch (error) {
      console.error("Deletion failed:", error);
      toast.error("Failed to delete track. Please try again.");
    } finally {
      setIsDeleteDialogOpen(false);
      setTrackToDelete(null);
    }
  };

  // Function to open the delete confirmation dialog
  const handleDelete = (trackId: string) => {
    setTrackToDelete(trackId);
    setIsDeleteDialogOpen(true);
  };

  const handleEdit = async (trackId: string) => {
    setIsEditing(true);
    setEditingTrackId(trackId);
    setIsDrawerOpen(true);
    setCurrentStep(0);
    toast.loading("Fetching track data...", { id: 'fetch-track' });

    try {
      console.log(trackId)
      const response = await fetchData(`/track/${trackId}`);
      const trackData = response?.data;
      console.log(trackData);
      // Populate the form with fetched data
      form.setFieldValue('name', trackData.name);
      form.setFieldValue('description', trackData.description);
      form.setFieldValue('slug', trackData.slug);
      form.setFieldValue('duration', trackData.duration);
      form.setFieldValue('genres', trackData.genres.map((genre: { id: string }) => genre.id));
      form.setFieldValue('spotify_url', trackData.spotify_url);
      form.setFieldValue('artists', trackData.artists.map((artist: { id: string }) => artist.id));
      form.setFieldValue('lyric_type', trackData.lyric_type)
      form.setFieldValue('lyric_text', trackData.lyric_text);
      form.setFieldValue('chord_text', trackData.chord_text);
      form.setFieldValue('chord_type', trackData.chord_type);
      if (trackData.music_links && trackData.music_links.length > 0) {
        const formattedPairs = trackData.music_links.map((link: any) => ({
          id: link.id || nanoid(),
          dropdownValue: link.platform,
          textValue: link.url,
        }));
        form.setFieldValue("pairs", formattedPairs);
      } else {
        form.setFieldValue("pairs", [{ id: nanoid(), dropdownValue: '', textValue: '' }]);
      }
      toast.dismiss('fetch-track');
    } catch (error) {
      toast.dismiss('fetch-track');
      toast.error("Failed to load track data.");
      setIsDrawerOpen(false);
    }
  };

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      slug: '',
      duration: '',
      genres: [],
      artists: [],
      trackImage: null,
      trackCoverImage: null,
      lyricImage: null,
      chordImage: null,
      btsImages: [],
      storyboards: [],
      pairs: [{ id: nanoid(), dropdownValue: '', textValue: '' }]
    },
    onSubmit: async ({ value }) => {
      try {
        const {
          trackImage,
          trackCoverImage,
          lyricImage,
          chordImage,
          btsImages,
          storyboards,
          pairs,
          artists,
          genres,
          ...restOfValue
        } = value;
        let trackImageId;
        let trackCoverImageId;
        let btsImagesIds;
        let storyBoardsIds;
        let lyricImageId;
        let chordImageId;
        let socialMediaLinkIds;
        let artistIds;
        let genreIds;

        if (artists && artists.length > 0) {
          artistIds = artists.map((artist) => ({ id: artist }))
        }

        if (genres && genres.length > 0) {
          genreIds = genres.map(genre => ({ id: genre }))
        }

        const uploadFile = async (file: any) => {
          const response = await fetcher('/media/single', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: {
              media: file,
            }
          });
          return response?.data.id;
        };

        const uploadMultipleFiles = async (files: any) => {
          const createdFiles = await Promise.all(files.map(async (file: any) => {
            const response = await fetcher('/media/single', {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              data: {
                media: file
              },
            });
            return response?.data.id;
          }))
          console.log('createdFiles', createdFiles);
          return createdFiles.map((item: any) => ({ id: item }));
        };

        if (value.trackImage) {
          trackImageId = await uploadFile(value.trackImage);
        }

        if (value.trackCoverImage) {
          trackCoverImageId = await uploadFile(value.trackCoverImage);
        }

        if (value.btsImages && value.btsImages.length > 0) {
          btsImagesIds = await uploadMultipleFiles(value.btsImages);
        }

        if (value.storyboards && value.storyboards.length > 0) {
          storyBoardsIds = await uploadMultipleFiles(value.storyboards);
        }

        if (value.lyricImage) {
          lyricImageId = await uploadFile(value.lyricImage);
        }

        if (value.chordImage) {
          chordImageId = await uploadFile(value.chordImage);
        }
        console.log('btsImages', btsImagesIds)

        if (value.pairs && value.pairs.length > 0) {
          const socialMediaLinks = await Promise.all(value.pairs.map(async (pair: any) => {
            const response = await fetcher('/music-link', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${await tokenService.getAccessToken()} `
              },
              data: {
                platform: {
                  id: pair.dropdownValue
                },
                url: pair.textValue
              }
            });
            return response?.data.id;
          }));

          if (socialMediaLinks && socialMediaLinks.length > 0) {
            socialMediaLinkIds = socialMediaLinks.map((id: any) => ({ id: id }))
          }
        }

        const finalPayload = {
          ...restOfValue,
          ...(trackImageId && { track_image: { id: trackImageId } }),
          ...(trackCoverImageId && { cover_image: { id: trackCoverImageId } }),
          ...(storyBoardsIds && storyBoardsIds.length > 0 && { story_boards: storyBoardsIds }),
          ...(btsImagesIds && btsImagesIds.length > 0 && { bts_images: btsImagesIds }),
          ...(lyricImageId && { lyric_image: lyricImageId }),
          ...(chordImageId && { chord_image: chordImageId }),
          ...(socialMediaLinkIds && socialMediaLinkIds.length > 0 && { music_links: socialMediaLinkIds }),
          ...(artistIds && artistIds.length > 0 && { artists: artistIds }),
          ...(genreIds && genreIds.length > 0 && { genres: genreIds })
        };

        const method = isEditing ? 'PATCH' : 'POST';
        const url = isEditing ? `/track/${editingTrackId}` : '/track';

        await fetcher(url, {
          method: method,
          headers: {
            'Authorization': `Bearer ${await tokenService.getAccessToken()} `
          },
          data: finalPayload
        });

        form.reset();
        await queryClient.invalidateQueries({ queryKey: ['tracks'] });
        toast.success(isEditing ? "Track updated successfully!" : "Track created successfully!");
        setIsDrawerOpen(false);
        setIsEditing(false);
        setEditingTrackId(null);

      } catch (error) {
        console.error("Submission failed:", error);
        toast.error("Failed to create/update track. Please try again.");
      }
    }
  });

  const [currentStep, setCurrentStep] = useState(0);

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <TrackInfo form={form} />;
      case 1:
        return <TrackImageForm form={form} />;
      case 2:
        return <PlatformLink form={form} />;
      case 3:
        return <ReviewForm formState={form.state} />;
      default:
        return null;
    }
  };

  const steps = [
    { label: 'Track Info' },
    { label: 'Track Image' },
    { label: 'Platform Link' },
    { label: 'Review & Submit' }
  ];

  const { isPending, error, data } = useQuery({
    queryKey: ['tracks'],
    queryFn: () => fetchData('/track')
  });

  if (isPending) return <h1>Loading...</h1>;
  if (error) return <h1>Failed to fetch...</h1>;

  const tracks = data?.data.data;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Track List</h1>
        <Drawer
          title={isEditing ? "Edit track" : "Create new track"}
          open={isDrawerOpen}
          onOpenChange={(open) => {
            setIsDrawerOpen(open);
            if (!open) {
              form.reset();
              setCurrentStep(0);
              setIsEditing(false);
              setEditingTrackId(null);
            }
          }}
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              content={renderContent()}
            />
          </form>
        </Drawer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tracks.length > 0 && tracks.map((track: any) => (
          <TrackCard
            key={track.id}
            image={`${config.BASE_MEDIA_URL}${track.track_image?.url} `}
            title={track.name}
            duration={track.duration}
            onEdit={() => handleEdit(track.id)}
            onDelete={() => handleDelete(track.id)}
          />
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the track
              and all related data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteTrack}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
