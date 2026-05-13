import { useMemo, useState } from 'react';
import { useAuthSessionOptional } from '@/features/auth/context';
import {
  useActionsListQuery,
  useSignActionAcceptanceMutation,
} from '@/features/actions/hooks/useActionsQueries';
import {
  ME_ACTIONS_SIGNATURE_MODAL_INITIAL,
  type MeActionsSignatureModalState,
} from '@/features/actions/interfaces/actions-pages.interfaces';

export function useMeActionsPage() {
  const auth = useAuthSessionOptional();
  const userId = auth?.user.userId ?? null;

  const listQuery = useActionsListQuery({
    page: 1,
    pageSize: 100,
    responsibleId: userId ?? undefined,
  });

  const signMutation = useSignActionAcceptanceMutation();

  const [signatureModal, setSignatureModal] =
    useState<MeActionsSignatureModalState>(ME_ACTIONS_SIGNATURE_MODAL_INITIAL);

  const myActions = useMemo(
    () => listQuery.data?.items ?? [],
    [listQuery.data?.items],
  );

  const unsignedActions = useMemo(
    () => myActions.filter(a => a.status === 'PENDING_ACCEPTANCE'),
    [myActions],
  );

  return {
    listQuery,
    signMutation,
    signatureModal,
    setSignatureModal,
    myActions,
    unsignedActions,
  };
}
