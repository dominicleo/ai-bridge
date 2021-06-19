import type { ResolveOptions } from './types';

export const canUseWindow = typeof window !== 'undefined';

export const noop = () => undefined;

export const toTypeString = (value: unknown): string => Object.prototype.toString.call(value);

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol';

export const isNumber = (value: unknown): value is number => {
  if (typeof value === 'number') return value - value === 0;
  if (isString(value) && value.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+value) : isFinite(+value);
  }
  return false;
};

export const isDefine = <T>(value: T): value is NonNullable<T> =>
  value !== undefined && value !== null;

export const isFunction = (value: unknown): value is Function => typeof value === 'function';

export const isObject = (value: unknown): value is Record<string | number, unknown> =>
  value !== null && typeof value === 'object';

export const isPlainObject = <T>(value: unknown): value is T =>
  toTypeString(value) === '[object Object]';

export const isMap = (value: unknown): value is Map<any, any> =>
  toTypeString(value) === '[object Map]';

export const isSet = (value: unknown): value is Set<any> => toTypeString(value) === '[object Set]';

export const isDate = (value: unknown): value is Date => value instanceof Date;

export const isPromise = <T = unknown>(value: unknown): value is Promise<T> =>
  isObject(value) && isFunction(value.then) && isFunction(value.catch);

export const resolveOptions = <O, T>(
  options: ResolveOptions<O, T>,
  defaults: Partial<O>,
  key = 'name',
  handler: (value: unknown) => boolean = isString,
) => {
  const args = handler(options) ? { [key]: options } : options;
  return Object.assign({}, defaults, args) as Required<O>;
};

export const JSONParse = <T = Record<string, unknown>>(value: unknown) => {
  if (isPlainObject<T>(value)) return value;

  try {
    return JSON.parse(value as string) as T;
  } catch {
    return {} as T;
  }
};
