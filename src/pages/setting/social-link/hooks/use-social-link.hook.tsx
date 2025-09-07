import { type SocialLinkSchemaType } from "@/common/schemas/social-link.schema";
import { tokenService } from "@/common/services/token.service"
import { fetchData, fetcher } from '@/lib/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const createSocialLink = async (payload: SocialLinkSchemaType) => {
  return fetcher('/social-link', {
    method: "POST",
    data: payload,
    headers: {
      Authorization: `Bearer ${await tokenService.getAccessToken()}`
    },
  })
}

const updateSocialLink = async ({ id, updateData }: { id: string; updateData: SocialLinkSchemaType }) => {
  return fetcher(`/social-link/${id}`, {
    method: 'PATCH',
    data: updateData,
    headers: {
      Authorization: `Bearer ${await tokenService.getAccessToken()}`
    }
  });
}

const deleteSocialLink = async (id: string) => {
  return fetcher(`/social-link/hard/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${await tokenService.getAccessToken()}`
    }
  })
}

export const useSocialLink = () => {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: ['social-link'],
    queryFn: () => fetchData('/social-link')
  })

  const createMutation = useMutation({
    mutationFn: createSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-link'] });
      toast.success('Social Link created successfully.')
    },
    onError: (error) => {
      console.error(`Error creating Social Link: ${error}`);
      toast.error('Failed to create social link.')
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-link'] });
      toast.success(`Social Link updated successfully.`)
    },
    onError: () => {
      console.error(`Error updating social link: ${error}.`);
      toast.error(`Failed to update Scoial Link.`)
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-link'] });
      toast.success(`Social link deleted successfully.`);
    },
    onError: (error) => {
      console.error(`Error deleting social link: ${error}`);
      toast.error(`Failed to delete social link.`)
    }
  });

  return {
    data: data?.data,
    isPending,
    error,
    createMutation,
    updateMutation,
    deleteMutation
  }
}
