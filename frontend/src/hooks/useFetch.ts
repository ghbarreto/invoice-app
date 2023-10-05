import { useAuth } from '@/context/auth-context';
import { secureFetch, Others } from '@/utils/fetch';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
  useMutation,
  UseMutateFunction,
} from 'react-query';

type Fetch = {
  isLoading: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  error: unknown;
  data: any;
  isSuccess: boolean;
};

export const useFetch = ({ endpoint, id, options }: { endpoint: string; id: string; options?: Others }) => {
  const { user } = useAuth();

  const { isLoading, refetch, error, data, isSuccess } = useQuery(id, () => secureFetch(endpoint, options), {
    retry: 2,
    enabled: !!user,
  });

  return {
    isLoading,
    refetch,
    error,
    data: data?.data,
    isSuccess,
  } as Fetch;
};

type Post = {
  isLoading: boolean;
  error: unknown;
  data: any;
  isSuccess: boolean;
  mutate: UseMutateFunction<any, unknown, void, unknown>;
};

export const usePost = ({ endpoint, options }: { endpoint: string; options?: Others }) => {
  const { isLoading, error, data, isSuccess, mutate } = useMutation(() => secureFetch(endpoint, options));

  return {
    isLoading,
    error,
    data: data?.data,
    isSuccess,
    mutate,
  } as Post;
};
