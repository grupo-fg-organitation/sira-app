import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export function useTourIdFromRoute(): number | null {
  const { id } = useParams<{ id: string }>();
  return useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : null;
  }, [id]);
}
