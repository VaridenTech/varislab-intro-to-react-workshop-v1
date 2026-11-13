export const API_URL = "https://dummyjson.com";

export class ApiError extends Error {
  status: number;

  constructor(status: number) {
    super(`Request failed with status ${status}`);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function getJson<T>(
  path: string,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { signal });

  if (!response.ok) {
    throw new ApiError(response.status);
  }

  return (await response.json()) as T;
}
