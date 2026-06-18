import { apiClient } from '@/lib/api-client';
import { customInstructionTemplateSchema } from '../data/custom-instruction-template-schemas';
import type { CustomInstructionTemplate } from '../data/custom-instruction-template-schemas';
import { z } from 'zod';

export async function listCustomInstructionTemplatesApi(): Promise<
  CustomInstructionTemplate[]
> {
  const response = await apiClient.get<unknown[]>(
    '/custom-instruction-templates',
  );
  return z.array(customInstructionTemplateSchema).parse(response.data);
}
