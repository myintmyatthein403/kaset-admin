import { useMutation } from "@tanstack/react-query"
import { fetcher } from "@/lib/axios"
import { tokenService } from "@/common/services/token.service"

export const useUploadSingleFile = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await fetcher('/media/single', {
        method: "POST",
        data: {
          media: payload
        },
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${await tokenService.getAccessToken()}`
        }
      })

      return response.data;
    },
    onSuccess: (data) => {
      console.log('upload success', data)
    },
    onError: (error) => {
      console.error('upload error', error)
    }
  })
}
