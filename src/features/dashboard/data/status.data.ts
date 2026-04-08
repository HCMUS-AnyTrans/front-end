export interface StatusConfig {
  label: string;
  className: string;
}

export const jobStatusConfig = {
  pending: {
    label: 'Chờ xử lý',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  processing: {
    label: 'Đang xử lý',
    className: 'bg-info/10 text-info border-info/20',
  },
  succeeded: {
    label: 'Hoàn thành',
    className: 'bg-success/10 text-success border-success/20',
  },
  failed: {
    label: 'Thất bại',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
} satisfies Record<string, StatusConfig>;

export function getJobStatusConfig(status: string): StatusConfig | undefined {
  return jobStatusConfig[status as keyof typeof jobStatusConfig];
}
