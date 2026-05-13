import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileQuestion,
  FolderOpen,
  ListTodo,
} from 'lucide-react';
import type {
  HomeKpiCardProps,
  HomeKpiCardsProps,
} from '@/features/home/interfaces/homeDashboard.interfaces';
import { HomeKPICard } from '@/features/home/components/HomeKPICard';

export function HomeKPICards({ data }: HomeKpiCardsProps) {
  const cards: HomeKpiCardProps[] = [
    {
      title: 'Total acciones',
      value: data.total,
      icon: ListTodo,
      color: 'text-foreground',
      bgColor: 'bg-muted',
      linkTo: '/acciones',
    },
    {
      title: 'Abiertas',
      value: data.abiertas,
      icon: FolderOpen,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Cerradas',
      value: data.cerradas,
      icon: CheckCircle2,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Expiradas',
      value: data.expiradas,
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
    {
      title: 'En revisión de cierre',
      value: data.enRevision,
      icon: Clock,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Pendientes de aceptación',
      value: data.pendientesAceptacion,
      icon: FileQuestion,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6'>
      {cards.map(card => (
        <HomeKPICard key={card.title} {...card} />
      ))}
    </div>
  );
}
