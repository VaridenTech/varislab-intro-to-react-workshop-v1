import { useEffect, useState } from "react";
import { getJson } from "../api";

export function useFetch<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getJson<T>(path, controller.signal);
        setData(result);
      } catch (err) {
        // This request was cancelled on purpose: a newer one has replaced it.
        if (controller.signal.aborted) {
          return;
        }

        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => controller.abort();
  }, [path]);

  return { data, isLoading, error };
}
