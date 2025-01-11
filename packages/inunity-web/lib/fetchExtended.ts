import handleDates from "./date";
import returnFetch, {
  FetchArgs,
  ReturnFetchDefaultOptions,
} from "./return-fetch";

// Use as a replacer of `RequestInit`
type JsonRequestInit = Omit<NonNullable<FetchArgs[1]>, "body"> & {
  body?: object;
  /**
   * 쿼리를 바디로 넣으면 쿼리스트링을 생성해줍니다.
   */
  query?: Record<string, string | number | undefined>;
};

// Use as a replacer of `Response`
export type ResponseGenericBody<T> = Omit<
  Awaited<ReturnType<typeof fetch>>,
  keyof Body | "clone"
> & {
  body: T;
};

export type JsonResponse<T> = T extends object
  ? ResponseGenericBody<T>
  : ResponseGenericBody<unknown>;

// this resembles the default behavior of axios json parser
// https://github.com/axios/axios/blob/21a5ad34c4a5956d81d338059ac0dd34a19ed094/lib/defaults/index.js#L25
const parseJsonSafely = (text: string): object | string => {
  try {
    return JSON.parse(text);
  } catch (e) {
    if ((e as Error).name !== "SyntaxError") {
      throw e;
    }

    return text.trim();
  }
};

export interface ResponseWrapper<T> {
  status: number;
  message: string;
  data: T;
}
export class CustomError extends Error {
  code: number;
  constructor(code: number, message?: string, options?: ErrorOptions) {
    super(message, options);
    this.code = code;
  }
}

// Write your own high order function to serialize request body and deserialize response body.
export const returnFetchJson = (args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args);

  return async <T>(url: FetchArgs[0], init?: JsonRequestInit): Promise<T> => {
    const queryString =
      init?.query &&
      new URLSearchParams(JSON.parse(JSON.stringify(init?.query))).toString();
    url = queryString ? `${url}?${queryString}` : url;

    const response = await fetch(url, {
      ...init,
      body: init?.body && JSON.stringify(init.body),
    });
    const res = parseJsonSafely(await response.text()) as ResponseWrapper<T>;

    if (200 <= res.status && res.status < 300) {
      const data = handleDates(res.data) as T;
      return data;
    } else {
      throw new CustomError(res.status, res.message);
    }
    // return {
    //   headers: response.headers,
    //   ok: response.ok,
    //   redirected: response.redirected,
    //   status: response.status,
    //   statusText: response.statusText,
    //   type: response.type,
    //   url: response.url,
    //   body,
    // } as JsonResponse<T>;
  };
};

// Create an extended fetch function and use it instead of the global fetch.
export default returnFetchJson({
  // default options
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  interceptors: {
    async response(response, requestArgs, fetch) {
      if (response.status >= 400) {
        throw await response.text().then(Error);
      }
      return response;
    },
  },
});
