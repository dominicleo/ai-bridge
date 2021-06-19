export function handleFormError(error: any) {
  if (!Array.isArray(error?.errorFields) || !error?.errorFields?.length) return;
  error.errorFields.map(({ errors }: { errors: string[] }) =>
    errors.map((message) => {
      throw new Error(message);
    }),
  );
}

/** 获取 array 中的第一个元素 */
export function first<T>(value: T[]): T | undefined {
  if (!Array.isArray(value)) return value;
  return value[0];
}

/** 获取 array 中的最后一个元素 */
export function last<T>(value: T[]): T | undefined {
  if (!Array.isArray(value)) return value;
  return value[value.length - 1];
}
