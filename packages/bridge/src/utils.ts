import { ResolveContentOptions } from './types';

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

export const resolveOptions = <T>(options: T, defaults: Partial<T>) => {
  return { ...defaults, ...options } as Required<T>;
};

export function resolveContent<O, T>(
  options: ResolveContentOptions<O, T>,
  defaults?: Partial<O>,
  key = 'content',
  handler = isString,
) {
  const args = handler(options) ? { [key]: options } : options;
  return resolveOptions(args as O, defaults);
}
