import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCatalogAreasQuery } from '@/features/users/hooks/useCatalogAreasQuery';
import {
  newTourSchema,
  type NewTourFormValues,
} from '@/features/tours/schemas/new-tour-form.schema';
import {
  useActiveChecklistTemplatesQuery,
  useCreateTourMutation,
} from '@/features/tours/hooks/useToursQueries';
import { getToursApiErrorMessage } from '@/features/tours/services/tours.service';

export function useNewTourForm() {
  const navigate = useNavigate();
  const areasQuery = useCatalogAreasQuery();
  const templatesQuery = useActiveChecklistTemplatesQuery();
  const createMutation = useCreateTourMutation();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<NewTourFormValues>({
    defaultValues: {
      areaId: 0,
      templateId: '',
      tourDate: '',
      generalNotes: '',
    },
  });

  async function submitNewTour(raw: NewTourFormValues): Promise<void> {
    setFormError(null);
    const parsed = newTourSchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      if (first?.path[0] === 'areaId') {
        setError('areaId', { message: first.message });
      }
      return;
    }
    const values = parsed.data;
    try {
      const templateIdRaw = values.templateId?.trim();
      const templateId =
        templateIdRaw && templateIdRaw.length > 0
          ? Number(templateIdRaw)
          : undefined;
      const tourDate =
        values.tourDate && values.tourDate.length > 0
          ? new Date(`${values.tourDate}T12:00:00`).toISOString()
          : undefined;
      const generalNotes =
        values.generalNotes && values.generalNotes.trim().length > 0
          ? values.generalNotes.trim()
          : undefined;
      const created = await createMutation.mutateAsync({
        areaId: values.areaId,
        templateId:
          templateId !== undefined && Number.isFinite(templateId)
            ? templateId
            : undefined,
        tourDate,
        generalNotes,
      });
      navigate(`/recorridos/${created.id}`, { replace: true });
    } catch (error) {
      setFormError(getToursApiErrorMessage(error));
    }
  }

  return {
    register,
    onFormSubmit: handleSubmit(submitNewTour),
    errors,
    formError,
    areas: (areasQuery.data ?? []).map(a => ({
      id: a.id,
      name: a.name,
      companyName: a.companyName,
    })),
    templates: templatesQuery.data ?? [],
    createMutation,
  };
}
