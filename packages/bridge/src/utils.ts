import { Promisify, ResolveContentOptions } from './types';

export const canUseWindow = typeof window !== 'undefined';

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isFunction = (value: unknown): boolean => typeof value === 'function';

export const isPlainObject = <T>(value: unknown): value is T =>
  Object.prototype.toString.call(value) === '[object Object]';

export const JSONParse = <T = Record<string, unknown>>(value: unknown) => {
  if (isPlainObject<T>(value)) return value;

  try {
    return JSON.parse(value as string) as T;
  } catch {
    return {} as T;
  }
};

export function promisify<Options = any, SuccessResponse = any, ErrorResponse = any>(
  api: (options: Options & Promisify<SuccessResponse, ErrorResponse>) => void,
) {
  return (options: Options & Promisify<SuccessResponse, ErrorResponse> = {} as Options) => {
    return new Promise<SuccessResponse>((resolve, reject) => {
      const args: any = options;

      api({
        ...args,
        onSuccess: (response: SuccessResponse) => {
          isFunction(args) && args.onSuccess(response);
          resolve(response);
        },
        onError: (error: ErrorResponse) => {
          isFunction(args) && args.onError(error);
          reject(error);
        },
      });
    });
  };
}

export const resolveOptions = <T>(options: T, defaults: Partial<T>) => {
  return { ...defaults, ...options } as Required<T>;
};

export function resolveContent<O, T>(
  options: ResolveContentOptions<O, T>,
  defaults?: Partial<O>,
  key = 'content',
) {
  const args = isString(options) ? { [key]: options } : options;
  return resolveOptions(args as O, defaults);
}
