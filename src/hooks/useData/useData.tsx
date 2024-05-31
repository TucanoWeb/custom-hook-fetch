import { useFetch } from '../useFetch';
import { PaginatedQueryPath } from './paths';
import { IData } from './types';

const useData = () => {
  return useFetch<IData[]>(PaginatedQueryPath.Data, {
    initialValue: [],
    cache: true,
  });
};

export { useData };
