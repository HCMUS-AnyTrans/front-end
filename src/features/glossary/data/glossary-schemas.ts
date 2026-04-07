import { z } from 'zod';

export const createGlossarySchema = z
  .object({
    name: z
      .string()
      .min(1, 'Vui lòng nhập tên bảng thuật ngữ')
      .max(200, 'Tên không được vượt quá 200 ký tự'),
    domain: z
      .string()
      .min(1, 'Vui lòng chọn lĩnh vực')
      .max(100, 'Lĩnh vực không được vượt quá 100 ký tự'),
    srcLang: z
      .string()
      .min(1, 'Vui lòng chọn ngôn ngữ nguồn')
      .max(10, 'Mã ngôn ngữ không hợp lệ'),
    tgtLang: z
      .string()
      .min(1, 'Vui lòng chọn ngôn ngữ đích')
      .max(10, 'Mã ngôn ngữ không hợp lệ'),
    customizedDomain: z
      .string()
      .max(100, 'Lĩnh vực tùy chỉnh không được vượt quá 100 ký tự')
      .optional(),
  })
  .refine((data) => data.srcLang !== data.tgtLang, {
    message: 'Ngôn ngữ nguồn và ngôn ngữ đích phải khác nhau',
    path: ['tgtLang'],
  });

export type CreateGlossaryFormValues = z.infer<typeof createGlossarySchema>;

export const updateGlossarySchema = z.object({
  name: z
    .string()
    .min(1, 'Vui lòng nhập tên bảng thuật ngữ')
    .max(200, 'Tên không được vượt quá 200 ký tự')
    .optional(),
  domain: z
    .string()
    .min(1, 'Vui lòng chọn lĩnh vực')
    .max(100, 'Lĩnh vực không được vượt quá 100 ký tự')
    .optional(),
  srcLang: z
    .string()
    .min(1, 'Vui lòng chọn ngôn ngữ nguồn')
    .max(10, 'Mã ngôn ngữ không hợp lệ')
    .optional(),
  tgtLang: z
    .string()
    .min(1, 'Vui lòng chọn ngôn ngữ đích')
    .max(10, 'Mã ngôn ngữ không hợp lệ')
    .optional(),
});

export type UpdateGlossaryFormValues = z.infer<typeof updateGlossarySchema>;

export const createTermSchema = z.object({
  srcTerm: z
    .string()
    .min(1, 'Vui lòng nhập thuật ngữ nguồn')
    .max(500, 'Thuật ngữ không được vượt quá 500 ký tự'),
  tgtTerm: z
    .string()
    .min(1, 'Vui lòng nhập thuật ngữ đích')
    .max(500, 'Thuật ngữ không được vượt quá 500 ký tự'),
});

export type CreateTermFormValues = z.infer<typeof createTermSchema>;

export const updateTermSchema = z.object({
  srcTerm: z
    .string()
    .min(1, 'Vui lòng nhập thuật ngữ nguồn')
    .max(500, 'Thuật ngữ không được vượt quá 500 ký tự')
    .optional(),
  tgtTerm: z
    .string()
    .min(1, 'Vui lòng nhập thuật ngữ đích')
    .max(500, 'Thuật ngữ không được vượt quá 500 ký tự')
    .optional(),
});

export type UpdateTermFormValues = z.infer<typeof updateTermSchema>;

/**
 * Schema for a single row in bulk import.
 */
export const bulkTermRowSchema = z.object({
  srcTerm: z
    .string()
    .min(1, 'Thuật ngữ nguồn không được để trống')
    .max(500, 'Thuật ngữ không được vượt quá 500 ký tự'),
  tgtTerm: z
    .string()
    .min(1, 'Thuật ngữ đích không được để trống')
    .max(500, 'Thuật ngữ không được vượt quá 500 ký tự'),
});

export const bulkImportSchema = z.object({
  terms: z
    .array(bulkTermRowSchema)
    .min(1, 'Vui lòng thêm ít nhất 1 thuật ngữ')
    .max(500, 'Tối đa 500 thuật ngữ mỗi lần nhập'),
});

export type BulkImportFormValues = z.infer<typeof bulkImportSchema>;
