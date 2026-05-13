export interface ChecklistTemplateSummaryApi {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  itemsCount: number;
}

export interface ChecklistTemplateItemApi {
  id: number;
  templateId: number;
  order: number;
  question: string;
  required: boolean;
}

export interface ChecklistTemplateDetailApi {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  items: ChecklistTemplateItemApi[];
}

export type CreateChecklistTemplateItemPayload = {
  order: number;
  question: string;
  required?: boolean;
};

export type CreateChecklistTemplatePayload = {
  name: string;
  items: CreateChecklistTemplateItemPayload[];
};

export type UpdateChecklistTemplateItemPayload = {
  id?: number;
  order: number;
  question: string;
  required?: boolean;
};

export type UpdateChecklistTemplatePayload = {
  name: string;
  items: UpdateChecklistTemplateItemPayload[];
};

export type SetChecklistTemplateActivePayload = {
  isActive: boolean;
};
