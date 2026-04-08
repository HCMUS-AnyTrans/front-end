'use client';

import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { HistoryTableProps } from '../../types';
import { HistoryTableRow } from './table-row';

export function HistoryTable({
  jobs,
  locale,
  onViewDetails,
  hideActions = false,
}: HistoryTableProps) {
  const tJobs = useTranslations('dashboard.recentJobs');
  const tHistory = useTranslations('dashboard.history');

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-11 px-4 text-sm font-medium text-muted-foreground lg:px-6">
              {tJobs('fileName')}
            </TableHead>
            <TableHead className="hidden h-11 px-4 text-sm font-medium text-muted-foreground sm:table-cell lg:px-6">
              {tJobs('languages')}
            </TableHead>
            <TableHead className="h-11 px-4 text-sm font-medium text-muted-foreground lg:px-6">
              {tJobs('status')}
            </TableHead>
            <TableHead className="hidden h-11 px-4 text-right text-sm font-medium text-muted-foreground md:table-cell lg:px-6">
              {tHistory('columns.credits')}
            </TableHead>
            <TableHead className="hidden h-11 px-4 text-sm font-medium text-muted-foreground md:table-cell lg:px-6">
              {tJobs('createdAt')}
            </TableHead>
            {!hideActions && (
              <TableHead className="h-11 px-4 text-right text-sm font-medium text-muted-foreground lg:px-6">
                {tJobs('actions')}
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.map((job) => (
            <HistoryTableRow
              key={job.job_id}
              job={job}
              locale={locale}
              hideActions={hideActions}
              onViewDetails={onViewDetails}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
