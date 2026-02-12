import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/api/axios';
import type { LoginDto, TLoginResponse, TSentinelLoginResponse } from './types';
import { useBoundStore } from '@/store';

export function useLogin() {
  const { setUser, setToken } = useBoundStore();

  return useMutation({
    mutationFn: async (data: LoginDto) => {
      const response = await axiosInstance.post<TLoginResponse>('/v1/login/user', {
        username: data.email,
        password: data.password,
        isTerra: true,
        sentinelAuthValidation: true,
      });

      const sentinelResponse = await axiosInstance.post<TSentinelLoginResponse>(
        '/auth/login',
        { ...data, domain: import.meta.env.VITE_SENTINEL_DOMAIN },
        // The reason we are using baseURL because it is one time process!
        { baseURL: import.meta.env.VITE_SENTINEL_BASE_URL }
      );

      const user = response.data.response.user;

      return {
        id: user.userId,
        name: user.firstname + ' ' + user.lastname,
        email: user.email,
        token: sentinelResponse.data.data.token,
        profileImage: user.profileImageUrl,
        parentRoleId: user.parentRoleId,
        roles: user.roles,
      };
    },
    onSuccess: (data) => {
      setUser({ ...data });
      setToken(data.token);
    },
  });
}

export function useAuthMe() {
  const { setUser, user } = useBoundStore();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get('/auth/me');
      return {
        userData: response.data,
        token: response.headers.authorization?.replace('Bearer ', '') || null,
      };
    },
    onSuccess: (data) => {
      setUser({
        ...user,
        token: data.token,
      });
    },
  });
}
