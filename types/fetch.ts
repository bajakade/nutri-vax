import { DictOf } from './interface';

export type ResponseType = 'json' | 'text' | 'blob';
export type FetchResponse = DictOf<any> | void;

export type FetchArgs = { url: string; options?: RequestOptions };
export type FetchResult = Promise<FetchResponse> | PromiseLike<FetchResponse>;
export type FetchFn = (args: FetchArgs) => FetchResult;

export type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

// eslint-disable-next-line
export type RequestOptions = RequestInit & {
  multipart?: boolean;
  params?: DictOf<any>;
  data?: DictOf<any>;
  responseType?: ResponseType;
};

export type BackendFetch = (
  method: Method,
  url: string,
  opts?: RequestOptions,
) => Promise<FetchResponse>;
export type GetData = (url: string, opts?: RequestOptions) => Promise<FetchResponse>;

export type QueryKey = [string, GetData];
