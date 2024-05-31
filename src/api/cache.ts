import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';

const DEFAULT_TTL = 1000 * 60 * 5;

function log(...args: any[]) {
  if (import.meta.env.DEV) {
    console.log(`${new Date().toISOString()}`, ...args);
  }
}

function isCacheExpired(timestamp: number, ttl: number = DEFAULT_TTL): boolean {
  return Date.now() - timestamp >= ttl;
}

function clearCache(onlyExpired = true) {
  log(onlyExpired ? 'Checking expired caches...' : 'Clearing cache...');
  Object.keys(localStorage)
    .filter((key) => key.startsWith('cache:'))
    .forEach((key) => {
      const data = localStorage.getItem(key);
      if (data) {
        const { timestamp } = JSON.parse(data);
        if (!onlyExpired || isCacheExpired(timestamp)) {
          localStorage.removeItem(key);
        }
      }
    });
}

function getCachedData(config: InternalAxiosRequestConfig<any>) {
  if (config.method === 'get' && config.url && config.headers['x-cache'] === 'true') {
    const cacheKey = 'cache:' + config.url + '?' + qs.stringify(config.params);
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (isCacheExpired(timestamp)) {
        log(`Cache expired - ${cacheKey}`);
        localStorage.removeItem(cacheKey);
      } else {
        log(`Cache hit - ${cacheKey}`);
        return data;
      }
    }
  }
  return null;
}

function storeCachedData(response: AxiosResponse<any, any>) {
  const cacheKey = 'cache:' + response.config.url + '?' + qs.stringify(response.config.params);
  if (response.config.method === 'get' && response.config.url && response.config.headers['x-cache'] === 'true') {
    const { data, headers, status, statusText } = response;
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ data: { data, headers, status, statusText }, timestamp: Date.now() })
    );
  }
}

clearCache();

export { getCachedData, storeCachedData, clearCache };
