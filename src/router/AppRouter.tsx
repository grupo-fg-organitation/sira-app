import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from '@/components/global';
import { HomePage } from '@/features/home/pages/HomePage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { ChecklistsPage } from '@/features/checklists/pages/ChecklistsPage';
import { ToursPage } from '@/features/tours/pages/ToursPage';
import { NewTourPage } from '@/features/tours/pages/NewTourPage';
import { TourDetailPage } from '@/features/tours/pages/TourDetailPage';
import { ActionsPage } from '@/features/actions/pages/ActionsPage';
import { ActionDetailPage } from '@/features/actions/pages/ActionDetailPage';
import { MeActionsPage } from '@/features/actions/pages/MeActionsPage';
import { NuevaAccionPage } from '@/features/actions/pages/NuevaAccionPage';
import { ReportsPage } from '@/features/reports/pages/ReportsPage';
import { UsersPage } from '@/features/users/pages/UsersPage';
import { ProtectedRoute } from '@/router/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'recorridos/nuevo', element: <NewTourPage /> },
      { path: 'recorridos/:id', element: <TourDetailPage /> },
      { path: 'recorridos', element: <ToursPage /> },
      { path: 'acciones/nueva', element: <NuevaAccionPage /> },
      { path: 'acciones/:id', element: <ActionDetailPage /> },
      { path: 'acciones', element: <ActionsPage /> },
      { path: 'mis-acciones', element: <MeActionsPage /> },
      { path: 'checklists', element: <ChecklistsPage /> },
      { path: 'usuarios', element: <UsersPage /> },
      { path: 'reportes', element: <ReportsPage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to='/login' replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
