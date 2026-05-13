import { Calendar, Filter, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HomeFilterSelectField } from '@/features/home/components/HomeFilterSelectField';
import type { HomeFilterBarProps } from '@/features/home/interfaces/homeDashboard.interfaces';

export function HomeFilterBar({
  empresaOptions,
  areaOptions,
  responsableOptions,
  estatusOptions,
}: HomeFilterBarProps) {
  const dateInputClassName: string =
    'h-10 w-full rounded-2xl border-border/60 bg-linear-to-b from-background to-muted/25 pl-10 text-sm shadow-sm transition-all duration-[220ms] ease-out hover:border-primary/35 hover:shadow-md focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring/55 motion-reduce:transition-none';

  return (
    <form
      className='home-filter-bar-enter rounded-2xl border border-border bg-card p-4 shadow-sm transition-[border-color,box-shadow] duration-[280ms] ease-out hover:border-primary/20 hover:shadow-md sm:p-5 motion-reduce:transition-none'
      onSubmit={event => event.preventDefault()}
    >
      <div className='flex flex-col gap-5'>
        <div className='flex flex-wrap items-center gap-3 sm:gap-4'>
          <div className='group/filtros flex w-full shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground/80 sm:w-auto'>
            <Filter className='h-4 w-4 shrink-0 text-primary/80 transition-transform duration-200 ease-out motion-safe:group-hover/filtros:rotate-12' />
            <span>Filtros</span>
          </div>

          <HomeFilterSelectField
            name='empresa'
            placeholder='Empresa'
            options={empresaOptions}
          />

          <HomeFilterSelectField
            name='area'
            placeholder='Área'
            options={areaOptions}
          />

          <HomeFilterSelectField
            name='responsable'
            placeholder='Responsable'
            options={responsableOptions}
          />

          <HomeFilterSelectField
            name='estatus'
            placeholder='Estatus'
            options={estatusOptions}
          />
        </div>

        <div className='flex flex-col gap-4 border-t border-border/50 pt-4 transition-opacity duration-300 ease-out sm:flex-row sm:flex-wrap sm:items-end sm:justify-between'>
          <div className='flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-end sm:gap-5'>
            <div className='flex min-w-0 flex-1 flex-col gap-1.5 sm:max-w-[11rem]'>
              <Label
                htmlFor='home-filter-fecha-inicio'
                className='text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'
              >
                Desde
              </Label>
              <div className='relative'>
                <Calendar className='pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200' />
                <Input
                  id='home-filter-fecha-inicio'
                  name='fechaInicio'
                  type='date'
                  defaultValue=''
                  className={cn(dateInputClassName, 'sm:w-40')}
                />
              </div>
            </div>
            <span
              className='hidden select-none self-end pb-2.5 text-muted-foreground/45 sm:inline'
              aria-hidden
            >
              —
            </span>
            <div className='flex min-w-0 flex-1 flex-col gap-1.5 sm:max-w-[11rem]'>
              <Label
                htmlFor='home-filter-fecha-fin'
                className='text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'
              >
                Hasta
              </Label>
              <div className='relative'>
                <Calendar className='pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200' />
                <Input
                  id='home-filter-fecha-fin'
                  name='fechaFin'
                  type='date'
                  defaultValue=''
                  className={cn(dateInputClassName, 'sm:w-40')}
                />
              </div>
            </div>
          </div>

          <Button
            type='reset'
            variant='ghost'
            size='sm'
            className='cursor-pointer self-start rounded-full text-muted-foreground shadow-none transition-all duration-[220ms] ease-out hover:scale-[1.02] hover:bg-muted hover:text-foreground hover:shadow-sm motion-reduce:hover:scale-100 sm:self-end'
          >
            <RotateCcw className='mr-1 h-4 w-4 transition-transform duration-200 ease-out group-hover/button:-rotate-45' />
            Limpiar
          </Button>
        </div>
      </div>
    </form>
  );
}
