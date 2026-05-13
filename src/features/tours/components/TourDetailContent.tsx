import { Link } from 'react-router-dom';
import {
  formatApiDateShort,
  tourStatusLabel,
  tourStatusPillClass,
} from '@/features/actions/lib/actionPresentation';
import { cn } from '@/lib/utils';
import type { TourDetailContentProps } from '@/features/tours/interfaces/tour-detail.interfaces';
import { ArrowLeft, Calendar, MapPin, User } from 'lucide-react';

export function TourDetailContent({ tour }: TourDetailContentProps) {
  return (
    <div className='dashboard-content-in space-y-6 duration-300 animate-in fade-in slide-in-from-bottom-1 motion-reduce:animate-none'>
      <div>
        <Link
          to='/recorridos'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeft className='h-4 w-4' />
          Volver a recorridos
        </Link>
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className='font-mono text-2xl font-bold text-foreground'>
          {tour.folio}
        </h1>
        <span
          className={cn(
            'inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
            tourStatusPillClass(tour.status),
          )}
        >
          {tourStatusLabel(tour.status)}
        </span>
      </div>

      <div className='grid gap-4 rounded-xl border border-border bg-card p-5 text-sm sm:grid-cols-2'>
        <div className='flex items-center gap-2 text-muted-foreground'>
          <Calendar className='h-4 w-4 shrink-0' />
          <span>{formatApiDateShort(tour.tourDate)}</span>
        </div>
        <div className='flex items-center gap-2 text-muted-foreground'>
          <MapPin className='h-4 w-4 shrink-0' />
          <span>{tour.area.name}</span>
        </div>
        <div className='flex items-center gap-2 text-muted-foreground sm:col-span-2'>
          <User className='h-4 w-4 shrink-0' />
          <span>{tour.createdBy.fullName}</span>
        </div>
        {tour.template ? (
          <p className='text-muted-foreground sm:col-span-2'>
            Plantilla:{' '}
            <span className='text-foreground'>{tour.template.name}</span>
          </p>
        ) : null}
        {tour.generalNotes ? (
          <p className='text-muted-foreground sm:col-span-2'>
            Notas: <span className='text-foreground'>{tour.generalNotes}</span>
          </p>
        ) : null}
      </div>

      <div className='rounded-xl border border-border bg-card p-5'>
        <h2 className='text-sm font-medium text-muted-foreground'>
          Checklist ({tour.checklistResponses.length} ítems)
        </h2>
        <p className='mt-2 text-sm text-muted-foreground'>
          La edición del checklist se implementará en el siguiente paso con
          PATCH /tours/:id/checklist.
        </p>
      </div>
    </div>
  );
}
