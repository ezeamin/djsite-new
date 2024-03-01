import type { FetchFnProps, FetchFnResult } from './interface';

let statusCode: number | null = null;

/**
 * **Fetch function** - Use this wrapper to fetch data from server components.
 * By default, it WON'T cache the data, so it will always fetch from the server.
 * @param baseUrl - *Optional*. Base URL to concat with the URL. If not sent, it will use `NEXT_PUBLIC_API_BASE_URL` from Env variables. If not defined, it will throw an error.
 * @param url - URL to be send the request, concatenated with the baseUrl.
 * @param options - *Optional*. Options to be passed to the fetch function. See https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
 * @param mode - *Optional*. `"json"` (default) | `"blob"`
 * @param adapter - *Optional*. Function to be used to parse the data. Use this to return only the data you need.
 * @param skip - *Optional*. If true, the fetch will not be executed.
 * @param params - *Optional*. Object containing the query params to be sent to the server.
 * @returns Promise<any> - Returns a promise with the result of the fetch. Data will have the type of the generic passed, or `object` if not.
 * @example const { data, isSuccess, isError, error } = await fetchFn<HelloResponseType>({
 *              baseUrl: 'https://example.com',
 *              url: '/api/hello',
 *              options: { // this is the default behavior - no "options" object is needed
 *                method: 'GET',
 *              },
 *              mode: 'json', // this is the default behavior - no "mode" option is needed
 *              adapter: (data) => { // Here you should pass a defined function
 *                return {
 *                  text: data.text,
 *                };
 *              },
 *              skip: false, // this is the default behavior - no "skip" option is needed
 *            });
 */
export async function fetchFn<T, V = T>({
  adapter,
  baseUrl,
  cache = false,
  log = false,
  mode = 'json',
  skip = false,
  options,
  params = {},
  url,
  useToken = false,
  useCredentials = false,
}: FetchFnProps<T, V>): Promise<FetchFnResult<V extends Blob ? Blob : V>> {
  if (skip) {
    return {
      isSuccess: false,
      isError: false,
      error: null,
      data: null,
      statusCode,
    };
  }

  // TODO: Create token for user auth
  const token = null;

  try {
    let data: FetchFnResult<V>['data'] = null;

    // remove empty params from req
    const paramsToSearch = Object.entries(params)
      .filter(([, value]) => value !== '')
      .reduce<Record<string, string>>((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    const searchParams = new URLSearchParams(paramsToSearch).toString();

    let path = url;
    if (baseUrl) {
      path = `${baseUrl}${url}`;
    }
    if (searchParams) {
      path += `?${searchParams}`;
    }

    let reqOptions = {
      ...options,
      ...(useCredentials ? { credentials: 'include' as const } : {}),
      headers: {
        ...options?.headers,
        ...(useToken && token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
    if (!options?.next?.revalidate) {
      reqOptions = {
        ...reqOptions,
        cache: cache ? 'force-cache' : 'no-store',
      };
    }

    if (log) console.log('🚀 fetchFn - PATH:', path);

    const response = await fetch(path, reqOptions);
    statusCode = response.status;

    if (log) console.log('🚀 fetchFn - RESPONSE:', response);

    if (!response.ok) {
      try {
        const errorData = response.json() as Promise<{
          message?: string | null;
        } | null>;
        if (await errorData) {
          const errorMessage =
            'message' in errorData && typeof errorData.message === 'string'
              ? errorData.message
              : undefined;
          throw new Error(errorMessage);
        }
        throw new Error();
      } catch (e) {
        console.error(`${response.status.toString()} - ${response.statusText}`);
        throw new Error(
          (e instanceof Error && e.message) ||
            `${response.status.toString()} - ${
              response.statusText
            }: An error occurred`
        );
      }
    }

    switch (mode) {
      case 'blob':
        // @ts-expect-error - TODO: TS SHOULD BE FIXED
        data = await response.blob();
        break;
      case 'json':
      default:
        data = await response.json();
        break;
    }

    if (log) console.log('🚀 fetchFn - DATA:', data);

    if (adapter) {
      data = adapter(data as T) as V;
    }

    if (log) console.log('🚀 fetchFn - ADAPTED DATA:', data);

    // TODO: Make data be null type only if isError is true
    return {
      isSuccess: true,
      isError: false,
      error: null,
      // @ts-expect-error - TODO: TS SHOULD BE FIXED
      data,
      statusCode,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        isSuccess: false,
        isError: true,
        error,
        data: null,
        statusCode,
      };
    }

    return {
      isSuccess: false,
      isError: true,
      error: new Error('Unknown error'),
      data: null,
      statusCode,
    };
  }
}

// TODO: REFETCH
