export interface CustomSwalArgs {
  confirmButtonText: string;
  showCancelButton: boolean;
  text: string;
  title: string;
}

export type ModeTypes = 'json' | 'blob' | undefined;

/**
 * @param V - is the (data) adapter return type, or Blob if it is a File
 * @param Mode - is the mode of the fetch function. "json" (default) | "blob"
 */
export interface FetchFnResult<V> {
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  data: V | null;
  statusCode: number | null;
}

/**
 * T is the adapter return type, or Blob if it is a File.
 */
export interface FetchFnProps<T, V> {
  adapter?: (data: T) => V;
  baseUrl?: string;
  cache?: boolean;
  log?: boolean;
  mode?: ModeTypes;
  options?: RequestInit & {
    next?: {
      revalidate: false | number;
      tags?: string[];
    };
  };
  params?: Record<string, string>;
  skip?: boolean;
  url: string;
  useToken?: boolean;
  useCredentials?: boolean;
}
