import { fetcher } from "../lib/axios";
import { useAuthStore } from "../store/authStore";

export const tokenService = {
  getAccessToken: async (): Promise<string | null> => {
    // You can access the Zustand store's state directly without a hook

    const refreshToken = useAuthStore.getState().refreshToken;

    if (refreshToken !== "") {
      const { data } = await fetcher(`/auth/refresh-token`, {
        method: "POST",
        data: {
          refreshToken,
        }
      })

      return data.meta.accessToken
    }

    return refreshToken;
  },
};
