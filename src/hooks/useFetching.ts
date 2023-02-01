import { useState } from 'react';

export const useFetching = (callback: () => Promise<void>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(String('Error'));
      }
      alert('Error');
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error] as const;
};
