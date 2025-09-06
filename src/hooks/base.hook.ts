import { tokenService } from "@/common/services/token.service"
import { fetchData, fetcher } from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

// NOTE: The `createItem`, `updateItem`, and `deleteItem` functions are
// generic and can handle any data type.
const createItem = async (url: string, newData: any) => {
  return fetcher(url, {
    method: "POST",
    data: newData,
    headers: {
      Authorization: `Bearer ${await tokenService.getAccessToken()}`
    }
  })
}

const updateItem = async (url: string, updatedData: any) => {
  return fetcher(`${url}/${updatedData.id}`, {
    method: "PATCH",
    data: updatedData,
    headers: {
      Authorization: `Bearer ${await tokenService.getAccessToken()}`
    }
  })
}

const deleteItem = async (url: string) => {
  return fetcher(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${await tokenService.getAccessToken()}`
    }
  })
}

/**
 * A reusable hook for fetching and managing CRUD operations on a resource.
 * The hook is made generic using the type parameter 'T'.
 *
 * @template T The type of the resource data.
 * @param {string} name - The query key name (e.g., 'genres').
 * @param {string} url - The base API URL for the resource.
 * @returns An object containing the fetched data, loading state, error, and mutation functions.
 */
export const useBaseHook = <T>(name: string, url: string) => {
  const queryClient = useQueryClient();

  // The query key is now typed based on the generic 'T'.
  const { data, isPending, error } = useQuery({
    queryKey: [name],
    queryFn: () => fetchData(url),
  });

  // The createMutation now accepts a payload of type 'T'.
  const createMutation = useMutation<any, Error, T>({
    mutationFn: (payload) => createItem(url, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [name] })
      toast.success(`${name} created successfully.`)
    },
    onError: (err) => {
      console.error(`Error creating ${name}:`, err);
      toast.error(`Failed to create ${name}.`)
    }
  })

  // The updateMutation now accepts a payload of type 'T'.
  const updateMutation = useMutation<any, Error, T>({
    mutationFn: (payload) => updateItem(url, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [name] });
      toast.success(`${name} updated successfully.`)
    },
    onError: (err) => {
      console.error(`Error updating ${name}:`, err);
      toast.error(`Failed to update ${name}.`)
    }
  })

  // The deleteMutation now accepts a string for the ID.
  const deleteMutation = useMutation<any, Error, string>({
    mutationFn: (id) => deleteItem(`${url}/hard/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [name] });
      toast.success(`${name} deleted successfully.`)
    },
    onError: (err) => {
      console.error(`Error deleting ${name}:`, err);
      toast.error(`Failed to delete ${name}.`)
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
