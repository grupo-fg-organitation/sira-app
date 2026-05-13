import { HomeAppShell } from '@/features/home/components/HomeAppShell';
import { UserCatalogCard } from '@/features/users/components/UserCatalogCard';
import { UserFormDialog } from '@/features/users/components/UserFormDialog';
import { UsersCatalogEmptyState } from '@/features/users/components/UsersCatalogEmptyState';
import { UsersPageAdminNotice } from '@/features/users/components/UsersPageAdminNotice';
import { UsersPageErrorState } from '@/features/users/components/UsersPageErrorState';
import { UsersPageHeader } from '@/features/users/components/UsersPageHeader';
import { UsersPageLoadingState } from '@/features/users/components/UsersPageLoadingState';
import { UsersPageNoAccessState } from '@/features/users/components/UsersPageNoAccessState';
import { UsersPageSearchBar } from '@/features/users/components/UsersPageSearchBar';
import { useUsersPage } from '@/features/users/hooks/useUsersPage';
import { getUsersApiErrorMessage } from '@/features/users/services/users.service';

export function UsersPage() {
  const {
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
    companyCatalogOptions,
    companyCatalogLoading,
    toggleMutation,
    togglingUserId,
  } = useUsersPage();

  if (!canList) {
    return <UsersPageNoAccessState />;
  }

  if (usersQuery.isPending && usersQuery.data === undefined) {
    return <UsersPageLoadingState />;
  }

  if (usersQuery.isError) {
    return (
      <UsersPageErrorState
        message={getUsersApiErrorMessage(usersQuery.error)}
        onRetry={() => void usersQuery.refetch()}
      />
    );
  }

  return (
    <HomeAppShell>
      <div className='space-y-6 duration-300 animate-in fade-in slide-in-from-bottom-1 motion-reduce:animate-none'>
        <UsersPageHeader canManage={canManage} onCreateClick={onOpenCreate} />

        <UsersPageSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          isFetching={usersQuery.isFetching}
        />

        <UsersPageAdminNotice visible={!canManage && canList} />

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {usersList.map((user, index) => (
            <UserCatalogCard
              key={user.id}
              user={user}
              index={index}
              currentUserId={session.userId}
              canManage={canManage}
              showCompanyBadge={session.role === 'ADMIN'}
              toggleInProgress={toggleMutation.isPending}
              togglingUserId={togglingUserId}
              onEdit={onOpenEdit}
              onToggleActive={onToggleActive}
            />
          ))}
        </div>

        {usersList.length === 0 ? (
          <UsersCatalogEmptyState
            hasActiveSearch={debouncedSearch.trim().length > 0}
          />
        ) : null}

        <UserFormDialog
          open={dialogOpen}
          onOpenChange={onDialogOpenChange}
          title={dialogTitle}
          description={dialogDescription}
          isCreateMode={editingUserId === null}
          companyCatalogOptions={companyCatalogOptions}
          companyCatalogLoading={companyCatalogLoading}
          register={register}
          errors={errors}
          onSubmit={onSaveUser}
          isSaving={mutationPending}
        />
      </div>
    </HomeAppShell>
  );
}
