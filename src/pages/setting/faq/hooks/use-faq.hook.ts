import { type FAQSchemaType } from "@/common/schemas/faq.schmea";
import { tokenService } from "@/common/services/token.service";
import { fetchData, fetcher } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createFAQ = async (newData: FAQSchemaType) => {
  return fetcher('/faq', {
    method: "POST",
    data: newData,
    headers: {
      Authorization: `Bearer ${await tokenService.getAccessToken()}`
    },
  })
}

const updateFAQ = async ({ id, updatedData }: { id: string; updatedData: FAQSchemaType }) => {
  return fetcher(`/faq/${id}`, {
    method: 'PATCH',
    data: updatedData,
    headers: {
      Authorization: `Bearer ${await tokenService.getAccessToken()}`
    }
  });
}

const deleteFAQ = async (id: string) => {
  return fetcher(`/faq/hard/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${await tokenService.getAccessToken()}`
    }
  })
}

export const useFAQ = () => {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: ['faqs'],
    queryFn: () => fetchData('/faq'),
  });

  const createMutation = useMutation({
    mutationFn: createFAQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      toast.success('FAQ created successfully.');
    },
    onError: (error) => {
      console.error('Error creating faq: ', error);
      toast.error('Failed to create faqs.')
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateFAQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      toast.success('FAQ updated successfully.');
    },
    onError: (error) => {
      console.error('Error updating faq: ', error);
      toast.error('Failed to update faq.');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFAQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      toast.success('FAQ deleted successfully.')
    },
    onError: (error) => {
      console.error('Error deleting faq: ', error);
      toast.error('Failed to delete faq.')
    }
  });

  return {
    data: data?.data,
    isPending,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
