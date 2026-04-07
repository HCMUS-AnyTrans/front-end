'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowRight, Coins } from 'lucide-react';
import { FileTypeIcon } from '@/components/shared/file-type-icon';
import { jobStatusConfig } from '@/features/dashboard/data';
import type { TranslationJobResponse } from '@/types';

type RecentJobsContentProps = {
  jobs: TranslationJobResponse[];
  onViewDetails: (job: TranslationJobResponse) => void;
};

export function RecentJobsContent({
  jobs,
  onViewDetails,
}: RecentJobsContentProps) {
  const tJobs = useTranslations('dashboard.recentJobs');
  const tStatus = useTranslations('dashboard.status');
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
            <TableHead className="hidden h-11 px-4 text-right text-sm font-medium text-muted-foreground lg:px-6 sm:table-cell">
              {tHistory('columns.credits')}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.map((job) => {
            const fileName = job.input_file?.name ?? job.job_id;
            const statusCfg = jobStatusConfig[job.status];

            return (
              <TableRow
                key={job.job_id}
                className="group cursor-pointer hover:bg-muted/30"
                onClick={() => onViewDetails(job)}
              >
                <TableCell className="max-w-[180px] px-4 py-4 sm:max-w-[220px] lg:px-6">
                  <div className="flex items-center gap-2">
                    <FileTypeIcon fileName={fileName} className="size-4" />
                    <span className="truncate text-sm font-medium text-foreground">
                      {fileName}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="hidden px-4 py-4 sm:table-cell lg:px-6">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-xs font-medium text-foreground">
                      {job.src_lang}
                    </span>
                    <ArrowRight className="size-3 shrink-0 text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">
                      {job.tgt_lang}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-4 lg:px-6">
                  <Badge
                    variant="outline"
                    className={`text-xs ${statusCfg?.className ?? ''}`}
                  >
                    {tStatus(job.status)}
                  </Badge>
                </TableCell>

                <TableCell className="hidden px-4 py-4 text-right lg:px-6 sm:table-cell">
                  {job.cost_credits !== undefined ? (
                    <div className="flex items-center justify-end gap-1">
                      <Coins className="size-3.5 text-warning" />
                      <span className="text-sm font-medium tabular-nums text-foreground">
                        {job.cost_credits}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
