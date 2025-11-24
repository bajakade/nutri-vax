import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useCallback, useState } from 'react';

import { type FetchArgs, type FetchFn, type Method, request } from '../helpers/request';
import type { DictOf } from '../types';

/**
 * Prepare arguments for making calls to backend server by
 * - Update relative Urls to use "backendUrl" as the base url
 * - Add Authorization headers if missing using token from store
 */
function prepareFetchArgs(backendUrl: string, args: FetchArgs, token?: string): FetchArgs {
  const newArgs = { url: args.url, options: args.options || {} };

  if (!newArgs.url.startsWith('http')) {
    const baseUrl = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;

    const path = newArgs.url.startsWith('/') ? newArgs.url.slice(1) : newArgs.url;
    newArgs.url = `${baseUrl}/${path}`;
  }

  const headers = (newArgs.options?.headers || {}) as DictOf<any>;
  if (!headers.Authorization && token) {
    headers.Authorization = `Token ${token}`;
    newArgs.options.headers = headers;
  }

  return newArgs;
}

export default function useBackend(): {
  error: string;
  processing: boolean;
  backendFetch: FetchFn;
} {
  // const { t } = useTranslation();
  const auth = { token: '' }; // todo: get token from db;

  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const backendUrl = process.env.BACKEND_URL!;

  const backendFetch: FetchFn = useCallback(
    (args) => {
      setProcessing(true);
      const token = auth.token;

      return NetInfo.fetch()
        .then((state: NetInfoState) => {
          if (!state.isConnected && !state.isInternetReachable) {
            setError('You are offline');
            return;
          }

          const { url, options } = prepareFetchArgs(backendUrl as string, args, token);

          // drop body for get request
          if (options?.method === 'GET') {
            delete options.data;
          }

          return request((options?.method || 'GET') as Method, url, options!);
        })
        .catch((err: any) => {
          setError(err?.error?.toString() || err.toString());
          const errStr = JSON.stringify(err);
          if (errStr !== '{"error":{}}') {
            console.log(`backendFetch.error: ${errStr}`);
          }

          return err;
        })
        .finally(() => {
          setProcessing(false);
        });
    },
    [backendUrl, auth.token],
  );

  return { error, processing, backendFetch };
}
