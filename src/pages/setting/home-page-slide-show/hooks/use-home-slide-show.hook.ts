import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData, fetcher } from "@/lib/axios";
import { tokenService } from "@/common/services/token.service";
import type { HomeSlideShowSchemaType } from "@/common/schemas/home-slide-show.schema";
import { toast } from "sonner";
import { useUploadSingleFile } from "@/hooks/use-upload-file.hook";

const createSlideShow = async (newData: HomeSlideShowSchemaType) => {
  return fetcher('/home-slide-show', {
    method: "POST",
    data: newData,
    headers: {
      Authorization: `Bearer ${await tokenService.getAccessToken()}`,
    },
  });
};

const updateSlideShow = async ({ id, updatedData }: { id: string; updatedData: HomeSlideShowSchemaType }) => {
  return fetcher(`/home-slide-show/${id}`, {
    method: "PATCH",
    data: updatedData,
    headers: {
      Authorization: `Bearer ${await tokenService.getAccessToken()}`,
    },
  });
};

const deleteSlideShow = async (id: string) => {
  return fetcher(`/home-slide-show/hard/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${await tokenService.getAccessToken()}`,
    },
  });
};

export const useHomeSlideShow = () => {
  const queryClient = useQueryClient();
  const uploadMutation = useUploadSingleFile();

  const { data, isPending, error } = useQuery({
    queryKey: ['home-slide-show'],
    queryFn: () => fetchData('/home-slide-show'),
  });

  const createMutation = useMutation({
    mutationFn: createSlideShow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home-slide-show'] });
      toast.success('Slide show created successfully.');
    },
    onError: (error) => {
      console.error('Error creating slide show: ', error);
      toast.error('Failed to create slide show.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSlideShow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home-slide-show'] });
      toast.success('Slide show updated successfully.');
    },
    onError: (error) => {
      console.error('Error updating slide show: ', error);
      toast.error('Failed to update slide show.');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSlideShow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home-slide-show'] });
      toast.success('Slide show deleted successfully.');
    },
    onError: (error) => {
      console.error('Error deleting slide show: ', error);
      toast.error('Failed to delete slide show.');
    },
  });

  return {
    data: data?.data,
    isPending,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
    uploadMutation
  };
};
