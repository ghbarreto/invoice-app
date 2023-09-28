import { useAuth } from '@/context/auth-context';
import { secureFetch, Others } from '@/utils/fetch';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query';

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
