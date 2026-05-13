import { Link } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { NewTourFormProps } from '@/features/tours/interfaces/new-tour-form.interfaces';
import { ArrowLeft } from 'lucide-react';

export function NewTourForm({
  register,
  onFormSubmit,
  errors,
  formError,
  areas,
  templates,
  createMutation,
}: NewTourFormProps) {
  return (
    <div className='dashboard-content-in mx-auto max-w-lg space-y-6 duration-300 animate-in fade-in slide-in-from-bottom-1 motion-reduce:animate-none'>
      <div>
        <Link
          to='/recorridos'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeft className='h-4 w-4' />
          Volver a recorridos
        </Link>
      </div>

      <div>
        <h1 className='text-2xl font-bold tracking-tight text-foreground'>
          Nuevo recorrido
        </h1>
        <p className='mt-1 text-sm text-muted-foreground'>
          Crea un recorrido para tu compañía. Opcionalmente asocia una plantilla
          de checklist activa.
        </p>
      </div>

      <form
        onSubmit={onFormSubmit}
        className='space-y-6 rounded-xl border border-border bg-card p-6'
      >
        {formError ? (
          <p className='text-sm text-destructive'>{formError}</p>
        ) : null}

        <div className='space-y-2'>
          <Label htmlFor='areaId'>Área</Label>
          <select
            id='areaId'
            className='h-10 w-full rounded-lg border border-input bg-background px-3 text-sm'
            {...register('areaId', { valueAsNumber: true })}
          >
            <option value={0}>Selecciona un área</option>
            {areas.map(a => (
              <option key={a.id} value={a.id}>
                {a.companyName
                  ? `${a.name} — ${a.companyName}`
                  : a.name}
              </option>
            ))}
          </select>
          {errors.areaId ? (
            <p className='text-xs text-destructive'>{errors.areaId.message}</p>
          ) : null}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='templateId'>Plantilla de checklist (opcional)</Label>
          <select
            id='templateId'
            className='h-10 w-full rounded-lg border border-input bg-background px-3 text-sm'
            {...register('templateId')}
          >
            <option value=''>Sin plantilla</option>
            {templates.map(t => (
              <option key={t.id} value={String(t.id)}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='tourDate'>Fecha del recorrido (opcional)</Label>
          <Input id='tourDate' type='date' {...register('tourDate')} />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='generalNotes'>Notas generales (opcional)</Label>
          <textarea
            id='generalNotes'
            rows={3}
            className='w-full rounded-lg border border-input bg-background px-3 py-2 text-sm'
            {...register('generalNotes')}
          />
        </div>

        <div className='flex justify-end gap-3'>
          <Link
            to='/recorridos'
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Cancelar
          </Link>
          <Button type='submit' disabled={createMutation.isPending}>
            {createMutation.isPending ? 'Creando…' : 'Crear recorrido'}
          </Button>
        </div>
      </form>
    </div>
  );
}
