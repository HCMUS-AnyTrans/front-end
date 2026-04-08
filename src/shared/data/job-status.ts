export const JOB_STATUS_VALUES = [
  'pending',
  'processing',
  'succeeded',
  'failed',
] as const;

export type JobStatusValue = (typeof JOB_STATUS_VALUES)[number];
