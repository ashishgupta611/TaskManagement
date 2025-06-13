import { useState, useEffect } from 'react';
import { ApiResponse } from '../interfaces';

interface UseAPIProps<T> {
  url: string;
  initialData: T,
  token?: string; // Optional token for authenticated requests
}

export const useAPI = <T>({ url, initialData, token }: UseAPIProps<T>): ApiResponse<T> => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers: Record<string, string> = {
          'Accept': 'application/json',
        };

        // Add Bearer token to headers if provided
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
          headers,
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};