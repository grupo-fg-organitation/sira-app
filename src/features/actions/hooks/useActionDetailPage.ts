import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useActionDetailQuery } from '@/features/actions/hooks/useActionsQueries';
import {
  ACTION_DETAIL_TABS,
  type ActionDetailTabId,
} from '@/features/actions/interfaces/actions-pages.interfaces';
import { filterActionHistoryByEventTypes } from '@/features/actions/services/actionHistoryFilters';

export function useActionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const actionId = useMemo(() => {
    const parsed = Number(id);
    return Number.isFinite(parsed) ? parsed : null;
  }, [id]);

  const { data: action, isPending, isError } = useActionDetailQuery(actionId);
  const [activeTab, setActiveTab] = useState<ActionDetailTabId>(
    ACTION_DETAIL_TABS[0].id,
  );

  const observaciones = useMemo(
    () =>
      action
        ? filterActionHistoryByEventTypes(action.history, ['OBSERVATION_ADDED'])
        : [],
    [action],
  );

  const fechaChanges = useMemo(
    () =>
      action
        ? filterActionHistoryByEventTypes(action.history, ['DUE_DATE_CHANGED'])
        : [],
    [action],
  );

  const responsableChanges = useMemo(
    () =>
      action
        ? filterActionHistoryByEventTypes(action.history, [
            'RESPONSIBLE_CHANGED',
          ])
        : [],
    [action],
  );

  const signedEntry = useMemo(() => {
    if (!action) {
      return null;
    }
    return action.history.find(h => h.eventType === 'SIGNED') ?? null;
  }, [action]);

  const evidenciaInicial = useMemo(
    () => action?.evidences.find(e => e.type === 'INITIAL'),
    [action],
  );

  const evidenciaCierre = useMemo(
    () => action?.evidences.find(e => e.type === 'CLOSURE'),
    [action],
  );

  return {
    action,
    isPending,
    isError,
    activeTab,
    setActiveTab,
    observaciones,
    fechaChanges,
    responsableChanges,
    signedEntry,
    evidenciaInicial,
    evidenciaCierre,
  };
}
