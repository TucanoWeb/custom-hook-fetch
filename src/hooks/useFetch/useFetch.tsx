import { useState, useEffect, useCallback } from 'react';
import { AxiosRequestConfig } from 'axios';
import { api } from '@/api';
import { IUseFetchOptions } from './types';

function useFetch<T = any>(url?: string, options: IUseFetchOptions<T> = {}) {
  const { cache, initialValue } = options;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>(initialValue || ({} as T));

  const fetchData = useCallback(
    (config?: AxiosRequestConfig) => {
      const headers = config?.headers ?? {};
      if (cache) headers['x-cache'] = 'true';
      setLoading(true);

      if (url) {
        api
          .get(url, { ...config, headers })
          .then((response) => setData(response.data))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    },
    [cache, url]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refresh: fetchData };
}

export { useFetch };
