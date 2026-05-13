import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { showGlobalToast } from '@/components/global';
import { useAuthSession } from '@/features/auth/context';
import {
  USER_CATALOG_FORM_DEFAULT_VALUES,
} from '@/features/users/interfaces/users-page.constants';
import {
  createUserFormSchema,
  editUserFormSchema,
  type UserFormValues,
} from '@/features/users/schemas/user-catalog-form.schema';
import {
  getUsersApiErrorMessage,
  type CompanyUserCatalogItem,
} from '@/features/users/services/users.service';
import {
  useCompaniesCatalogQuery,
  useCompanyUsersQuery,
  useCreateUserMutation,
  useToggleUserActiveMutation,
  useUpdateUserMutation,
} from '@/features/users/hooks/useUsersCatalog';

export function useUsersPage() {
  const { user: session } = useAuthSession();
  const canList = session.role === 'ADMIN' || session.role === 'RESPONSABLE';
  const canManage = session.role === 'ADMIN';

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [togglingUserId, setTogglingUserId] = useState<number | null>(null);

  const formDefaults: UserFormValues = {
    ...USER_CATALOG_FORM_DEFAULT_VALUES,
    companyId: session.companyId,
  };

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => window.clearTimeout(id);
  }, [searchQuery]);

  const usersQuery = useCompanyUsersQuery(canList, debouncedSearch);
  const companiesCatalogQuery = useCompaniesCatalogQuery(
    canManage && dialogOpen && editingUserId === null,
  );
  const createMutation = useCreateUserMutation();
  const updateMutation = useUpdateUserMutation();
  const toggleMutation = useToggleUserActiveMutation();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    defaultValues: formDefaults,
  });

  const usersList = usersQuery.data ?? [];

  function onDialogOpenChange(open: boolean): void {
    setDialogOpen(open);
    if (!open) {
      setEditingUserId(null);
      reset(formDefaults);
    }
  }

  function onOpenCreate(): void {
    setEditingUserId(null);
    reset(formDefaults);
    setDialogOpen(true);
  }

  function onOpenEdit(user: CompanyUserCatalogItem): void {
    setEditingUserId(user.id);
    reset({
      companyId: user.companyId,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone ?? '',
      department: user.department,
      role: user.role,
      password: '',
    });
    setDialogOpen(true);
  }

  async function onToggleActive(userId: number): Promise<void> {
    setTogglingUserId(userId);
    try {
      await toggleMutation.mutateAsync(userId);
      showGlobalToast('Estado del usuario actualizado', 'success');
    } catch (error) {
      showGlobalToast(getUsersApiErrorMessage(error), 'error');
    } finally {
      setTogglingUserId(null);
    }
  }

  const onSaveUser = handleSubmit(async values => {
    const isEdit = editingUserId !== null;
    const parsed = (isEdit ? editUserFormSchema : createUserFormSchema).safeParse(
      values,
    );
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (
          typeof field === 'string' &&
          field in USER_CATALOG_FORM_DEFAULT_VALUES
        ) {
          setError(field as keyof UserFormValues, {
            type: 'manual',
            message: issue.message,
          });
        }
      }
      return;
    }
    const data = parsed.data;
    const phoneTrimmed = data.phone.trim();
    const phonePayload = phoneTrimmed.length > 0 ? phoneTrimmed : null;

    try {
      if (isEdit && editingUserId !== null) {
        const passwordTrim = data.password.trim();
        await updateMutation.mutateAsync({
          userId: editingUserId,
          payload: {
            fullName: data.fullName,
            email: data.email,
            phone: phonePayload,
            department: data.department,
            role: data.role,
            ...(passwordTrim.length > 0 ? { password: passwordTrim } : {}),
          },
        });
        showGlobalToast('Usuario actualizado', 'success');
      } else {
        await createMutation.mutateAsync({
          companyId: data.companyId,
          fullName: data.fullName,
          email: data.email,
          ...(phoneTrimmed.length > 0 ? { phone: phoneTrimmed } : {}),
          department: data.department,
          password: data.password,
          role: data.role,
        });
        showGlobalToast('Usuario creado', 'success');
      }
      setDialogOpen(false);
      setEditingUserId(null);
      reset(formDefaults);
    } catch (error) {
      showGlobalToast(getUsersApiErrorMessage(error), 'error');
    }
  });

  const dialogTitle =
    editingUserId === null ? 'Nuevo usuario' : 'Editar usuario';
  const dialogDescription =
    editingUserId === null
      ? 'Completa los datos para registrar un usuario. Elige la compañía de destino si administras varias.'
      : 'Actualiza los datos del usuario. Deja la contraseña vacía si no deseas cambiarla.';

  const mutationPending =
    createMutation.isPending || updateMutation.isPending || isSubmitting;

  return {
    session,
    canList,
    canManage,
    searchQuery,
    setSearchQuery,
    debouncedSearch,
    dialogOpen,
    editingUserId,
    usersQuery,
    usersList,
    register,
    errors,
    onSaveUser,
    mutationPending,
    onDialogOpenChange,
    onOpenCreate,
    onOpenEdit,
    onToggleActive,
    dialogTitle,
    dialogDescription,
    companyCatalogOptions: companiesCatalogQuery.data ?? [],
    companyCatalogLoading: companiesCatalogQuery.isFetching,
    toggleMutation,
    togglingUserId,
  };
}
