/**
 * File metadata attached to a translation job.
 */
export interface TranslationJobFile {
  id: string;
  name: string;
  mime: string;
  size_bytes: number;
  sha256: string | null;
  status: string;
  type: string;
  created_at: string;
  store_until: string;
  is_expired: boolean;
}

/**
 * A single item in a translation job pricing breakdown.
 */
export interface PricingBreakdownItem {
  code: string;
  name: string;
  unit: string;
  price: number;
  credits: number;
  quantity: number;
}

/**
 * Translation job data shared by dashboard, history, and related views.
 */
export interface TranslationJobResponse {
  job_id: string;
  job_type: string;
  status: string;
  src_lang: string;
  tgt_lang: string;
  input_file?: TranslationJobFile;
  output_file?: TranslationJobFile;
  error?: string;
  created_at: string;
  completed_at?: string;
  cost_credits?: number;
  pricing_breakdown?: PricingBreakdownItem[];
  domainId?: string;
  domain?: string;
  customized_domain?: string;
}
