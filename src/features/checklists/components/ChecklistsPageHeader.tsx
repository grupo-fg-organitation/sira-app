import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ChecklistsPageHeaderProps } from '@/features/checklists/interfaces/checklists-page.components.interfaces';
import { Plus } from 'lucide-react';

export function ChecklistsPageHeader({
  onCreateClick,
}: ChecklistsPageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 transition-[opacity,transform] duration-300 ease-out sm:flex-row sm:items-center sm:justify-between',
        'motion-safe:hover:[&>div:first-child]:translate-y-px',
      )}
    >
      <div className='transition-transform duration-300 ease-out'>
        <h1 className='text-2xl font-bold tracking-tight text-foreground drop-shadow-sm'>
          Plantillas de checklist
        </h1>
        <p className='mt-1 max-w-xl text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground/80'>
          Define las preguntas que se usarán en los recorridos. Las plantillas
          inactivas no aparecen al crear un recorrido nuevo.
        </p>
      </div>
      <Button
        type='button'
        onClick={onCreateClick}
        className='cursor-pointer shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md motion-reduce:hover:translate-y-0'
      >
        <Plus className='mr-2 h-4 w-4' />
        Nueva plantilla
      </Button>
    </div>
  );
}
