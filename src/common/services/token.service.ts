import { fetcher } from "@/lib/axios";
import { useAuthStore } from "../store/authStore";

export const tokenService = {
  getAccessToken: async (): Promise<string | null> => {

    const refreshToken = useAuthStore.getState().refreshToken;

    if (refreshToken !== "") {
      const res = await fetcher(`/auth/refresh-token`, {
        method: "POST",
        data: {
          refreshToken,
        }
      }) as any

      return res.data.meta.accessToken
    }

    return refreshToken;
  },
};
