import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { AxiosError, AxiosResponse } from "axios";
import { postAuthValidateToken } from "../api/auth";
import appRoutes from "../routes";

type UseValidateTokenParams = {
  onSuccess?: (res: AxiosResponse) => void
  onError?: (e: unknown) => void
};

export default function useValidateToken(params: UseValidateTokenParams) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { isLoading: isLoadingPostValidateToken, mutate, error } = useMutation(postAuthValidateToken, {
    onError: (error , _variables, _context) => {
      // console.log('error', error);

      setIsLoading(false);

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('user');
        }
      }

      if (params.onError) params.onError(error);
    },
    onSuccess: (res , _variables, _context) => {
      // console.log('success', res);

      setIsLoading(false);
      
      if (params.onSuccess) params.onSuccess(res);
    },
  });

  const validate = () => {
    const token = window.localStorage.getItem('token');

    if (!token) {
      router.replace(appRoutes.login.path);
      setIsLoading(false);
    } else {
      mutate({ token });
    }
  };

  return {
    isLoading: isLoading || isLoadingPostValidateToken,
    validate,
    error,
  };
}
