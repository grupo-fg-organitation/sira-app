import type {
  ActionHistoryEntryApi,
  SiraHistoryEventType,
} from '@/features/actions/interfaces/sira-action-api.interfaces';

export function filterActionHistoryByEventTypes(
  history: ActionHistoryEntryApi[],
  types: readonly SiraHistoryEventType[],
): ActionHistoryEntryApi[] {
  const typeSet = new Set(types);
  return history.filter(entry => typeSet.has(entry.eventType));
}
